const { Provider, util } = require('klasa');
const { resolve } = require('path');
const fs = require('fs-nextra');

module.exports = class extends Provider {

	constructor(...args) {
		super(...args);
		this.baseDirectory = resolve(this.client.userBaseDirectory, 'bwd', 'provider', 'json');
	}

	/**
	 * Initializes the database
	 * @private
	 */
	async init() {
		await fs.ensureDir(this.baseDirectory).catch(err => this.client.emit('error', err));
	}

	/* Table methods */

	/**
	 * Checks if a directory exists.
	 * @param {string} table The name of the table you want to check
	 * @returns {Promise<boolean>}
	 */
	hasTable(table) {
		return fs.pathExists(resolve(this.baseDirectory, table));
	}

	/**
	 * Creates a new directory.
	 * @param {string} table The name for the new directory
	 * @returns {Promise<void>}
	 */
	createTable(table) {
		return fs.mkdir(resolve(this.baseDirectory, table));
	}

	/**
	 * Recursively deletes a directory.
	 * @param {string} table The directory's name to delete
	 * @returns {Promise<void>}
	 */
	deleteTable(table) {
		return this.hasTable(table)
			.then(exists => exists ? fs.emptyDir(resolve(this.baseDirectory, table)).then(() => fs.remove(resolve(this.baseDirectory, table))) : null);
	}

	/* Document methods */

	/**
	 * Get all documents from a directory.
	 * @param {string} table The name of the directory to fetch from
	 * @param {string[]} [entries] The entries to download, defaults to all keys in the directory
	 * @returns {Object[]}
	 */
	async getAll(table, entries) {
		if (!Array.isArray(entries) || !entries.length) entries = await this.getKeys(table);
		if (entries.length < 5000) {
			return Promise.all(entries.map(this.get.bind(this, table)));
		}

		const chunks = util.chunk(entries, 5000);
		const output = [];
		for (const chunk of chunks) output.push(...await Promise.all(chunk.map(this.get.bind(this, table))));
		return output;
	}

	/**
	 * Get all document names from a directory, filter by json.
	 * @param {string} table The name of the directory to fetch from
	 * @returns {string[]}
	 */
	async getKeys(table) {
		const dir = resolve(this.baseDirectory, table);
		const filenames = await fs.readdir(dir);
		const files = [];
		for (const filename of filenames) {
			if (filename.endsWith('.json')) files.push(filename.slice(0, filename.length - 5));
		}
		return files;
	}

	/**
	 * Get a document from a directory.
	 * @param {string} table The name of the directory
	 * @param {string} id The document name
	 * @returns {Promise<?Object>}
	 */
	get(table, id) {
		return fs.readJSON(resolve(this.baseDirectory, table, `${id}.json`)).catch(() => null);
	}

	/**
	 * Check if the document exists.
	 * @param {string} table The name of the directory
	 * @param {string} id The document name
	 * @returns {Promise<boolean>}
	 */
	has(table, id) {
		return fs.pathExists(resolve(this.baseDirectory, table, `${id}.json`));
	}

	/**
	 * Get a random document from a directory.
	 * @param {string} table The name of the directory
	 * @returns {Promise<Object>}
	 */
	getRandom(table) {
		return this.getKeys(table).then(data => this.get(table, data[Math.floor(Math.random() * data.length)]));
	}

	/**
	 * Insert a new document into a directory.
	 * @param {string} table The name of the directory
	 * @param {string} document The document name
	 * @param {Object} data The object with all properties you want to insert into the document
	 * @returns {Promise<void>}
	 */
	create(table, document, data = {}) {
		return fs.outputJSONAtomic(resolve(this.baseDirectory, table, `${document}.json`), { id: document, ...data });
	}

	/**
	 * Update a document from a directory.
	 * @param {string} table The name of the directory
	 * @param {string} document The document name
	 * @param {Object} data The object with all the properties you want to update
	 * @returns {void}
	 */
	async update(table, document, data) {
		const existent = await this.get(table, document);
		return fs.outputJSONAtomic(resolve(this.baseDirectory, table, `${document}.json`), util.mergeObjects(existent || { id: document }, this.parseUpdateInput(data)));
	}

	/**
	 * Replace all the data from a document.
	 * @param {string} table The name of the directory
	 * @param {string} document The document name
	 * @param {Object} data The new data for the document
	 * @returns {Promise<void>}
	 */
	replace(table, document, data) {
		return fs.outputJSONAtomic(resolve(this.baseDirectory, table, `${document}.json`), { id: document, ...this.parseUpdateInput(data) });
	}

	/**
	 * Delete a document from the table.
	 * @param {string} table The name of the directory
	 * @param {string} document The document name
	 * @returns {Promise<void>}
	 */
	delete(table, document) {
		return fs.unlink(resolve(this.baseDirectory, table, `${document}.json`));
	}

};
