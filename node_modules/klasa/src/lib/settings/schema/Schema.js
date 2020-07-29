const { isFunction, deepClone } = require('../../util/util');

/**
 * The base Schema for {@link Gateway}s
 * @extends Map
 * @since 0.5.0
 */
class Schema extends Map {

	/**
	 * @param {string} [basePath=''] The base schema path
	 */
	constructor(basePath = '') {
		super();

		/**
		 * Returns the path for this schema
		 * @since 0.5.0
		 * @name Schema#path
		 * @type {string}
		 * @readonly
		 */
		Object.defineProperty(this, 'path', { value: basePath });

		/**
		 * The type of this SchemaFolder (always 'Folder')
		 * @since 0.5.0
		 * @name SchemaFolder#type
		 * @type {string}
		 * @readonly
		 */
		Object.defineProperty(this, 'type', { value: 'Folder' });
	}

	/**
	 * Get the configurable keys for the current SchemaFolder or Schema instance
	 * @since 0.5.0
	 * @readonly
	 * @type {Array<string>}
	 */
	get configurableKeys() {
		const keys = [];
		for (const piece of this.values(true)) if (piece.configurable) keys.push(piece.path);
		return keys;
	}

	/**
	 * Get the defaults for the current SchemaFolder or Schema instance
	 * @since 0.5.0
	 * @readonly
	 * @type {Object}
	 */
	get defaults() {
		return Object.assign({}, ...[...this.values()].map(piece => ({ [piece.key]: piece.defaults || deepClone(piece.default) })));
	}

	/**
	 * Get the paths for the current SchemaFolder or Schema instance
	 * @since 0.5.0
	 * @readonly
	 * @type {Map<string, SchemaFolder|SchemaPiece>}
	 */
	get paths() {
		const paths = new Map();
		for (const piece of this.values(true)) paths.set(piece.path, piece);
		return paths;
	}

	/**
	 * Adds a Folder or Piece instance to the current SchemaFolder or Schema instance
	 * @since 0.5.0
	 * @param {string} key The name of this new piece you are trying to add.
	 * @param {string|Function} typeOrCallback A function to add a folder or a string to add a new SchemaPiece
	 * @param {SchemaPieceOptions} [options] An object of options used for SchemaPieces
	 * @returns {this}
	 * @chainable
	 * @example
	 * // callback is always passed the created folder to encourage chaining
	 * Schema.add('folder', (folder) => folder.add('piece', 'textchannel'));
	 * // or
	 * Schema.add('piece', 'string', { default: 'klasa!' });
	 */
	add(key, typeOrCallback, options = {}) {
		if (!typeOrCallback) throw new Error(`The type for ${key} must be a string for pieces, and a callback for folders`);

		let Piece;
		let type;
		let callback;
		if (isFunction(typeOrCallback)) {
			// .add('folder', (folder) => ());
			callback = typeOrCallback;
			type = 'Folder';
			Piece = require('./SchemaFolder');
		} else if (typeof typeOrCallback === 'string') {
			// .add('piece', 'string', { optional options });
			Piece = require('./SchemaPiece');
			type = typeOrCallback;
			callback = null;
		}

		// Get previous key and merge the new with the pre-existent if it exists
		const previous = super.get(key);
		if (previous) {
			if (type === 'Folder') {
				// If the type of the new piece is a Folder, the previous must also be a Folder.
				if (previous.type !== 'Folder') throw new Error(`The type for ${key} conflicts with the previous value, expected type Folder, got ${previous.type}.`);
				// Call the callback with the pre-existent Folder
				callback(previous); // eslint-disable-line callback-return
				return this;
			}
			// If the type of the new piece is not a Folder, the previous must also not be a Folder.
			if (previous.type === 'Folder') throw new Error(`The type for ${key} conflicts with the previous value, expected a non-Folder, got ${previous.type}.`);
			// Edit the previous key
			previous.edit({ type, ...options });
			return this;
		}
		const piece = new Piece(this, key, type, options);

		// eslint-disable-next-line callback-return
		if (callback) callback(piece);

		this.set(key, piece);

		return this;
	}

	/**
	 * Remove a key from the schema
	 * @since 0.5.0
	 * @param {string} key The key to remove
	 * @returns {this}
	 */
	remove(key) {
		super.delete(key);
		return this;
	}

	/**
	 * Get a SchemaPiece or a SchemaFolder given a path
	 * @since 0.5.0
	 * @param {string|string[]} key The key to get from the schema
	 * @returns {?SchemaPiece|SchemaFolder}
	 */
	get(key) {
		const path = typeof key === 'string' ? key.split('.') : key;
		const [now, ...next] = path;
		const piece = super.get(now);
		if (!piece) return undefined;
		return next.length && piece.type === 'Folder' ? piece.get(next) : piece;
	}

	/**
	 * Returns a new Iterator object that contains the keys for each element contained in this folder.
	 * Identical to [Map.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)
	 * @since 0.5.0
	 * @param {boolean} recursive Whether the iteration should be recursive
	 * @yields {string}
	 */
	*keys(recursive = false) {
		if (recursive) {
			for (const [key, value] of super.entries()) {
				if (value.type === 'Folder') yield* value.keys(recursive);
				else yield key;
			}
		} else {
			yield* super.keys();
		}
	}

	/**
	 * Returns a new Iterator object that contains the values for each element contained in this folder.
	 * Identical to [Map.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values)
	 * @since 0.5.0
	 * @param {boolean} recursive Whether the iteration should be recursive
	 * @yields {(SchemaFolder|SchemaPiece)}
	 */
	*values(recursive = false) {
		if (recursive) {
			for (const value of super.values()) {
				if (value.type === 'Folder') yield* value.values(recursive);
				else yield value;
			}
		} else {
			yield* super.values();
		}
	}

	/**
	 * Returns a new Iterator object that contains the `[key, value]` pairs for each element contained in this folder.
	 * Identical to [Map.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)
	 * @since 0.5.0
	 * @param {boolean} recursive Whether the iteration should be recursive
	 * @yields {Array<string|SchemaFolder|SchemaPiece>}
	 */
	*entries(recursive = false) {
		if (recursive) {
			for (const [key, value] of super.entries()) {
				if (value.type === 'Folder') yield* value.entries(recursive);
				else yield [key, value];
			}
		} else {
			yield* super.entries();
		}
	}

	/**
	 * Get a JSON object containing data from this SchemaFolder
	 * @since 0.5.0
	 * @returns {Object}
	 */
	toJSON() {
		return Object.assign({}, ...[...this.values()].map(piece => ({ [piece.key]: piece.toJSON() })));
	}

}

module.exports = Schema;
