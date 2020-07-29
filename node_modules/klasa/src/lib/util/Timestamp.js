const { TIME: { SECOND, MINUTE, DAY, DAYS, MONTHS, TIMESTAMP: { TOKENS } } } = require('./constants');

/* eslint-disable max-len */
const tokens = new Map([
	// Dates
	['Y', time => String(time.getFullYear()).slice(2)],
	['YY', time => String(time.getFullYear()).slice(2)],
	['YYY', time => String(time.getFullYear())],
	['YYYY', time => String(time.getFullYear())],
	['Q', time => String((time.getMonth() + 1) / 3)],
	['M', time => String(time.getMonth() + 1)],
	['MM', time => String(time.getMonth() + 1).padStart(2, '0')],
	['MMM', time => MONTHS[time.getMonth()]],
	['MMMM', time => MONTHS[time.getMonth()]],
	['D', time => String(time.getDate())],
	['DD', time => String(time.getDate()).padStart(2, '0')],
	['DDD', time => {
		const start = new Date(time.getFullYear(), 0, 0);
		const diff = ((time.getMilliseconds() - start.getMilliseconds()) + (start.getTimezoneOffset() - time.getTimezoneOffset())) * MINUTE;
		return String(Math.floor(diff / DAY));
	}],
	['DDDD', time => {
		const start = new Date(time.getFullYear(), 0, 0);
		const diff = ((time.getMilliseconds() - start.getMilliseconds()) + (start.getTimezoneOffset() - time.getTimezoneOffset())) * MINUTE;
		return String(Math.floor(diff / DAY));
	}],
	['d', time => {
		const day = String(time.getDate());
		if (day !== '11' && day.endsWith('1')) return `${day}st`;
		if (day !== '12' && day.endsWith('2')) return `${day}nd`;
		if (day !== '13' && day.endsWith('3')) return `${day}rd`;
		return `${day}th`;
	}],
	['dd', time => DAYS[time.getDay()].slice(0, 2)],
	['ddd', time => DAYS[time.getDay()].slice(0, 3)],
	['dddd', time => DAYS[time.getDay()]],
	['X', time => String(time.valueOf() / SECOND)],
	['x', time => String(time.valueOf())],

	// Locales
	['H', time => String(time.getHours())],
	['HH', time => String(time.getHours()).padStart(2, '0')],
	['h', time => String(time.getHours() % 12 || 12)],
	['hh', time => String(time.getHours() % 12 || 12).padStart(2, '0')],
	['a', time => time.getHours() < 12 ? 'am' : 'pm'],
	['A', time => time.getHours() < 12 ? 'AM' : 'PM'],
	['m', time => String(time.getMinutes())],
	['mm', time => String(time.getMinutes()).padStart(2, '0')],
	['s', time => String(time.getSeconds())],
	['ss', time => String(time.getSeconds()).padStart(2, '0')],
	['S', time => String(time.getMilliseconds())],
	['SS', time => String(time.getMilliseconds()).padStart(2, '0')],
	['SSS', time => String(time.getMilliseconds()).padStart(3, '0')],
	['T', time => `${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`],
	['t', time => `${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')} ${time.getHours() < 12 ? 'am' : 'pm'}`],
	['L', time => `${String(time.getMonth() + 1).padStart(2, '0')}/${String(time.getDate()).padStart(2, '0')}/${String(time.getFullYear())}`],
	['l', time => `${String(time.getMonth() + 1)}/${String(time.getDate()).padStart(2, '0')}/${String(time.getFullYear())}`],
	['LL', time => `${MONTHS[time.getMonth()]} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())}`],
	['ll', time => `${MONTHS[time.getMonth()].slice(0, 3)} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())}`],
	['LLL', time => `${MONTHS[time.getMonth()]} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`],
	['lll', time => `${MONTHS[time.getMonth()].slice(0, 3)} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`],
	['LLLL', time => `${DAYS[time.getDay()]}, ${MONTHS[time.getMonth()]} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`],
	['llll', time => `${DAYS[time.getDay()].slice(0, 3)} ${MONTHS[time.getMonth()].slice(0, 3)} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`],
	['Z', time => {
		const offset = time.getTimezoneOffset();
		return `${offset >= 0 ? '+' : '-'}${String(offset / -60).padStart(2, '0')}:${String(offset % 60).padStart(2, '0')}`;
	}],
	['ZZ', time => {
		const offset = time.getTimezoneOffset();
		return `${offset >= 0 ? '+' : '-'}${String(offset / -60).padStart(2, '0')}:${String(offset % 60).padStart(2, '0')}`;
	}]
]);
/* eslint-enable max-len */

