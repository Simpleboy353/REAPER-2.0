const Argument = require('./Argument');
const AliasStore = require('./base/AliasStore');

/**
 * Stores all the arguments usable in Klasa
 * @extends AliasStore
 */
class ArgumentStore extends AliasStore {

	/**
	 * Constructs our ArgumentStore for use in Klasa
	 * @since 0.5.0
	 * @param {KlasaClient} client The Klasa Client
	 */
	constructor(client) {
		super(client, 'arguments', Argument);
	}

}

module.exports = ArgumentStore;
