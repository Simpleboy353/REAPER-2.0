const { mergeDefault } = require('../util/util');
const { Collection } = require('discord.js');
const quotes = ['"', "'", '“”', '‘’'];

/**
 * A class to handle argument collection and parameter resolution
 */
class TextPrompt {

	/**
	 * @typedef {Object} TextPromptOptions
	 * @property {KlasaUser} [target=message.author] The intended target of this TextPrompt, if someone other than the author
	 * @property {external:TextBasedChannel} [channel=message.channel] The channel to prompt in, if other than this channel
	 * @property {number} [limit=Infinity] The number of re-prompts before this TextPrompt gives up
	 * @property {number} [time=30000] The time-limit for re-prompting
	 * @property {boolean} [quotedStringSupport=false] Whether this prompt should respect quoted strings
	 * @property {boolean} [flagSupport=true] Whether this prompt should respect flags
	 */

	/**
	 * @since 0.5.0
	 * @param {KlasaMessage} message The message this prompt is for
	 * @param {Usage} usage The usage for this prompt
	 * @param {TextPromptOptions} [options={}] The options of this prompt
	 */
	constructor(message, usage, options = {}) {
		options = mergeDefault(message.client.options.customPromptDefaults, options);

		/**
		 * The client this TextPrompt was created with
		 * @since 0.5.0
		 * @name TextPrompt#client
		 * @type {KlasaClient}
		 * @readonly
		 */
		Object.defineProperty(this, 'client', { value: message.client });

		/**
		 * The message this prompt is for
		 * @since 0.5.0
		 * @type {KlasaMessage}
		 */
		this.message = message;

		/**
		 * The target this prompt is for
		 * @since 0.5.0
		 * @type {KlasaUser}
		 */
		this.target = options.target || message.author;

		/**
		 * The channel to prompt in
		 * @since 0.5.0
		 * @type {external:TextBasedChannel}
		 */
		this.channel = options.channel || message.channel;

		/**
		 * The usage for this prompt
		 * @since 0.5.0
		 * @type {Usage|CommandUsage}
		 */
		this.usage = usage;

		/**
		 * If the command reprompted for missing args
		 * @since 0.0.1
		 * @type {boolean}
		 */
		this.reprompted = false;

		/**
		 * The flag arguments resolved by this class
		 * @since 0.5.0
		 * @type {Object}
		 */
		this.flags = {};

		/**
		 * The string arguments derived from the usageDelim of the command
		 * @since 0.0.1
		 * @type {string[]}
		 */
		this.args = [];

		/**
		 * The parameters resolved by this class
		 * @since 0.0.1
		 * @type {any[]}
		 */
		this.params = [];

		/**
		 * The time-limit for re-prompting
		 * @since 0.5.0
		 * @type {number}
		 */
		this.time = options.time;

		/**
		 * The number of re-prompts before this TextPrompt gives up
		 * @since 0.5.0
		 * @type {number}
		 */
		this.limit = options.limit;

		/**
		 * Whether this prompt should respect quoted strings
		 * @since 0.5.0
		 * @type {boolean}
		 */
		this.quotedStringSupport = options.quotedStringSupport;

		/**
		 * Whether this prompt should respect flags
		 * @since 0.5.0
		 * @type {boolean}
		 */
		this.flagSupport = options.flagSupport;

		/**
		 * Whether the current usage is a repeating arg
		 * @since 0.0.1
		 * @type {boolean}
		 * @private
		 */
		this._repeat = false;

		/**
		 * Whether the current usage is required
		 * @since 0.0.1
		 * @type {number}
		 * @private
		 */
		this._required = 0;

		/**
		 * How many time this class has reprompted
		 * @since 0.0.1
		 * @type {boolean}
		 * @private
		 */
		this._prompted = 0;

		/**
		 * A cache of the current usage while validating
		 * @since 0.0.1
		 * @type {Tag}
		 * @private
		 */
		this._currentUsage = {};

		/**
		 * A cache of the users responses
		 * @since 0.5.0
		 * @type external:Collection
		 */
		this.responses = new Collection();
	}

	/**
	 * Runs the custom prompt.
	 * @since 0.5.0
	 * @param {StringResolvable | MessageOptions | MessageAdditions | APIMessage} prompt The message to initially prompt with
	 * @returns {any[]} The parameters resolved
	 */
	async run(prompt) {
		const message = await this.prompt(prompt);
		this.responses.set(message.id, message);
		this._setup(message.content);
		return this.validateArgs();
	}

	/**
	 * Prompts the target for a response
	 * @param {StringResolvable | MessageOptions | MessageAdditions | APIMessage} text The text to prompt
	 * @returns {KlasaMessage}
	 * @private
	 */
	async prompt(text) {
		const message = await this.channel.send(text);
		const responses = await message.channel.awaitMessages(msg => msg.author === this.target, { time: this.time, max: 1 });
		message.delete();
		if (responses.size === 0) throw this.message.language.get('MESSAGE_PROMPT_TIMEOUT');
		return responses.first();
	}

