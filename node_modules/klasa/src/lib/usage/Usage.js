const Tag = require('./Tag');
const TextPrompt = require('./TextPrompt');

const open = ['[', '(', '<'];
const close = [']', ')', '>'];
const space = [' ', '\n'];

/**
 * Converts usage strings into objects to compare against later
 */
class Usage {

	/**
	 * @since 0.0.1
	 * @param {KlasaClient} client The klasa client
	 * @param {string} usageString The raw usage string
	 * @param {string} usageDelim The deliminator for this usage
	 */
	constructor(client, usageString, usageDelim) {
		/**
		 * The client this Usage was created with
		 * @since 0.0.1
		 * @name Usage#client
		 * @type {KlasaClient}
		 * @readonly
		 */
		Object.defineProperty(this, 'client', { value: client });

		/**
		 * The usage string re-deliminated with the usageDelim
		 * @since 0.0.1
		 * @type {string}
		 */
		this.deliminatedUsage = usageString !== '' ? ` ${usageString.split(' ').join(usageDelim)}` : '';

		/**
		 * The usage string
		 * @since 0.0.1
		 * @type {string}
		 */
		this.usageString = usageString;

		/**
		 * The usage delim
		 * @since 0.5.0
		 * @type {string}
		 */
		this.usageDelim = usageDelim;

		/**
		 * The usage object to compare against later
		 * @since 0.0.1
		 * @type {Tag[]}
		 */
		this.parsedUsage = this.constructor.parseUsage(this.usageString);

		/**
		 * Stores one-off custom resolvers for use with the custom type arg
		 * @since 0.5.0
		 * @type {Object}
		 */
		this.customResolvers = {};
	}

	/**
	 * Registers a one-off custom resolver
	 * @param {string} type The type of the usage argument
	 * @param {Function} resolver The one-off custom resolver
	 * @returns {this}
	 * @chainable
	 * @since 0.5.0
	 */
	createCustomResolver(type, resolver) {
		this.customResolvers[type] = resolver;
		return this;
	}

	/**
	 * Customizes the response of an argument if it fails resolution.
	 * @param {string} name The name of the usage argument
	 * @param {(string|Function)} response The custom response or i18n function
	 * @returns {this}
	 * @chainable
	 * @since 0.5.0
	 */
	customizeResponse(name, response) {
		this.parsedUsage.some(tag => tag.register(name, response));
		return this;
	}

	/**
	 * Creates a TextPrompt instance to collect and resolve arguments with.
	 * @since 0.5.0
	 * @param {KlasaMessage} message The message context from the prompt
	 * @param {TextPromptOptions} [options] The options for the prompt
	 * @returns {TextPrompt}
	 */
	createPrompt(message, options = {}) {
		return new TextPrompt(message, this, options);
	}

	/**
	 * Defines json stringify behavior of this class.
	 * @since 0.5.0
	 * @returns {Tag[]}
	 */
	toJSON() {
		return this.parsedUsage;
	}

	/**
	 * Defines to string behavior of this class.
	 * @since 0.5.0
	 * @returns {string}
	 */
	toString() {
		return this.deliminatedUsage;
	}

	/**
	 * Method responsible for building the usage object to check against
	 * @since 0.0.1
	 * @param {string} usageString The usage string to parse
	 * @returns {Tag[]}
	 * @private
	 */
	static parseUsage(usageString) {
		const usage = {
			tags: [],
			opened: 0,
			current: '',
			openRegex: false,
			openReq: false,
			last: false,
			char: 0,
			from: 0,
			at: '',
			fromTo: ''
		};

		for (const [i, char] of Object.entries(usageString)) {
			usage.char = i + 1;
			usage.from = usage.char - usage.current.length;
			usage.at = `at char #${usage.char} '${char}'`;
			usage.fromTo = `from char #${usage.from} to #${usage.char} '${usage.current}'`;

			if (usage.last && char !== ' ') throw `${usage.at}: there can't be anything else after the repeat tag.`;

			if (char === '/' && usage.current[usage.current.length - 1] !== '\\') usage.openRegex = !usage.openRegex;

			if (usage.openRegex) {
				usage.current += char;
				continue;
			}

			if (open.includes(char)) this.tagOpen(usage, char);
			else if (close.includes(char)) this.tagClose(usage, char);
			else if (space.includes(char)) this.tagSpace(usage, char);
			else usage.current += char;
		}

		if (usage.opened) throw `from char #${usageString.length - usage.current.length} '${usageString.substr(-usage.current.length - 1)}' to end: a tag was left open`;
		if (usage.current) throw `from char #${(usageString.length + 1) - usage.current.length} to end '${usage.current}' a literal was found outside a tag.`;

		return usage.tags;
	}

	/**
	 * Method responsible for handling tag opens
	 * @since 0.0.1
	 * @param {Object} usage The current usage interim object
	 * @param {string} char The character that triggered this function
	 * @returns {void}
	 * @private
	 */
	static tagOpen(usage, char) {
		if (usage.opened) throw `${usage.at}: you may not open a tag inside another tag.`;
		if (usage.current) throw `${usage.fromTo}: there can't be a literal outside a tag`;
		usage.opened++;
		usage.openReq = open.indexOf(char);
	}

	/**
	 * Method responsible for handling tag closes
	 * @since 0.0.1
	 * @param {Object} usage The current usage interim object
	 * @param {string} char The character that triggered this function
	 * @returns {void}
	 * @private
	 */
	static tagClose(usage, char) {
		const required = close.indexOf(char);
		if (!usage.opened) throw `${usage.at}: invalid close tag found`;
		if (usage.openReq !== required) throw `${usage.at}: Invalid closure of '${open[usage.openReq]}${usage.current}' with '${close[required]}'`;
		if (!usage.current) throw `${usage.at}: empty tag found`;
		usage.opened--;
		if (usage.current === '...') {
			if (usage.openReq) throw `${usage.at}: repeat tag cannot be required`;
			if (usage.tags.length < 1) throw `${usage.fromTo}: there can't be a repeat at the beginning`;
			usage.tags[usage.tags.length - 1].repeat = true;
			usage.last = true;
		} else {
			usage.tags.push(new Tag(usage.current, usage.tags.length + 1, required));
		}
		usage.current = '';
	}

	/**
	 * Method responsible for handling tag spacing
	 * @since 0.0.1
	 * @param {Object} usage The current usage interim object
	 * @param {string} char The character that triggered this function
	 * @returns {void}
	 * @private
	 */
	static tagSpace(usage, char) {
		if (char === '\n') throw `${usage.at}: there can't be a line break in the usage string`;
		if (usage.opened) throw `${usage.at}: spaces aren't allowed inside a tag`;
		if (usage.current) throw `${usage.fromTo}: there can't be a literal outside a tag.`;
	}

}

module.exports = Usage;