/**
 * Klasa's Timestamp class, parses the pattern once, displays the desired Date or UNIX timestamp with the selected pattern.
 */
class Timestamp {

	/**
	 * @typedef {Object} TimestampObject
	 * @property {string} type The type of the current variable
	 * @property {string} [content] The content of the type. Only accessible if the type is 'literal'
	 */

	/**
	 * Starts a new Timestamp and parses the pattern.
	 * @since 0.5.0
	 * @param {string} pattern The pattern to parse
	 */
	constructor(pattern) {
		/**
		 * The raw pattern
		 * @since 0.5.0
		 * @type {string}
		 */
		this.pattern = pattern;

		/**
		 * @since 0.5.0
		 * @type {TimestampObject[]}
		 * @private
		 */
		this._template = Timestamp._patch(pattern);
	}

	/**
	 * Display the current date with the current pattern.
	 * @since 0.5.0
	 * @param {(Date|number|string)} [time=new Date()] The time to display
	 * @returns {string}
	 */
	display(time = new Date()) {
		return Timestamp._display(this._template, time);
	}

	/**
	 * Display the current date utc with the current pattern.
	 * @since 0.5.0
	 * @param {(Date|number|string)} [time=new Date()] The time to display in utc
	 * @returns {string}
	 */
	displayUTC(time) {
		return Timestamp._display(this._template, Timestamp.utc(time));
	}

	/**
	 * Edits the current pattern.
	 * @since 0.5.0
	 * @param {string} pattern The new pattern for this instance
	 * @returns {this}
	 * @chainable
	 */
	edit(pattern) {
		this.pattern = pattern;
		this._template = Timestamp._patch(pattern);
		return this;
	}

	/**
	 * Defines the toString behavior of Timestamp.
	 * @returns {string}
	 */
	toString() {
		return this.display();
	}

	/**
	 * Display the current date with the current pattern.
	 * @since 0.5.0
	 * @param {string} pattern The pattern to parse
	 * @param {(Date|number|string)} [time=new Date()] The time to display
	 * @returns {string}
	 */
	static displayArbitrary(pattern, time = new Date()) {
		return Timestamp._display(Timestamp._patch(pattern), time);
	}

	/**
	 * Creates a UTC Date object to work with.
	 * @since 0.5.0
	 * @param {(Date|number|string)} [time=new Date()] The date to convert to utc
	 * @returns {Date}
	 */
	static utc(time = new Date()) {
		time = Timestamp._resolveDate(time);
		return new Date(time.valueOf() + Timestamp.timezoneOffset);
	}

	/**
	 * Display the current date with the current pattern.
	 * @since 0.5.0
	 * @param {string} template The pattern to parse
	 * @param {(Date|number|string)} time The time to display
	 * @returns {string}
	 * @private
	 */
	static _display(template, time) {
		let output = '';
		const parsedTime = Timestamp._resolveDate(time);
		for (const { content, type } of template) output += content || tokens.get(type)(parsedTime);
		return output;
	}

	/**
	 * Parses the pattern.
	 * @since 0.5.0
	 * @param {string} pattern The pattern to parse
	 * @returns {TimestampObject[]}
	 * @private
	 */
	static _patch(pattern) {
		const template = [];
		for (let i = 0; i < pattern.length; i++) {
			let current = '';
			const currentChar = pattern[i];
			const tokenMax = TOKENS.get(currentChar);
			if (typeof tokenMax === 'number') {
				current += currentChar;
				while (pattern[i + 1] === currentChar && current.length < tokenMax) current += pattern[++i];
				template.push({ type: current, content: null });
			} else if (currentChar === '[') {
				while (i + 1 < pattern.length && pattern[i + 1] !== ']') current += pattern[++i];
				i++;
				template.push({ type: 'literal', content: current });
			} else {
				current += currentChar;
				while (i + 1 < pattern.length && !TOKENS.has(pattern[i + 1]) && pattern[i + 1] !== '[') current += pattern[++i];
				template.push({ type: 'literal', content: current });
			}
		}

		return template;
	}

	/**
	 * Resolves a date.
	 * @since 0.5.0
	 * @param {(Date|number|string)} time The time to parse
	 * @returns {Date}
	 * @private
	 */
	static _resolveDate(time) {
		return time instanceof Date ? time : new Date(time);
	}

}

/**
 * The timezone offset in seconds.
 * @since 0.5.0
 * @type {number}
 * @static
 */
Timestamp.timezoneOffset = new Date().getTimezoneOffset() * 60000;

module.exports = Timestamp;
