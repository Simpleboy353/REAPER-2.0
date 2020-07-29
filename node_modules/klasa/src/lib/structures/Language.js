const { pathExists } = require('fs-nextra');
const { join } = require('path');
const Piece = require('./base/Piece');
const { mergeDefault, isClass } = require('../util/util');

/**
 * Base class for all Klasa Languages. See {@tutorial CreatingLanguages} for more information how to use this class
 * to build custom languages.
 * @tutorial CreatingLanguages
 * @extends Piece
 */
class Language extends Piece {

	/**
	 * The method to get language strings
	 * @since 0.2.1
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		if (!this.enabled && this !== this.store.default) return this.store.default.get(term, ...args);
		const value = this.language[term];
		/* eslint-disable new-cap */
		switch (typeof value) {
			case 'function': return value(...args);
			case 'undefined':
				if (this === this.store.default) return this.language.DEFAULT(term);
				return `${this.language.DEFAULT(term)}\n\n**${this.language.DEFAULT_LANGUAGE}:**\n${this.store.default.get(term, ...args)}`;
			default: return value;
		}
		/* eslint-enable new-cap */
	}

	/**
	 * The init method to be optionally overwritten in actual languages
	 * @since 0.2.1
	 * @returns {void}
	 * @abstract
	 */
	async init() {
		for (const core of this.store.coreDirectories) {
			const loc = join(core, ...this.file);
			if (this.dir !== core && await pathExists(loc)) {
				try {
					const CorePiece = (req => req.default || req)(require(loc));
					if (!isClass(CorePiece)) return;
					const coreLang = new CorePiece(this.store, this.file, core);
					this.language = mergeDefault(coreLang.language, this.language);
				} catch (error) {
					return;
				}
			}
		}
		return;
	}

}

module.exports = Language;
