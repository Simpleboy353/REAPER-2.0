const Cron = require('../util/Cron');
const { isObject } = require('../util/util');

/**
 * The structure for future tasks to be run
 */
class ScheduledTask {

	/**
	 * @typedef  {(Date|number|Cron|string)} TimeResolvable
	 */

	/**
	 * @typedef  {Object} ScheduledTaskOptions
	 * @property {string} [id] The ID for the task. By default, it generates one in base36
	 * @property {boolean} [catchUp=true] If the task should try to catch up if the bot is down
	 * @property {*} [data] The data to pass to the Task piece when the ScheduledTask is ready for execution
	 */

	/**
	 * @typedef  {Object} ScheduledTaskUpdateOptions
	 * @property {TimeResolvable} [time] The time or {@link Cron} pattern
	 * @property {boolean} [catchUp] If the task should try to catch up if the bot is down
	 * @property {*} [data] The data to pass to the Task piece when the ScheduledTask is ready for execution
	 */

	/**
	 * @typedef  {Object} ScheduledTaskJSON
	 * @property {string} id The task's ID
	 * @property {string} taskName The name of the Task piece this will execute
	 * @property {number} time The UNIX timestamp for when this task ends at
	 * @property {boolean} catchUp If the task should try to catch up if the bot is down
	 * @property {string} [repeat] The {@link Cron} pattern
	 * @property {Object<string,*>} data The data to pass to the Task piece when the ScheduledTask is ready for execution
	 */

	/**
	 * Initializes a new ScheduledTask
	 * @since 0.5.0
	 * @param {KlasaClient} client The client that initialized this instance
	 * @param {string} taskName The name of the task this ScheduledTask is for
	 * @param {TimeResolvable} time The time or {@link Cron} pattern
	 * @param {ScheduledTaskOptions} [options={}] The options for this ScheduledTask instance
	 */
	constructor(client, taskName, time, options = {}) {
		const [_time, _recurring] = this.constructor._resolveTime(time);

		/**
		 * The Client instance that initialized this instance
		 * @since 0.5.0
		 * @name ScheduledTask#client
		 * @type {KlasaClient}
		 * @readonly
		 */
		Object.defineProperty(this, 'client', { value: client });

		/**
		 * The name of the Task this scheduled task will run
		 * @since 0.5.0
		 * @type {string}
		 */
		this.taskName = taskName;

		/**
		 * Whether this scheduled task is scheduled with the {@link Cron} pattern
		 * @since 0.5.0
		 * @type {?Cron}
		 */
		this.recurring = _recurring;

		/**
		 * The Date when this scheduled task ends
		 * @since 0.5.0
		 * @type {Date}
		 */
		this.time = 'time' in options ? new Date(options.time) : _time;

		/**
		 * The id for this scheduled task
		 * @since 0.5.0
		 * @type {string}
		 */
		this.id = options.id || this.constructor._generateID(this.client);

		/**
		 * If the task should catch up in the event the bot is down
		 * @since 0.5.0
		 * @type {boolean}
		 */
		this.catchUp = 'catchUp' in options ? options.catchUp : true;

		/**
		 * The stored metadata to send to the Task
		 * @since 0.5.0
		 * @type {*}
		 */
		this.data = 'data' in options && isObject(options.data) ? options.data : {};

		/**
		 * If the ScheduledTask is being run currently
		 * @since 0.5.0
		 * @type {boolean}
		 * @private
		 */
		this.running = false;

		this.constructor._validate(this);
	}

	/**
	 * The Schedule class that manages all scheduled tasks
	 * @since 0.5.0
	 * @name ScheduledTask#store
	 * @type {Schedule}
	 * @readonly
	 */
	get store() {
		return this.client.schedule;
	}

	/**
	 * The Task instance this scheduled task will run
	 * @since 0.5.0
	 * @type {?Task}
	 * @readonly
	 */
	get task() {
		return this.client.tasks.get(this.taskName) || null;
	}

	/**
	 * Run the current task and bump it if needed
	 * @since 0.5.0
	 * @returns {this}
	 */
	async run() {
		const { task } = this;
		if (!task || !task.enabled || this.running) return this;

		this.running = true;
		try {
			await task.run({ id: this.id, ...this.data });
		} catch (err) {
			this.client.emit('taskError', this, task, err);
		}
		this.running = false;

		if (!this.recurring) return this.delete();
		return this.update({ time: this.recurring });
	}

	/**
	 * Update the task
	 * @since 0.5.0
	 * @param {ScheduledTaskUpdateOptions} [options={}] The options to update
	 * @returns {this}
	 * @example
	 * // Update the data from the current scheduled task. Let's say I want to change the reminder content to remind me
	 * // another thing
	 * ScheduledTask.update({ data: { content: 'Woo! I edited this reminder\'s content!' } });
	 *
	 * // But you can also update the time this will end at, for example, to change it so it ends in 1 hour:
	 * ScheduledTask.update({ time: Date.now() + 60000 * 60 });
	 */
	async update({ time, data, catchUp } = {}) {
		if (time) {
			const [_time, _cron] = this.constructor._resolveTime(time);
			this.time = _time;
			this.store.tasks.splice(this.store.tasks.indexOf(this), 1);
			this.store._insert(this);
			this.recurring = _cron;
		}
		if (data) this.data = data;
		if (typeof catchUp !== 'undefined') this.catchUp = catchUp;

		// Sync the database if some of the properties changed or the time changed manually
		// (recurring tasks bump the time automatically)
		const _index = this.store._tasks.findIndex(entry => entry.id === this.id);
		if (_index !== -1) await this.client.settings.update('schedules', this.toJSON(), { arrayPosition: _index });

		return this;
	}

	/**
	 * Delete the task
	 * @since 0.5.0
	 * @returns {Promise<Schedule>}
	 * @example
	 * ScheduledTask.delete()
	 *     .then(() => console.log('Successfully deleted the task'))
	 *     .catch(console.error);
	 */
	delete() {
		return this.store.delete(this.id);
	}

	/**
	 * Override for JSON.stringify
	 * @since 0.5.0
	 * @returns {ScheduledTaskJSON}
	 */
	toJSON() {
		return {
			id: this.id,
			taskName: this.taskName,
			time: this.time.getTime(),
			catchUp: this.catchUp,
			data: this.data,
			repeat: this.recurring ? this.recurring.cron : null
		};
	}

	/**
	 * Resolve the time and cron
	 * @since 0.5.0
	 * @param {TimeResolvable} time The time or {@link Cron} pattern
	 * @returns {any[]}
	 * @private
	 */
	static _resolveTime(time) {
		if (time instanceof Date) return [time, null];
		if (time instanceof Cron) return [time.next(), time];
		if (typeof time === 'number') return [new Date(time), null];
		if (typeof time === 'string') {
			const cron = new Cron(time);
			return [cron.next(), cron];
		}
		throw new Error('invalid time passed');
	}

	/**
	 * Generate a new ID based on timestamp and shard
	 * @since 0.5.0
	 * @param {KlasaClient} client The Discord client
	 * @returns {string}
	 * @private
	 */
	static _generateID(client) {
		return `${Date.now().toString(36)}${client.options.shards[0].toString(36)}`;
	}

	/**
	 * Validate a task
	 * @since 0.5.0
	 * @param {ScheduledTask} st The task to validate
	 * @private
	 */
	static _validate(st) {
		if (!st.task) throw new Error('invalid task');
		if (!st.time) throw new Error('time or repeat option required');
		if (Number.isNaN(st.time.getTime())) throw new Error('invalid time passed');
	}

}

module.exports = ScheduledTask;
