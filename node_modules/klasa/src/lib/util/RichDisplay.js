const { MessageEmbed: Embed } = require('discord.js');
const ReactionHandler = require('./ReactionHandler');

/**
 * Klasa's RichDisplay, for helping paginated embeds with reaction buttons
 */
class RichDisplay {

	/**
	 * @typedef {Object} RichDisplayEmojisObject
	 * @property {Emoji} first The emoji for the 'first' button
	 * @property {Emoji} back The emoji for the 'back' button
	 * @property {Emoji} forward The emoji for the 'forward' button
	 * @property {Emoji} last The emoji for the 'last' button
	 * @property {Emoji} jump The emoji for the 'jump' button
	 * @property {Emoji} info The emoji for the 'info' button
	 * @property {Emoji} stop The emoji for the 'stop' button
	 */

	/**
	 * @typedef {Object} RichDisplayRunOptions
	 * @property {Function} [filter] A filter function to add to the ReactionHandler (Receives: Reaction, User)
	 * @property {boolean} [stop=true] If a stop reaction should be included
	 * @property {boolean} [jump=true] If a jump reaction should be included
	 * @property {boolean} [firstLast=true] If a first and last reaction should be included
	 * @property {string} [prompt=message.language.get('REACTIONHANDLER_PROMPT')] The prompt to be used when awaiting user input on a page to jump to
	 * @property {number} [startPage=0] The page to start the RichDisplay on
	 * @property {number} [max] The maximum total amount of reactions to collect
	 * @property {number} [maxEmojis] The maximum number of emojis to collect
	 * @property {number} [maxUsers] The maximum number of users to react
	 * @property {number} [time] The maximum amount of time in milliseconds before this RichDisplay should expire
	 */

	/**
	 * Constructs our RichDisplay instance
	 * @since 0.4.0
	 * @param {external:MessageEmbed} [embed=new MessageEmbed()] A Template embed to apply to all pages
	 */
	constructor(embed = new Embed()) {
		/**
		 * The embed template
		 * @since 0.4.0
		 * @type {external:MessageEmbed}
		 */
		this.embedTemplate = embed;

		/**
		 * The stored pages of the display
		 * @since 0.4.0
		 * @type {external:MessageEmbed[]}
		 */
		this.pages = [];

		/**
		 * An optional Info page/embed
		 * @since 0.4.0
		 * @type {?external:MessageEmbed}
		 */
		this.infoPage = null;

		/**
		 * The default emojis to use for this display
		 * @since 0.4.0
		 * @type {RichDisplayEmojisObject}
		 */
		this.emojis = {
			first: '⏮',
			back: '◀',
			forward: '▶',
			last: '⏭',
			jump: '🔢',
			info: 'ℹ',
			stop: '⏹'
		};

		/**
		 * If footers have been applied to all pages
		 * @since 0.4.0
		 * @type {boolean}
		 */
		this.footered = false;

		/**
		 * Adds a prefix to all footers (before page/pages)
		 * @since 0.5.0
		 * @type {string}
		 */
		this.footerPrefix = '';

		/**
		 * Adds a suffix to all footers (after page/pages)
		 * @since 0.5.0
		 * @type {string}
		 */
		this.footerSuffix = '';
	}

	/**
	 * A new instance of the template embed
	 * @since 0.4.0
	 * @type {external:MessageEmbed}
	 * @readonly
	 */
	get template() {
		return new Embed(this.embedTemplate);
	}

	/**
	 * Sets emojis to a new set of emojis
	 * @since 0.4.0
	 * @param {RichDisplayEmojisObject} emojis An object containing replacement emojis to use instead
	 * @returns {this}
	 * @chainable
	 */
	setEmojis(emojis) {
		Object.assign(this.emojis, emojis);
		return this;
	}

	/**
	 * Sets a prefix for all footers
	 * @since 0.5.0
	 * @param {string} prefix The prefix you want to add
	 * @returns {this}
	 * @chainable
	 */
	setFooterPrefix(prefix) {
		this.footered = false;
		this.footerPrefix = prefix;
		return this;
	}

