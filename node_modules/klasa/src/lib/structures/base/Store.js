const { join, extname, relative, sep } = require('path');
const { Collection } = require('discord.js');
const fs = require('fs-nextra');
const { isClass } = require('../../util/util');

/**
 * The common base for all stores
 * @see ArgumentStore
 * @see CommandStore
 * @see EventStore
 * @see ExtendableStore
 * @see FinalizerStore
 * @see InhibitorStore
 * @see LanguageStore
 * @see MonitorStore
 * @see ProviderStore
 * @see SerializerStore
 * @see TaskStore
 * @extends external:Collection
 */
class Store extends Collection {

	constructor(client, name, holds) {
		super();

		/**
		 * The client this Store was created with
		 * @since 0.0.1
		 * @name Store#client
		 * @type {KlasaClient}
		 * @readonly
		 */
		Object.defineProperty(this, 'client', { value: client });

		/**
		 * The name of what this holds
		 * @since 0.3.0
		 * @name Store#name
		 * @type {string}
		 * @readonly
		 */
		Object.defineProperty(this, 'name', { value: name });

		/**
		 * The type of structure this store holds
		 * @since 0.1.1
		 * @name Store#holds
		 * @type {Piece}
		 * @readonly
		 */
		Object.defineProperty(this, 'holds', { value: holds });

		/**
		 * The core directories pieces of this store can hold
		 * @since 0.5.0
		 * @name Store#coreDirectories
		 * @type {Set<string>}
		 * @readonly
		 * @private
		 */
		Object.defineProperty(this, 'coreDirectories', { value: new Set() });
	}

	/**
	 * The directory of local pieces relative to where you run Klasa from.
	 * @since 0.0.1
	 * @type {string}
	 * @readonly
	 */
	get userDirectory() {
		return join(this.client.userBaseDirectory, this.name);
	}

	/**
	 * Registers a core directory to check for pieces
	 * @since 0.5.0
	 * @param {string} directory The directory to check for core pieces
	 * @returns {this}
	 * @protected
	 */
	registerCoreDirectory(directory) {
		this.coreDirectories.add(join(directory, this.name));
		return this;
	}

	/**
	 * Initializes all pieces in this store.
	 * @since 0.0.1
	 * @returns {Promise<Array<*>>}
	 */
	init() {
		return Promise.all(this.map(piece => piece.enabled ? piece.init() : piece.unload()));
	}

	/**
	 * Loads a piece into Klasa so it can be saved in this store.
	 * @since 0.0.1
	 * @param {string} directory The directory the file is located in
	 * @param {string[]} file A string or array of strings showing where the file is located.
	 * @returns {?Piece}
	 */
	load(directory, file) {
		const loc = join(directory, ...file);
		let piece = null;
		try {
			const Piece = (req => req.default || req)(require(loc));
			if (!isClass(Piece)) throw new TypeError('The exported structure is not a class.');
			piece = this.set(new Piece(this, file, directory));
		} catch (error) {
			if (this.client.listenerCount('wtf')) this.client.emit('wtf', `Failed to load file '${loc}'. Error:\n${error.stack || error}`);
			else this.client.console.wtf(`Failed to load file '${loc}'. Error:\n${error.stack || error}`);
		}
		delete require.cache[loc];
		module.children.pop();
		return piece;
	}

	/**
	 * Loads all of our Pieces from both the user and core directories.
	 * @since 0.0.1
	 * @returns {number} The number of Pieces loaded.
	 */
	async loadAll() {
		this.clear();
		if (!this.client.options.disabledCorePieces.includes(this.name)) {
			for (const directory of this.coreDirectories) await Store.walk(this, directory);
		}
		await Store.walk(this);
		return this.size;
	}

	/**
	 * Sets up a piece in our store.
	 * @since 0.0.1
	 * @param {Piece} piece The piece we are setting up
	 * @returns {Piece}
	 */
	set(piece) {
		if (!(piece instanceof this.holds)) throw new TypeError(`Only ${this} may be stored in this Store.`);
		const existing = this.get(piece.name);
		if (existing) this.delete(existing);
		else if (this.client.listenerCount('pieceLoaded')) this.client.emit('pieceLoaded', piece);
		super.set(piece.name, piece);
		return piece;
	}

	/**
	 * Deletes a command from the store.
	 * @since 0.0.1
	 * @param {Piece|string} name A command object or a string representing a command or alias name
	 * @returns {boolean} whether or not the delete was successful.
	 */
	delete(name) {
		const piece = this.resolve(name);
		if (!piece) return false;
		super.delete(piece.name);
		return true;
	}

	/**
	 * Resolve a string or piece into a piece object.
	 * @since 0.0.1
	 * @param {Piece|string} name The piece object or a string representing a piece's name
	 * @returns {Piece}
	 */
	resolve(name) {
		if (name instanceof this.holds) return name;
		return this.get(name);
	}

	/**
	 * Defines toString behavior for stores
	 * @since 0.3.0
	 * @returns {string} This store name
	 */
	toString() {
		return this.name;
	}

	/**
	 * Walks our directory of Pieces for the user and core directories.
	 * @since 0.0.1
	 * @param {Store} store The store we're loading into
	 * @param {string} [directory=store.userDirectory] The directory to walk in
	 * @returns {Array<Piece>}
	 * @private
	 */
	static async walk(store, directory = store.userDirectory) {
		const files = await fs.scan(directory, { filter: (stats, path) => stats.isFile() && extname(path) === '.js' })
			.catch(() => { if (store.client.options.createPiecesFolders) fs.ensureDir(directory).catch(err => store.client.emit('error', err)); });
		if (!files) return true;

		return Promise.all([...files.keys()].map(file => store.load(directory, relative(directory, file).split(sep))));
	}

	static get [Symbol.species]() {
		return Collection;
	}

}

module.exports = Store;
