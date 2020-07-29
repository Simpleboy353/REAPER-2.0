const ScheduledTask = require('./ScheduledTask');

/**
 * <warning>Schedule is a singleton, use {@link KlasaClient#schedule} instead.</warning>
 * The Schedule class that manages all scheduled tasks
 */
class Schedule {

	/**
	 * @typedef  {Object} ScheduledTaskOptions
	 * @property {string} [id] The ID for the task. By default, it generates one in base36
	 * @property {string} [repeat] The {@link Cron} pattern
	 * @property {*} [data] The data to pass to the Task piece when the ScheduledTask is ready for execution
	 */

	/**
	 * @since 0.5.0
	 * @param {KlasaClient} client The Client that initialized this instance
	 */
	constructor(client) {
		/**
		 * The Client instance that initialized this instance
		 * @since 0.5.0
		 * @type {KlasaClient}
		 */
		this.client = client;

		/**
		 * An array of all processed ScheduledTask instances
		 * @since 0.5.0
		 * @type {ScheduledTask[]}
		 */
		this.tasks = [];

		/**
		 * The current interval that runs the tasks
		 * @since 0.5.0
		 * @type {NodeJS.Timer}
		 * @private
		 */
		this._interval = null;
	}

	/**
	 * Get all the tasks from the cache
	 * @since 0.5.0
	 * @type {ScheduledTaskOptions[]}
	 * @private
	 */
	get _tasks() {
		return this.client.settings.schedules;
	}

	/**
	 * Init the Schedule
	 * @since 0.5.0
	 */
	async init() {
		const tasks = this._tasks;
		if (!tasks || !Array.isArray(tasks)) return;

		for (const task of tasks) {
			try {
				await this._add(task.taskName, task.repeat || task.time, task);
			} catch (error) {
				this.client.emit('warn', `Task ${task.taskName} [${task.id}] was not queued: ${error}`);
			}
		}

		this._checkInterval();
	}

	/**
	 * Execute the current tasks
	 * @since 0.5.0
	 */
	async execute() {
		if (!this.client.ready) return;
		if (this.tasks.length) {
			// Process the active tasks, they're sorted by the time they end
			const now = Date.now();
			const execute = [];
			for (const task of this.tasks) {
				if (task.time.getTime() > now) break;
				execute.push(task.run());
			}

			// Check if the Schedule has a task to run and run them if they exist
			if (!execute.length) return;
			await Promise.all(execute);
		}
		this._checkInterval();
	}

	/**
	 * Returns the next ScheduledTask from the id
	 * @param {string} id The id of the ScheduledTask you want
	 * @returns {ScheduledTask}
	 */
	get(id) {
		return this.tasks.find(entry => entry.id === id);
	}

	/**
	 * Return the next ScheduledTask pending for execution
	 * @returns {ScheduledTask}
	 */
	next() {
		return this.tasks[0];
	}

	/**
	 * Adds a new task to the database
	 * @since 0.5.0
	 * @param {string} taskName The name of the task
	 * @param {(Date|number|string)} time The time or Cron pattern
	 * @param {ScheduledTaskOptions} [options] The options for the ScheduleTask instance
	 * @returns {?ScheduledTask}
	 * @example
	 * // Create a new reminder that ends in 2018-03-09T12:30:00.000Z (UTC)
	 * Schedule.create('reminder', new Date(Date.UTC(2018, 2, 9, 12, 30)), {
	 *     data: {
	 *         user: '242043489611808769',
	 *         db_id: 'jbifpb4f'
	 *     }
	 * });
	 *
	 * // Create a scheduled task that runs once a week
	 * Schedule.create('backup', '@weekly');
	 *
	 * // Or even, a weekly backup on Tuesday and Friday that fires at 00:00 (UTC)
	 * Schedule.create('backup', '0 0 * * tue,fri');
	 *
	 * // NOTE: It's highly advised ScheduledTaskOptions.data to be a small object or string,
	 * // as it being larger can cause a slowdown and memory increase. You can, however, have
	 * // a table in your database and query it by its entry id from the Task instance.
	 * @see https://en.wikipedia.org/wiki/Cron For more details
	 */
	async create(taskName, time, options) {
		const task = await this._add(taskName, time, options);
		if (!task) return null;
		await this.client.settings.update('schedules', task, { action: 'add' });
		return task;
	}

	/**
	 * Delete a Task by its ID
	 * @since 0.5.0
	 * @param {string} id The ID to search for
	 * @returns {this}
	 */
	async delete(id) {
		const taskIndex = this.tasks.findIndex(entry => entry.id === id);
		if (taskIndex === -1) throw new Error('This task does not exist.');

		this.tasks.splice(taskIndex, 1);
		// Get the task and use it to remove
		const task = this._tasks.find(entry => entry.id === id);
		if (task) await this.client.settings.update('schedules', task, { action: 'remove' });

		return this;
	}

	/**
	 * Clear all the ScheduledTasks
	 * @since 0.5.0
	 */
	async clear() {
		// this._tasks is unedited as Settings#clear will clear the array
		await this.client.settings.reset('schedules');
		this.tasks = [];
	}

	/**
	 * Adds a task to the cache
	 * @since 0.5.0
	 * @param {string} taskName The name of the task
	 * @param {(Date|number|string)} time The time or Cron pattern
	 * @param {ScheduledTaskOptions} [options={}] The options for the ScheduledTask instance
	 * @returns {?ScheduledTask}
	 * @private
	 */
	async _add(taskName, time, options) {
		const task = new ScheduledTask(this.client, taskName, time, options);

		// If the task were due of time before the bot's intialization, delete if not recurring, else update for next period
		if (!task.catchUp && task.time < Date.now()) {
			if (!task.recurring) {
				await task.delete();
				return null;
			}
			await task.update({ time: task.recurring });
		}
		this._insert(task);
		this._checkInterval();
		return task;
	}

	/**
	 * Inserts the ScheduledTask instance in its sorted position for optimization
	 * @since 0.5.0
	 * @param {ScheduledTask} task The ScheduledTask instance to insert
	 * @returns {ScheduledTask}
	 * @private
	 */
	_insert(task) {
		const index = this.tasks.findIndex(entry => entry.time > task.time);
		if (index === -1) this.tasks.push(task);
		else this.tasks.splice(index, 0, task);
		return task;
	}

	/**
	 * Clear the current interval
	 * @since 0.5.0
	 * @private
	 */
	_clearInterval() {
		this.client.clearInterval(this._interval);
		this._interval = null;
	}

	/**
	 * Sets the interval when needed
	 * @since 0.5.0
	 * @private
	 */
	_checkInterval() {
		if (!this.tasks.length) this._clearInterval();
		else if (!this._interval) this._interval = this.client.setInterval(this.execute.bind(this), this.client.options.schedule.interval);
	}

	/**
	 * Returns a new Iterator object that contains the values for each element contained in the task queue.
	 * @name @@iterator
	 * @since 0.5.0
	 * @method
	 * @instance
	 * @generator
	 * @returns {Iterator<ScheduledTask>}
	 * @memberof Schedule
	 */

	*[Symbol.iterator]() {
		yield* this.tasks;
	}

}

module.exports = Schedule;