	/**
	 * Sets a suffix for all footers
	 * @since 0.5.0
	 * @param {string} suffix The suffix you want to add
	 * @returns {this}
	 * @chainable
	 */
	setFooterSuffix(suffix) {
		this.footered = false;
		this.footerSuffix = suffix;
		return this;
	}

	/**
	 * Turns off the footer altering function
	 * @since 0.5.0
	 * @returns {this}
	 * @chainable
	 */
	useCustomFooters() {
		this.footered = true;
		return this;
	}

	/**
	 * Adds a page to the RichDisplay
	 * @since 0.4.0
	 * @param {(Function|external:MessageEmbed)} embed A callback with the embed template passed and the embed returned, or an embed
	 * @returns {this}
	 * @chainable
	 */
	addPage(embed) {
		this.pages.push(this._handlePageGeneration(embed));
		return this;
	}

	/**
	 * Adds an info page to the RichDisplay
	 * @since 0.4.0
	 * @param {(Function|external:MessageEmbed)} embed A callback with the embed template passed and the embed returned, or an embed
	 * @returns {this}
	 * @chainable
	 */
	setInfoPage(embed) {
		this.infoPage = this._handlePageGeneration(embed);
		return this;
	}

	/**
	 * Runs the RichDisplay
	 * @since 0.4.0
	 * @param {KlasaMessage} message A message to either edit, or use to send a new message for this RichDisplay
	 * @param {RichDisplayRunOptions} [options={}] The options to use while running this RichDisplay
	 * @returns {ReactionHandler}
	 */
	async run(message, options = {}) {
		if (!this.footered) this._footer();
		if (!options.filter) options.filter = () => true;
		const emojis = this._determineEmojis(
			[],
			!('stop' in options) || ('stop' in options && options.stop),
			!('jump' in options) || ('jump' in options && options.jump),
			!('firstLast' in options) || ('firstLast' in options && options.firstLast)
		);
		let msg;
		if (message.editable) {
			await message.edit({ embed: this.pages[options.startPage || 0] });
			msg = message;
		} else {
			msg = await message.channel.send(this.pages[options.startPage || 0]);
		}
		return new ReactionHandler(
			msg,
			(reaction, user) => emojis.includes(reaction.emoji.id || reaction.emoji.name) && user !== message.client.user && options.filter(reaction, user),
			options,
			this,
			emojis
		);
	}

	/**
	 * Adds page of pages footers to all pages
	 * @since 0.4.0
	 * @returns {void}
	 * @private
	 */
	async _footer() {
		for (let i = 1; i <= this.pages.length; i++) this.pages[i - 1].setFooter(`${this.footerPrefix}${i}/${this.pages.length}${this.footerSuffix}`);
		if (this.infoPage) this.infoPage.setFooter('ℹ');
	}

	/**
	 * Determines the emojis to use in this display
	 * @since 0.4.0
	 * @param {Emoji[]} emojis An array of emojis to use
	 * @param {boolean} stop Whether the stop emoji should be included
	 * @param {boolean} jump Whether the jump emoji should be included
	 * @param {boolean} firstLast Whether the first & last emojis should be included
	 * @returns {Emoji[]}
	 * @private
	 */
	_determineEmojis(emojis, stop, jump, firstLast) {
		if (this.pages.length > 1 || this.infoPage) {
			if (firstLast) emojis.push(this.emojis.first, this.emojis.back, this.emojis.forward, this.emojis.last);
			else emojis.push(this.emojis.back, this.emojis.forward);
		}
		if (this.infoPage) emojis.push(this.emojis.info);
		if (stop) emojis.push(this.emojis.stop);
		if (jump) emojis.push(this.emojis.jump);
		return emojis;
	}

	/**
	 * Resolves the callback or MessageEmbed into a MessageEmbed
	 * @since 0.4.0
	 * @param {(Function|external:MessageEmbed)} cb The callback or embed
	 * @returns {external:MessageEmbed}
	 * @private
	 */
	_handlePageGeneration(cb) {
		if (typeof cb === 'function') {
			// eslint-disable-next-line callback-return
			const page = cb(this.template);
			if (page instanceof Embed) return page;
		} else if (cb instanceof Embed) {
			return cb;
		}
		throw new Error('Expected a MessageEmbed or Function returning a MessageEmbed');
	}

}

module.exports = RichDisplay;
