const Serializer = require('./Serializer');
const AliasStore = require('./base/AliasStore');

/**
 * Stores all the serializers usable in Klasa
 * @extends AliasStore
 */
class SerializerStore extends AliasStore {

	/**
	 * Constructs our SerializerStore for use in Klasa
	 * @since 0.5.0
	 * @param {KlasaClient} client The Klasa Client
	 */
	constructor(client) {
		super(client, 'serializers', Serializer);
	}

}

module.exports = SerializerStore;
