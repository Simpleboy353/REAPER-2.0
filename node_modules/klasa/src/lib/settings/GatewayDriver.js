const Gateway = require('./Gateway');
const Schema = require('./schema/Schema');

/**
 * <warning>GatewayDriver is a singleton, use {@link KlasaClient#gateways} instead.</warning>
 * Gateway's driver to make new instances of it, with the purpose to handle different databases simultaneously.
 */
class GatewayDriver {

	/**
	 * @typedef {Object} GatewayDriverRegisterOptions
	 * @property {string} [provider = this.client.options.providers.default] The name of the provider to use
	 * @property {Schema} [schema] The schema to use for this gateway.
	 * @property {string|string[]|true} [syncArg] The sync args to pass to Gateway#sync during Gateway init
	 */

	/**
	 * @since 0.3.0
	 * @param {KlasaClient} client The Klasa client
	 */
	constructor(client) {
		/**
		 * The client this GatewayDriver was created with.
		 * @since 0.3.0
		 * @name GatewayDriver#client
		 * @type {KlasaClient}
		 * @readonly
		 */
		Object.defineProperty(this, 'client', { value: client });

		/**
		 * The register creation queue.
		 * @since 0.5.0
		 * @name GatewayDriver#_queue
		 * @type {Array<Function>}
		 * @readonly
		 * @private
		 */
		Object.defineProperty(this, '_queue', { value: [] });

		/**
		 * All the gateways added
		 * @type {Set<string>}
		 */
		this.keys = new Set();

		/**
		 * The Gateway that manages per-guild data
		 * @type {?Gateway}
		 */
		this.guilds = null;

		/**
		 * The Gateway that manages per-user data
		 * @type {?Gateway}
		 */
		this.users = null;

		/**
		 * The Gateway that manages per-client data
		 * @type {?Gateway}
		 */
		this.clientStorage = null;
	}


	/**
	 * Registers a new Gateway.
	 * @since 0.5.0
	 * @param {string} name The name for the new gateway
	 * @param {GatewayDriverRegisterOptions} [options = {}] The options for the new gateway
	 * @returns {this}
	 * @chainable
	 */
	register(name, { provider = this.client.options.providers.default, schema = new Schema() } = {}) {
		if (typeof name !== 'string') throw new TypeError('You must pass a name for your new gateway and it must be a string.');
		if (!(schema instanceof Schema)) throw new TypeError('Schema must be a valid Schema instance.');
		if (this.name !== undefined && this.name !== null) throw new Error(`The key '${name}' is either taken by another Gateway or reserved for GatewayDriver's functionality.`);

		const gateway = new Gateway(this, name, schema, provider);
		this.keys.add(name);
		this[name] = gateway;
		this._queue.push(gateway.init.bind(gateway));
		if (!(name in this.client.options.gateways)) this.client.options.gateways[name] = {};
		return this;
	}

	/**
	 * Initializes all gateways from the queue
	 * @since 0.5.0
	 */
	async init() {
		await Promise.all([...this._queue].map(fn => fn()));
		this._queue.length = 0;
	}

	/**
	 * Sync all gateways
	 * @since 0.5.0
	 * @param {(string|string[])} input The arguments to pass to each Gateway#sync
	 * @returns {Promise<Array<Gateway>>}
	 */
	sync(input) {
		return Promise.all([...this].map(([key, gateway]) => gateway.sync(typeof input === 'undefined' ? this.client.options.gateways[key].syncArg : input)));
	}

	/**
	 * Returns a new Iterator object that contains the values for each gateway contained in this driver.
	 * @name @@iterator
	 * @since 0.5.0
	 * @method
	 * @instance
	 * @generator
	 * @returns {Iterator<Array<string | Gateway>>}
	 * @memberof GatewayDriver
	 */

	*[Symbol.iterator]() {
		for (const key of this.keys) yield [key, this[key]];
	}

	/**
	 * The GatewayDriver with all gateways, types and keys as JSON.
	 * @since 0.5.0
	 * @returns {Object}
	 */
	toJSON() {
		return {
			keys: [...this.keys],
			ready: this.ready,
			...Object.assign({}, [...this].map(([key, value]) => ({ [key]: value.toJSON() })))
		};
	}

	/**
	 * The stringified GatewayDriver with all the managed gateways.
	 * @since 0.5.0
	 * @returns {string}
	 */
	toString() {
		return `GatewayDriver(${[...this.keys].join(', ')})`;
	}

}

module.exports = GatewayDriver;