	/**
	 * Collects missing required arguments.
	 * @since 0.5.0
	 * @param {string} prompt The reprompt error
	 * @returns {any[]}
	 * @private
	 */
	async reprompt(prompt) {
		this._prompted++;
		if (this.typing) this.message.channel.stopTyping();
		const possibleAbortOptions = this.message.language.get('TEXT_PROMPT_ABORT_OPTIONS');
		const edits = this.message.edits.length;
		const message = await this.prompt(
			this.message.language.get('MONITOR_COMMAND_HANDLER_REPROMPT', `<@!${this.target.id}>`, prompt, this.time / 1000, possibleAbortOptions)
		);
		if (this.message.edits.length !== edits || message.prefix || possibleAbortOptions.includes(message.content.toLowerCase())) throw this.message.language.get('MONITOR_COMMAND_HANDLER_ABORTED');

		this.responses.set(message.id, message);

		if (this.typing) this.message.channel.startTyping();
		this.args[this.args.lastIndexOf(null)] = message.content;
		this.reprompted = true;

		if (this.usage.parsedUsage[this.params.length].repeat) return this.repeatingPrompt(prompt);
		return this.validateArgs();
	}

	/**
	 * Collects repeating arguments.
	 * @since 0.5.0
	 * @returns {any[]}
	 * @private
	 */
	async repeatingPrompt() {
		if (this.typing) this.message.channel.stopTyping();
		let message;
		const possibleCancelOptions = this.message.language.get('TEXT_PROMPT_ABORT_OPTIONS');
		try {
			message = await this.prompt(
				this.message.language.get('MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT', `<@!${this.message.author.id}>`, this._currentUsage.possibles[0].name, this.time / 1000, possibleCancelOptions)
			);
			this.responses.set(message.id, message);
		} catch (err) {
			return this.validateArgs();
		}

		if (possibleCancelOptions.includes(message.content.toLowerCase())) return this.validateArgs();

		if (this.typing) this.message.channel.startTyping();
		this.args.push(message.content);
		this.reprompted = true;

		return this.repeatingPrompt();
	}

	/**
	 * Validates and resolves args into parameters
	 * @since 0.0.1
	 * @returns {any[]} The resolved parameters
	 * @private
	 */
	async validateArgs() {
		if (this.params.length >= this.usage.parsedUsage.length && this.params.length >= this.args.length) {
			return this.finalize();
		} else if (this.usage.parsedUsage[this.params.length]) {
			this._currentUsage = this.usage.parsedUsage[this.params.length];
			this._required = this._currentUsage.required;
		} else if (this._currentUsage.repeat) {
			this._required = 0;
			this._repeat = true;
		} else {
			return this.finalize();
		}

		this._prompted = 0;
		return this.multiPossibles(0);
	}

	/**
	 * Validates and resolves args into parameters, when multiple types of usage is defined
	 * @since 0.0.1
	 * @param {number} index The id of the possible usage currently being checked
	 * @returns {any[]} The resolved parameters
	 * @private
	 */
	async multiPossibles(index) {
		const possible = this._currentUsage.possibles[index];
		const custom = this.usage.customResolvers[possible.type];
		const resolver = this.client.arguments.get(custom ? 'custom' : possible.type);

		if (possible.name in this.flags) this.args.splice(this.params.length, 0, this.flags[possible.name]);
		if (!resolver) {
			this.client.emit('warn', `Unknown Argument Type encountered: ${possible.type}`);
			if (this._currentUsage.possibles.length === 1) return this.pushParam(undefined);
			return this.multiPossibles(++index);
		}

		try {
			const res = await resolver.run(this.args[this.params.length], possible, this.message, custom);
			if (typeof res === 'undefined' && this._required === 1) this.args.splice(this.params.length, 0, undefined);
			return this.pushParam(res);
		} catch (err) {
			if (index < this._currentUsage.possibles.length - 1) return this.multiPossibles(++index);
			if (!this._required) {
				this.args.splice(...this._repeat ? [this.params.length, 1] : [this.params.length, 0, undefined]);
				return this._repeat ? this.validateArgs() : this.pushParam(undefined);
			}

			const { response } = this._currentUsage;
			const error = typeof response === 'function' ? response(this.message, possible) : response;

			if (this._required === 1) return this.handleError(error || err);
			if (this._currentUsage.possibles.length === 1) {
				return this.handleError(error || (this.args[this.params.length] === undefined ? this.message.language.get('COMMANDMESSAGE_MISSING_REQUIRED', possible.name) : err));
			}
			return this.handleError(error || this.message.language.get('COMMANDMESSAGE_NOMATCH', this._currentUsage.possibles.map(poss => poss.name).join(', ')));
		}
	}

