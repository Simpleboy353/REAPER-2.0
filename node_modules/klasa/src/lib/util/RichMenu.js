const RichDisplay = require('./RichDisplay');

/**
 * Klasa's RichMenu, for helping paginated embeds with reaction buttons
 * @extends RichDisplay
 */
class RichMenu extends RichDisplay {

	/**
	 * @typedef {RichDisplayEmojisObject} RichMenuEmojisObject
	 * @property {Emoji} zero The emoji for the 'zero' button
	 * @property {Emoji} one The emoji for the 'one' button
	 * @property {Emoji} two The emoji for the 'two' button
	 * @property {Emoji} three The emoji for the 'three' button
	 * @property {Emoji} four The emoji for the 'four' button
	 * @property {Emoji} five The emoji for the 'five' button
	 * @property {Emoji} six The emoji for the 'six' button
	 * @property {Emoji} seven The emoji for the 'seven' button
	 * @property {Emoji} eight The emoji for the 'eight' button
	 * @property {Emoji} nine The emoji for the 'nine' button
	 */

	/**
	 * @typedef {Object} MenuOptions
	 * @property {string} name The name of the option
	 * @property {string} body The description of the option
	 * @property {boolean} [inline=false] Whether the option should be inline
	 */

	/**
	 * @typedef {Object} RichMenuRunOptions
	 * @property {Function} [filter] A filter function to add to the ReactionHandler (Receives: Reaction, User)
	 * @property {boolean} [stop=true] If a stop reaction should be included
	 * @property {string} [prompt=message.language.get('REACTIONHANDLER_PROMPT')] The prompt to be used when awaiting user input on a page to jump to
	 * @property {number} [startPage=0] The page to start the RichMenu on
	 * @property {number} [max] The maximum total amount of reactions to collect
	 * @property {number} [maxEmojis] The maximum number of emojis to collect
	 * @property {number} [maxUsers] The maximum number of users to react
	 * @property {number} [time] The maximum amount of time before this RichMenu should expire
	 */

	/**
	 * Constructs our RichMenu instance
	 * @since 0.4.0
	 * @param {external:MessageEmbed} [embed=new MessageEmbed()] A Template embed to apply to all pages
	 */
	constructor(embed) {
		super(embed);

		/**
		 * The default emojis to use for this menu
		 * @since 0.4.0
		 * @name RichMenu#emojis
		 * @type {RichMenuEmojisObject}
		 */
		Object.assign(this.emojis, {
			zero: '0⃣',
			one: '1⃣',
			two: '2⃣',
			three: '3⃣',
			four: '4⃣',
			five: '5⃣',
			six: '6⃣',
			seven: '7⃣',
			eight: '8⃣',
			nine: '9⃣'
		});

		/**
		 * If options have been paginated yet
		 * @since 0.4.0
		 * @type {boolean}
		 */
		this.paginated = false;

		/**
		 * The options of this Menu
		 * @since 0.4.0
		 * @type {MenuOptions[]}
		 */
		this.options = [];
	}

	/**
	 * You cannot directly add pages in a RichMenu
	 * @since 0.4.0
	 * @throws 'You cannot directly add pages in a RichMenu'
	 */
	addPage() {
		throw new Error('You cannot directly add pages in a RichMenu');
	}

	/**
	 * Adds a MenuOptions
	 * @since 0.4.0
	 * @param {string} name The name of the option
	 * @param {string} body The description of the option
	 * @param {boolean} [inline=false] Whether the option should be inline
	 * @returns {this}
	 * @chainable
	 */
	addOption(name, body, inline = false) {
		this.options.push({ name, body, inline });
		return this;
	}

	/**
	 * Runs this RichMenu
	 * @since 0.4.0
	 * @param {KlasaMessage} message A message to edit or use to send a new message with
	 * @param {RichMenuRunOptions} [options={}] The options to use with this RichMenu
	 * @returns {ReactionHandler}
	 */
	async run(message, options = {}) {
		if (!this.paginated) this._paginate();
		return super.run(message, options);
	}

	/**
	 * Determines the emojis to use in this menu
	 * @since 0.4.0
	 * @param {Emoji[]} emojis An array of emojis to use
	 * @param {boolean} stop Whether the stop emoji should be included
	 * @param {boolean} jump Whether the jump emoji should be included
	 * @param {boolean} firstLast Whether the first & last emojis should be included
	 * @returns {Emoji[]}
	 * @private
	 */
	_determineEmojis(emojis, stop, jump, firstLast) {
		emojis.push(this.emojis.zero, this.emojis.one, this.emojis.two, this.emojis.three, this.emojis.four, this.emojis.five, this.emojis.six, this.emojis.seven, this.emojis.eight, this.emojis.nine);
		if (this.options.length < 10) emojis = emojis.slice(0, this.options.length);
		return super._determineEmojis(emojis, stop, jump, firstLast);
	}

	/**
	 * Converts MenuOptions into display pages
	 * @since 0.4.0
	 * @returns {void}
	 * @private
	 */
	_paginate() {
		const page = this.pages.length;
		if (this.paginated) return null;
		super.addPage(embed => {
			for (let i = 0, option = this.options[i + (page * 10)]; i + (page * 10) < this.options.length && i < 10; i++, option = this.options[i + (page * 10)]) {
				embed.addField(`(${i}) ${option.name}`, option.body, option.inline);
			}
			return embed;
		});
		if (this.options.length > (page + 1) * 10) return this._paginate();
		this.paginated = true;
		return null;
	}

}

module.exports = RichMenu;
