const Language = require('./Language');
const Store = require('./base/Store');

/**
 * Stores all languages for use in Klasa
 * @extends Store
 */
class LanguageStore extends Store {

	/**
	 * Constructs our LanguageStore for use in Klasa
	 * @since 0.2.1
	 * @param {KlasaClient} client The Klasa client
	 */
	constructor(client) {
		super(client, 'languages', Language);
	}

	/**
	 * The default language set in {@link KlasaClientOptions.language}
	 * @since 0.2.1
	 * @type {?Language}
	 * @readonly
	 */
	get default() {
		return this.get(this.client.options.language) || null;
	}

}

module.exports = LanguageStore;
