const { isObject, deepClone, toTitleCase, arraysStrictEquals, objectToTuples, resolveGuild } = require('../util/util');
const Type = require('../util/Type');
const SchemaPiece = require('./schema/SchemaPiece');

/**
 * <warning>Creating your own Settings instances is often discouraged and unneeded. SettingsGateway handles them internally for you.</warning>
 * The Settings class that stores the cache for each entry in SettingsGateway.
 */
class Settings {

	/**
	 * @typedef {Object} SettingsJSON
	 */

	/**
	 * @typedef {Object} SettingsUpdateResult
	 * @property {Error[]} errors The errors caught from parsing
	 * @property {SettingsUpdateResultEntry[]} updated The updated keys
	 */

	/**
	 * @typedef {Object} SettingsUpdateResultEntry
	 * @property {any[]} data A tuple containing the path of the updated key and the new value
	 * @property {SchemaPiece} piece The SchemaPiece instance that manages the updated key
	 */

	/**
	 * @typedef {Object} SettingsUpdateOptions
	 * @property {boolean} [avoidUnconfigurable=false] Whether the update should avoid unconfigurable keys
	 * @property {('add'|'remove'|'auto'|'overwrite')} [action='auto'] Whether the update (when using arrays) should add or remove,
	 * leave it as 'auto' to add or remove depending on the existence of the key in the array
	 * @property {number} [arrayPosition=null] The position of the array to replace
	 * @property {boolean} [force=false] Whether this should skip the equality checks or not
	 */

	/**
	 * @typedef {Object} SettingsResetOptions
	 * @property {boolean} [avoidUnconfigurable=false] Whether the update should avoid unconfigurable keys
	 * @property {boolean} [force=false] Whether this should skip the equality checks or not
	 */

	/**
	 * @since 0.5.0
	 * @param {Gateway} manager The Gateway that manages this Settings instance
	 * @param {Object} data The data that is cached in this Settings instance
	 */
	constructor(manager, data) {
		/**
		 * The client this Settings was created with.
		 * @since 0.5.0
		 * @type {KlasaClient}
		 * @name Settings#client
		 * @readonly
		 */
		Object.defineProperty(this, 'client', { value: manager.client });

		/**
		 * The Gateway that manages this Settings instance.
		 * @since 0.5.0
		 * @type {Gateway}
		 * @name Settings#gateway
		 * @readonly
		 */
		Object.defineProperty(this, 'gateway', { value: manager });

		/**
		 * The ID that identifies this instance.
		 * @since 0.5.0
		 * @type {string}
		 * @name Settings#id
		 * @readonly
		 */
		Object.defineProperty(this, 'id', { value: data.id });

		/**
		 * Whether this entry exists in the DB or not.
		 * @since 0.5.0
		 * @type {?boolean}
		 * @name Settings#_existsInDB
		 * @private
		 */
		Object.defineProperty(this, '_existsInDB', { value: null, writable: true });

		const { defaults, schema } = this.gateway;
		for (const key of schema.keys()) this[key] = defaults[key];
		this._patch(data);
	}

	/**
	 * Check whether this Settings is being synchronized in the Gateway's sync queue.
	 * @since 0.5.0
	 * @type {boolean}
	 */
	get synchronizing() {
		return this.gateway.syncQueue.has(this.id);
	}

	/**
	 * Get a value from the configuration. Accepts nested objects separating by dot.
	 * @since 0.5.0
	 * @param {string|string[]} path The path of the key's value to get from this instance
	 * @returns {*}
	 */
	get(path) {
		const route = typeof path === 'string' ? path.split('.') : path;
		const piece = this.gateway.schema.get(route);
		if (!piece) return undefined;

		let refThis = this; // eslint-disable-line consistent-this
		for (const key of route) refThis = refThis[key];

		return refThis;
	}

	/**
	 * Clone this instance.
	 * @since 0.5.0
	 * @returns {Settings}
	 */
	clone() {
		return new this.constructor(this.gateway, this);
	}

	/**
	 * Sync the data from the database with the cache.
	 * @since 0.5.0
	 * @param {boolean} [force=false] Whether the sync should download from the database
	 * @returns {Promise<this>}
	 */
	sync(force = false) {
		// Await current sync status from the sync queue
		const syncStatus = this.gateway.syncQueue.get(this.id);
		if (!force || syncStatus) return syncStatus || Promise.resolve(this);

		// If it's not currently synchronizing, create a new sync status for the sync queue
		const sync = this.gateway.provider.get(this.gateway.type, this.id).then(data => {
			this._existsInDB = Boolean(data);
			if (data) this._patch(data);
			this.gateway.syncQueue.delete(this.id);
			return this;
		});

		this.gateway.syncQueue.set(this.id, sync);
		return sync;
	}

