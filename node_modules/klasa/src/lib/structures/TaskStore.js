const Task = require('./Task');
const Store = require('./base/Store');

/**
 * Stores all task pieces for use in Klasa
 * @extends Store
 */
class TaskStore extends Store {

	/**
	 * Constructs our TaskStore for use in Klasa
	 * @since 0.5.0
	 * @param {KlasaClient} client The Klasa client
	 */
	constructor(client) {
		super(client, 'tasks', Task);
	}

}

module.exports = TaskStore;