	/**
	 * Pushes a parameter into this.params, and resets the re-prompt count.
	 * @since 0.5.0
	 * @param {any} param The resolved parameter
	 * @returns {any[]}
	 * @private
	 */
	pushParam(param) {
		this.params.push(param);
		return this.validateArgs();
	}

	/**
	 * Decides if the prompter should reprompt or throw the error found while validating.
	 * @since 0.5.0
	 * @param {string} err The error found while validating
	 * @returns {any[]}
	 * @private
	 */
	async handleError(err) {
		this.args.splice(this.params.length, 1, null);
		if (this.limit && this._prompted < this.limit) return this.reprompt(err);
		throw err;
	}

	/**
	 * Finalizes parameters and arguments for this prompt.
	 * @since 0.5.0
	 * @returns {any[]}
	 * @private
	 */
	finalize() {
		for (let i = this.params.length - 1; i >= 0 && this.params[i] === undefined; i--) this.params.pop();
		for (let i = this.args.length - 1; i >= 0 && this.args[i] === undefined; i--) this.args.pop();
		return this.params;
	}

	/**
	 * Splits the original message string into arguments.
	 * @since 0.5.0
	 * @param {string} original The original message string
	 * @returns {void}
	 * @private
	 */
	_setup(original) {
		const { content, flags } = this.flagSupport ? this.constructor.getFlags(original, this.usage.usageDelim) : { content: original, flags: {} };
		this.flags = flags;
		this.args = this.quotedStringSupport ?
			this.constructor.getQuotedStringArgs(content, this.usage.usageDelim).map(arg => arg.trim()) :
			this.constructor.getArgs(content, this.usage.usageDelim).map(arg => arg.trim());
	}

	/**
	 * Parses a message into string args
	 * @since 0.5.0
	 * @param {string} content The remaining content
	 * @param {string} delim The delimiter
	 * @returns {Object}
	 * @private
	 */
	static getFlags(content, delim) {
		const flags = {};
		content = content.replace(this.flagRegex, (match, fl, ...quote) => {
			flags[fl] = (quote.slice(0, -2).find(el => el) || fl).replace(/\\/g, '');
			return '';
		});
		if (delim) content = content.replace(this.delims.get(delim) || this.generateNewDelim(delim), '$1').trim();
		return { content, flags };
	}

	/**
	 * Parses a message into string args
	 * @since 0.0.1
	 * @param {string} content The remaining content
	 * @param {string} delim The delimiter
	 * @returns {string[]}
	 * @private
	 */
	static getArgs(content, delim) {
		const args = content.split(delim !== '' ? delim : undefined);
		return args.length === 1 && args[0] === '' ? [] : args;
	}

	/**
	 * Parses a message into string args taking into account quoted strings
	 * @since 0.0.1
	 * @param {string} content The remaining content
	 * @param {string} delim The delimiter
	 * @returns {string[]}
	 * @private
	 */
	static getQuotedStringArgs(content, delim) {
		if (!delim || delim === '') return [content];

		const args = [];

		for (let i = 0; i < content.length; i++) {
			let current = '';
			if (content.slice(i, i + delim.length) === delim) {
				i += delim.length - 1;
				continue;
			}
			const quote = quotes.find(qt => qt.includes(content[i]));
			if (quote) {
				const qts = quote.split('');
				while (i + 1 < content.length && (content[i] === '\\' || !qts.includes(content[i + 1]))) current += content[++i] === '\\' && qts.includes(content[i + 1]) ? '' : content[i];
				i++;
				args.push(current);
			} else {
				current += content[i];
				while (i + 1 < content.length && content.slice(i + 1, i + delim.length + 1) !== delim) current += content[++i];
				args.push(current);
			}
		}

		return args.length === 1 && args[0] === '' ? [] : args;
	}

	/**
	 * Generate a new delimiter's RegExp and cache it
	 * @since 0.5.0
	 * @param {string} delim The delimiter
	 * @returns {RegExp}
	 * @private
	 */
	static generateNewDelim(delim) {
		const regex = new RegExp(`(${delim})(?:${delim})+`, 'g');
		this.delims.set(delim, regex);
		return regex;
	}

}

/**
 * Map of RegExps caching usageDelim's RegExps.
 * @since 0.5.0
 * @type {Map<string, RegExp>}
 * @static
 * @private
 */
TextPrompt.delims = new Map();

/**
 * Regular Expression to match flags with quoted string support.
 * @since 0.5.0
 * @type {RegExp}
 * @static
 */
TextPrompt.flagRegex = new RegExp(`(?:--|—)(\\w[\\w-]+)(?:=(?:${quotes.map(qu => `[${qu}]((?:[^${qu}\\\\]|\\\\.)*)[${qu}]`).join('|')}|([\\w<>@#&!-]+)))?`, 'g');

module.exports = TextPrompt;
