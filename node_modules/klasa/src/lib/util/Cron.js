const { TIME: { DAY, CRON: { allowedNum, partRegex, wildcardRegex, predefined, tokens, tokensRegex } } } = require('./constants');

/**
 * Handles Cron strings and generates dates based on the cron string provided.
 * @see https://en.wikipedia.org/wiki/Cron
 */
class Cron {

	/**
	 * @since 0.5.0
	 * @param {string} cron The cron pattern to use
	 */
	constructor(cron) {
		this.cron = cron.toLowerCase();
		this.normalized = this.constructor._normalize(this.cron);
		[this.minutes, this.hours, this.days, this.months, this.dows] = this.constructor._parseString(this.normalized);
	}

	/**
	 * Get the next date that matches with the current pattern
	 * @since 0.5.0
	 * @param {Date} [outset=new Date()] The Date instance to compare with
	 * @param {boolean} [origin=true] Whether this next call is origin
	 * @returns {Date}
	 */
	next(outset = new Date(), origin = true) {
		if (!this.days.includes(outset.getUTCDate()) || !this.months.includes(outset.getUTCMonth() + 1) || !this.dows.includes(outset.getUTCDay())) {
			return this.next(new Date(outset.getTime() + DAY), false);
		}
		if (!origin) return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), this.hours[0], this.minutes[0]));

		const now = new Date(outset.getTime() + 60000);

		for (const hour of this.hours) {
			if (hour < now.getUTCHours()) continue;
			for (const minute of this.minutes) {
				if (hour === now.getUTCHours() && minute < now.getUTCMinutes()) continue;
				return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), hour, minute));
			}
		}

		return this.next(new Date(outset.getTime() + DAY), false);
	}

	/**
	 * Normalize the pattern
	 * @since 0.5.0
	 * @param {string} cron The pattern to normalize
	 * @returns {string}
	 * @private
	 */
	static _normalize(cron) {
		if (cron in predefined) return predefined[cron];
		const now = new Date();
		cron = cron.split(' ').map((val, i) => val.replace(wildcardRegex, match => {
			if (match === 'h') return Math.floor(Math.random() * (allowedNum[i][1] + 1));
			if (match === '?') {
				switch (i) {
					case 0: return now.getUTCMinutes();
					case 1: return now.getUTCHours();
					case 2: return now.getUTCDate();
					case 3: return now.getUTCMonth();
					case 4: return now.getUTCDay();
				}
			}
			return match;
		})).join(' ');
		return cron.replace(tokensRegex, match => tokens[match]);
	}

	/**
	 * Parse the pattern
	 * @since 0.5.0
	 * @param {string} cron The pattern to parse
	 * @returns {Array<number[]>}
	 * @private
	 */
	static _parseString(cron) {
		const parts = cron.split(' ');
		if (parts.length !== 5) throw new Error('Invalid Cron Provided');
		return parts.map(Cron._parsePart);
	}

	/**
	 * Parse the current part
	 * @since 0.5.0
	 * @param {string} cronPart The part of the pattern to parse
	 * @param {number} id The id that identifies the current part
	 * @returns {number[]}
	 * @private
	 */
	static _parsePart(cronPart, id) {
		if (cronPart.includes(',')) {
			const res = [];
			for (const part of cronPart.split(',')) res.push(...Cron._parsePart(part, id));
			return [...new Set(res)].sort((a, b) => a - b);
		}

		// eslint-disable-next-line prefer-const
		let [, wild, min, max, step] = partRegex.exec(cronPart);

		if (wild) [min, max] = allowedNum[id];
		else if (!max && !step) return [parseInt(min)];
		return Cron._range(...[parseInt(min), parseInt(max) || allowedNum[id][1]].sort((a, b) => a - b), parseInt(step) || 1);
	}

	/**
	 * Get an array of numbers with the selected range
	 * @since 0.5.0
	 * @param {number} min The minimum value
	 * @param {number} max The maximum value
	 * @param {number} step The step value
	 * @returns {number[]}
	 * @private
	 */
	static _range(min, max, step) {
		return new Array(Math.floor((max - min) / step) + 1).fill(0).map((val, i) => min + (i * step));
	}

}

module.exports = Cron;