	/**
	 * Delete this entry from the database and cache.
	 * @since 0.5.0
	 * @returns {this}
	 */
	async destroy() {
		if (this._existsInDB) {
			await this.gateway.provider.delete(this.gateway.type, this.id);
			this.client.emit('settingsDeleteEntry', this);
		}
		return this;
	}

	/**
	 * Reset a value from an entry.
	 * @since 0.5.0
	 * @param {(string|string[])} [keys] The key to reset
	 * @param {KlasaGuild} [guild] A KlasaGuild instance for multilingual support
	 * @param {SettingsResetOptions} [options={}] The options for the reset
	 * @returns {SettingsUpdateResult}
	 * @example
	 * // Reset all keys for this instance
	 * Settings#reset();
	 *
	 * // Reset multiple keys for this instance
	 * Settings#reset(['prefix', 'channels.modlog']);
	 *
	 * // Reset a key
	 * Settings#reset('prefix');
	 */
	async reset(keys, guild, { avoidUnconfigurable = false, force = false } = {}) {
		if (typeof guild === 'boolean') {
			avoidUnconfigurable = guild;
			guild = undefined;
		}

		// If the entry does not exist in the DB, it'll never be able to reset a key
		if (!this._existsInDB) return { errors: [], updated: [] };

		if (typeof keys === 'string') keys = [keys];
		else if (typeof keys === 'undefined') keys = [...this.gateway.schema.values(true)].map(piece => piece.path);
		if (Array.isArray(keys)) {
			const result = { errors: [], updated: [] };
			for (const key of keys) {
				const path = this.gateway.getPath(key, { piece: true, avoidUnconfigurable, errors: false });
				if (!path) {
					result.errors.push(guild && guild.language ?
						guild.language.get('COMMAND_CONF_GET_NOEXT', key) :
						`The path ${key} does not exist in the current schema, or does not correspond to a piece.`);
					continue;
				}
				const value = deepClone(path.piece.default);
				if (this._setValueByPath(path.piece, value, force).updated) result.updated.push({ data: [path.piece.path, value], piece: path.piece });
			}
			await this._save(result);
			return result;
		}
		throw new TypeError(`Invalid value. Expected string or Array<string>. Got: ${new Type(keys)}`);
	}

	/**
	 * Update a value from an entry.
	 * @since 0.5.0
	 * @param {(string|Object)} key The key to modify
	 * @param {*} [value] The value to parse and save
	 * @param {GuildResolvable} [guild=null] A guild resolvable
	 * @param {SettingsUpdateOptions} [options={}] The options for the update
	 * @returns {SettingsUpdateResult}
	 * @async
	 * @example
	 * // Updating the value of a key
	 * Settings#update('roles.administrator', '339943234405007361', message.guild);
	 *
	 * // Updating an array:
	 * Settings#update('userBlacklist', '272689325521502208');
	 *
	 * // Ensuring the function call adds (error if it exists):
	 * Settings#update('userBlacklist', '272689325521502208', { action: 'add' });
	 *
	 * // Updating it with a json object:
	 * Settings#update({ roles: { administrator: '339943234405007361' } }, message.guild);
	 *
	 * // Updating multiple keys (with json object):
	 * Settings#update({ prefix: 'k!', language: 'es-ES' }, message.guild);
	 *
	 * // Updating multiple keys (with arrays):
	 * Settings#update([['prefix', 'k!'], ['language', 'es-ES']]);
	 */
	update(key, value, guild, options) {
		let entries;
		// Overload update(object, GuildResolvable);
		if (isObject(key)) {
			[guild, options] = [value, guild];
			entries = objectToTuples(key);
		} else if (typeof key === 'string') {
			// Overload update(string, any, ...any[]);
			entries = [[key, value]];
		} else if (Array.isArray(key) && key.every(entry => Array.isArray(entry) && entry.length === 2)) {
			// Overload update(Array<[string, any]>)
			[guild, options] = [value, guild];
			entries = key;
		} else {
			return Promise.reject(new TypeError(`Invalid value. Expected object, string or Array<[string, any]>. Got: ${new Type(key)}`));
		}

		// Overload update(string|string[], any|any[], SettingsUpdateOptions);
		// Overload update(string|string[], any|any[], GuildResolvable, SettingsUpdateOptions);
		// If the third argument is undefined and the second is an object literal, swap the variables.
		if (typeof options === 'undefined' && isObject(guild)) [guild, options] = [null, guild];
		if (guild) guild = resolveGuild(this.client, guild);
		if (!options) options = {};

		return this._update(entries, guild, {
			avoidUnconfigurable: typeof options.avoidUnconfigurable === 'boolean' ? options.avoidUnconfigurable : false,
			action: typeof options.action === 'string' ? options.action : 'auto',
			arrayPosition: typeof options.arrayPosition === 'number' ? options.arrayPosition : null,
			force: typeof options.force === 'boolean' ? options.force : false
		});
	}

