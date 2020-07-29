const Piece = require('./base/Piece');

/**
 * Base class for all Klasa Events. See {@tutorial CreatingEvents} for more information how to use this class
 * to build custom events.
 * @tutorial CreatingEvents
 * @extends Piece
 */
class Event extends Piece {

	/**
	 * @typedef {PieceOptions} EventOptions
	 * @property {boolean} [once=false] If this event should only be run once and then unloaded
	 * @property {EventEmitter|string} [emitter=this.client] The emitter this event should be for (string indicates a client property)
	 * @property {string} [event=this.name] The event that should be listened to
	 */

	/**
	 * @since 0.0.1
	 * @param {EventStore} store The Event Store
	 * @param {string} file The path from the pieces folder to the event file
	 * @param {string} directory The base directory to the pieces folder
	 * @param {EventOptions} [options={}] Optional Event settings
	 */
	constructor(store, file, directory, options = {}) {
		super(store, file, directory, options);

		/**
		 * If this event should only be run once and then unloaded
		 * @since 0.5.0
		 * @type {boolean}
		 */
		this.once = options.once;

		/**
		 * The emitter this event is for
		 * @since 0.5.0
		 * @type {EventEmitter}
		 */
		this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;

		/**
		 * The event to listen for
		 * @since 0.5.0
		 * @type {string}
		 */
		this.event = options.event || this.name;

		/**
		 * Stored bound on method, so it can be properly unlistened to later
		 * @since 0.5.0
		 * @type {Function}
		 * @private
		 */
		this._listener = this.once ? this._runOnce.bind(this) : this._run.bind(this);
	}

	/**
	 * The run method to be overwritten in actual event handlers
	 * @since 0.0.1
	 * @param {*} param The event parameters emitted
	 * @returns {void}
	 * @abstract
	 */
	run() {
		// Defined in extension Classes
		throw new Error(`The run method has not been implemented by ${this.type}:${this.name}.`);
	}

	/**
	 * Disables this Event
	 * @since 0.0.1
	 * @returns {this}
	 * @chainable
	 */
	disable() {
		this._unlisten();
		return super.disable();
	}

	/**
	 * Enables this Event
	 * @since 0.0.1
	 * @returns {this}
	 * @chainable
	 */
	enable() {
		this._listen();
		return super.enable();
	}

	/**
	 * A wrapper for the run method, to easily disable/enable events
	 * @since 0.0.1
	 * @param {*} param The event parameters emitted
	 * @returns {void}
	 * @private
	 */
	async _run(...args) {
		try {
			await this.run(...args);
		} catch (err) {
			this.client.emit('eventError', this, args, err);
		}
	}

	/**
	 * A wrapper for the _run method for once handling
	 * @since 0.0.1
	 * @param {*} param The event parameters emitted
	 * @returns {void}
	 * @private
	 */
	async _runOnce(...args) {
		await this._run(...args);
		this.store._onceEvents.add(this.file[this.file.length - 1]);
		this.unload();
	}

	/**
	 * Attaches the proper listener to the emitter
	 * @since 0.5.0
	 * @returns {void}
	 * @private
	 */
	_listen() {
		this.emitter[this.once ? 'once' : 'on'](this.event, this._listener);
	}

	/**
	 * Removes the listener from the emitter
	 * @since 0.5.0
	 * @returns {void}
	 * @private
	 */
	_unlisten() {
		this.emitter.removeListener(this.event, this._listener);
	}

	/**
	 * Defines the JSON.stringify behavior of this extendable.
	 * @returns {Object}
	 */
	toJSON() {
		return {
			...super.toJSON(),
			once: this.once,
			event: this.event,
			emitter: this.emitter.constructor.name
		};
	}

}

module.exports = Event;
