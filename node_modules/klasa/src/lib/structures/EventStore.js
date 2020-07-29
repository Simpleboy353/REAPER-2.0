const Event = require('./Event');
const Store = require('./base/Store');

/**
 * Stores all the events that a part of Klasa
 * @extends Store
 */
class EventStore extends Store {

	/**
	 * Constructs our EventStore for use in Klasa
	 * @since 0.0.1
	 * @param {KlasaClient} client The klasa client initializing this store.
	 */
	constructor(client) {
		super(client, 'events', Event);

		/**
		 * Once events that have already run (so once means once)
		 * @since 0.5.0
		 * @type {Set<string>}
		 * @private
		 */
		this._onceEvents = new Set();
	}

	/**
	 * Loads a piece into Klasa so it can be saved in this store.
	 * @since 0.0.1
	 * @param {string|string[]} file A string or array of strings showing where the file is located.
	 * @param {boolean} [core=false] If the file is located in the core directory or not
	 * @returns {?Piece}
	 */
	load(file, core) {
		if (this._onceEvents.has(file[file.length - 1])) return undefined;
		return super.load(file, core);
	}

	/**
	 * Clears the events from the store and removes the listeners.
	 * @since 0.0.1
	 * @returns {void}
	 */
	clear() {
		for (const event of this.values()) this.delete(event);
	}

	/**
	 * Deletes an event from the store.
	 * @since 0.0.1
	 * @param {Event|string} name An event object or a string representing the event name.
	 * @returns {boolean} whether or not the delete was successful.
	 */
	delete(name) {
		const event = this.resolve(name);
		if (!event) return false;
		event._unlisten();
		return super.delete(event);
	}

	/**
	 * Sets up an event in our store.
	 * @since 0.0.1
	 * @param {Event} piece The event piece we are setting up
	 * @returns {?Event}
	 */
	set(piece) {
		const event = super.set(piece);
		if (!event) return undefined;
		event._listen();
		return event;
	}

}

module.exports = EventStore;