	/**
	 * Get a list.
	 * @since 0.5.0
	 * @param {KlasaMessage} message The Message instance
	 * @param {(Schema|string)} path The path to resolve
	 * @returns {string}
	 */
	list(message, path) {
		const folder = typeof path === 'string' ? this.gateway.getPath(path, { piece: false }).piece : path;
		const array = [];
		const folders = [];
		const keys = {};
		let longest = 0;
		for (const [key, value] of folder.entries()) {
			if (value.type === 'Folder') {
				if (value.configurableKeys.length) folders.push(`// ${key}`);
			} else if (value.configurable) {
				if (!(value.type in keys)) keys[value.type] = [];
				if (key.length > longest) longest = key.length;
				keys[value.type].push(key);
			}
		}
		const keysTypes = Object.keys(keys);
		if (!folders.length && !keysTypes.length) return '';
		if (folders.length) array.push('= Folders =', ...folders.sort(), '');
		if (keysTypes.length) {
			for (const keyType of keysTypes.sort()) {
				array.push(`= ${toTitleCase(keyType)}s =`,
					...keys[keyType].sort().map(key => `${key.padEnd(longest)} :: ${this.resolveString(message, folder.get(key))}`),
					'');
			}
		}
		return array.join('\n');
	}

	/**
	 * Resolve a string.
	 * @since 0.5.0
	 * @param {KlasaMessage} message The Message to use
	 * @param {(SchemaPiece|string)} path The path to resolve
	 * @returns {string}
	 * @private
	 */
	resolveString(message, path) {
		const piece = path instanceof SchemaPiece ? path : this.gateway.getPath(path, { piece: true }).piece;
		const value = this.get(piece.path);
		if (value === null) return 'Not set';
		if (piece.array) return value.length ? `[ ${value.map(val => piece.serializer.stringify(val, message)).join(' | ')} ]` : 'None';
		return piece.serializer.stringify(value, message);
	}

	/**
	 * Update this Settings instance
	 * @since 0.5.0
	 * @param {Array<Array<*>>} entries The entries to update
	 * @param {?KlasaGuild} guild The KlasaGuild for context in SchemaPiece#parse
	 * @param {SettingsUpdateOptions} options The parse options
	 * @returns {SettingsUpdateResult}
	 * @private
	 */
	async _update(entries, guild, options) {
		const result = { errors: [], updated: [] };
		const pathOptions = { piece: true, avoidUnconfigurable: options.avoidUnconfigurable, errors: false };
		const promises = [];
		for (const [key, value] of entries) {
			const path = this.gateway.getPath(key, pathOptions);
			if (!path) {
				result.errors.push(guild ?
					guild.language.get('COMMAND_CONF_GET_NOEXT', key) :
					`The path ${key} does not exist in the current schema, or does not correspond to a piece.`);
				continue;
			}
			if (!path.piece.array && Array.isArray(value)) {
				result.errors.push(guild ?
					guild.language.get('SETTING_GATEWAY_KEY_NOT_ARRAY', key) :
					`The path ${key} does not store multiple values.`);
				continue;
			}
			promises.push(this._parse(value, guild, options, result, path));
		}

		if (promises.length) {
			await Promise.all(promises);
			await this._save(result);
		}

		return result;
	}

	/**
	 * Parse a value
	 * @since 0.5.0
	 * @param {*} value The value to parse
	 * @param {?KlasaGuild} guild The KlasaGuild for context in SchemaPiece#parse
	 * @param {SettingsUpdateOptions} options The parse options
	 * @param {SettingsUpdateResult} result The updated result
	 * @param {GatewayGetPathResult} path The path result
	 * @private
	 */
	async _parse(value, guild, options, result, { piece, route }) {
		const parsed = value === null ?
			deepClone(piece.default) :
			await (Array.isArray(value) ?
				this._parseAll(piece, value, guild, result.errors) :
				piece.parse(value, guild).catch((error) => { result.errors.push(error); }));
		if (typeof parsed === 'undefined') return;
		const parsedID = Array.isArray(parsed) ? parsed.map(val => piece.serializer.serialize(val)) : piece.serializer.serialize(parsed);
		if (piece.array) {
			this._parseArray(piece, route, parsedID, options, result);
		} else if (this._setValueByPath(piece, parsedID, options.force).updated) {
			result.updated.push({ data: [piece.path, parsedID], piece });
		}
	}

	/**
	 * Save the data to the database.
	 * @since 0.5.0
	 * @param {SettingsUpdateResult} result The data to save
	 * @private
	 */
	async _save({ updated }) {
		if (!updated.length) return;
		if (this._existsInDB === null) await this.sync(true);
		if (this._existsInDB === false) {
			await this.gateway.provider.create(this.gateway.type, this.id);
			this._existsInDB = true;
			this.client.emit('settingsCreateEntry', this);
		}

		await this.gateway.provider.update(this.gateway.type, this.id, updated);
		this.client.emit('settingsUpdateEntry', this, updated);
	}

	/**
	 * Parse a single value for an array
	 * @since 0.5.0
	 * @param {SchemaPiece} piece The SchemaPiece pointer that parses this entry
	 * @param {string[]} route The path bits for property accesses
	 * @param {*} parsed The parsed value
	 * @param {SettingsUpdateOptions} options The parse options
	 * @param {SettingsUpdateResult} result The updated result
	 * @private
	 */
	_parseArray(piece, route, parsed, { force, action, arrayPosition }, { updated, errors }) {
		if (action === 'overwrite') {
			if (!Array.isArray(parsed)) parsed = [parsed];
			if (this._setValueByPath(piece, parsed, force).updated) {
				updated.push({ data: [piece.path, parsed], piece });
			}
			return;
		}
		const array = this.get(route);
		if (typeof arrayPosition === 'number') {
			if (arrayPosition >= array.length) errors.push(new Error(`The option arrayPosition should be a number between 0 and ${array.length - 1}`));
			else array[arrayPosition] = parsed;
		} else {
			for (const value of Array.isArray(parsed) ? parsed : [parsed]) {
				const index = array.indexOf(value);
				if (action === 'auto') {
					if (index === -1) array.push(value);
					else array.splice(index, 1);
				} else if (action === 'add') {
					if (index !== -1) errors.push(new Error(`The value ${value} for the key ${piece.path} already exists.`));
					else array.push(value);
				} else if (index === -1) {
					errors.push(new Error(`The value ${value} for the key ${piece.path} does not exist.`));
				} else {
					array.splice(index, 1);
				}
			}
		}

		updated.push({ data: [piece.path, array], piece });
	}

	/**
	 * Parse all values from an array
	 * @since 0.5.0
	 * @param {SchemaPiece} piece The SchemaPiece pointer that parses this entry
	 * @param {Array<*>} values The values to parse
	 * @param {?KlasaGuild} guild The KlasaGuild for context in SchemaPiece#parse
	 * @param {Error[]} errors The Errors array
	 * @returns {Array<number|string>}
	 * @private
	 */
	async _parseAll(piece, values, guild, errors) {
		const output = [];
		await Promise.all(values.map(value => piece.parse(value, guild)
			.then(parsed => output.push(parsed))
			.catch(error => errors.push(error))));

		return output;
	}

	/**
	 * Set a value by its path
	 * @since 0.5.0
	 * @param {SchemaPiece} piece The piece that manages the key
	 * @param {*} parsedID The parsed ID value
	 * @param {boolean} force Whether this should skip the equality checks or not
	 * @returns {{ updated: boolean, old: any }}
	 * @private
	 */
	_setValueByPath(piece, parsedID, force) {
		const path = piece.path.split('.');
		const lastKey = path.pop();
		let cache = this; // eslint-disable-line consistent-this
		for (const key of path) cache = cache[key] || {};
		const old = cache[lastKey];

		// If both parts are equal, don't update
		if (!force && (piece.array ? arraysStrictEquals(old, parsedID) : old === parsedID)) return { updated: false, old };

		cache[lastKey] = parsedID;
		return { updated: true, old };
	}

	/**
	 * Path this Settings instance.
	 * @since 0.5.0
	 * @param {Object} data The data to patch
	 * @param {Object} [instance=this] The reference of this instance for recursion
	 * @param {Schema} [schema=this.gateway.schema] The Schema that sets the schema for this configuration's gateway
	 * @private
	 */
	_patch(data, instance = this, schema = this.gateway.schema) {
		if (typeof data !== 'object' || data === null) return;
		for (const [key, piece] of schema.entries()) {
			const value = data[key];
			if (value === undefined) continue;
			if (value === null) instance[key] = deepClone(piece.defaults);
			else if (piece.type === 'Folder') this._patch(value, instance[key], piece);
			else instance[key] = value;
		}
	}

	/**
	 * Returns the JSON-compatible object of this instance.
	 * @since 0.5.0
	 * @returns {SettingsJSON}
	 */
	toJSON() {
		return Object.assign({}, ...[...this.gateway.schema.keys()].map(key => ({ [key]: deepClone(this[key]) })));
	}

	/**
	 * Returns a better string when an instance of this class gets stringified.
	 * @since 0.5.0
	 * @returns {string}
	 */
	toString() {
		return `Settings(${this.gateway.type}:${this.id})`;
	}

}

module.exports = Settings;
