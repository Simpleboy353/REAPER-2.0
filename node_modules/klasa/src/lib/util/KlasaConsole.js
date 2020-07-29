const { Console } = require('console');
const { inspect } = require('util');
const Colors = require('./Colors');
const Timestamp = require('./Timestamp');
const constants = require('./constants');
const { mergeDefault } = require('./util');

/**
 * Klasa's console class, extends NodeJS Console class.
 */
class KlasaConsole extends Console {

	/**
	 * @typedef {Object} ConsoleOptions
	 * @property {ConsoleColorStyles} [colors] The console color styles
	 * @property {NodeJS.WritableStream} [stdout] The WritableStream for the output logs
	 * @property {NodeJS.WritableStream} [stderr] The WritableStream for the error logs
	 * @property {(boolean|string)} [timestamps] If false, it won't use timestamps. Otherwise it will use 'YYYY-MM-DD HH:mm:ss' if true or custom if string is given
	 * @property {boolean} [useColor] Whether the timestamps should use colours
	 * @property {boolean} [utc] If the timestamps should be in utc
	 */

	/**
	 * @typedef {Object} ConsoleColorStyles Time is for the timestamp of the log, message is for the actual output.
	 * @property {ConsoleColorObjects} debug An object containing a message and time color object
	 * @property {ConsoleColorObjects} error An object containing a message and time color object
	 * @property {ConsoleColorObjects} log An object containing a message and time color object
	 * @property {ConsoleColorObjects} verbose An object containing a message and time color object
	 * @property {ConsoleColorObjects} warn An object containing a message and time color object
	 * @property {ConsoleColorObjects} wtf An object containing a message and time Color Object
	 */

	/**
	 * @typedef {Object} ConsoleColorObjects
	 * @property {string} [type='log'] The method from Console this color object should call
	 * @property {ConsoleMessageObject} message A message object containing colors and styles
	 * @property {ConsoleTimeObject} time A time object containing colors and styles
	 */

	/**
	 * @typedef {Object} ConsoleMessageObject
	 * @property {ConsoleColorTypes} background The background color. Can be a basic string like "red", a hex string, or a RGB array
	 * @property {ConsoleColorTypes} text The text color. Can be a basic string like "red", a hex string, or a RGB array
	 * @property {ConsoleStyleTypes} style A style string from ConsoleStyleTypes
	 */

	/**
	 * @typedef {Object} ConsoleTimeObject
	 * @property {ConsoleColorTypes} background The background color. Can be a basic string like "red", a hex string, or a RGB array
	 * @property {ConsoleColorTypes} text The text color. Can be a basic string like "red", a hex string, a RGB array, or HSL array
	 * @property {ConsoleStyleTypes} style A style string from ConsoleStyleTypes
	 */

	/**
	 * @typedef {Object} ConsoleColorTypes - All the valid color types.
	 * @property {string} black The black colour
	 * @property {string} red The red colour
	 * @property {string} green The green colour
	 * @property {string} yellow The yellow colour
	 * @property {string} blue The blue colour
	 * @property {string} magenta The magenta colour
	 * @property {string} cyan The cyan colour
	 * @property {string} gray The gray colour
	 * @property {string} grey The grey colour (alias for gray)
	 * @property {string} lightgray The light gray colour
	 * @property {string} lightgrey The light grey colour (alias for light gray)
	 * @property {string} lightred The light red colour
	 * @property {string} lightgreen The light green colour
	 * @property {string} lightyellow The light yellow colour
	 * @property {string} lightblue The light blue colour
	 * @property {string} lightmagenta The light magenta colour
	 * @property {string} lightcyan The light cyan colour
	 * @property {string} white The white colour
	 */

	/**
	 * @typedef {Object} ConsoleStyleTypes
	 * @property {string} normal Default style
	 * @property {string} bold Bold style. May appear with a lighter colour in many terminals
	 * @property {string} dim Dim style
	 * @property {string} italic Italic style
	 * @property {string} underline Underline style
	 * @property {string} inverse Inverse colours style
	 * @property {string} hidden Hidden text style
	 * @property {string} strikethrough Strikethrough text style
	 */

	/**
	 * Constructs our KlasaConsole instance
	 * @since 0.4.0
	 * @param {ConsoleOptions} [options] The options for the klasa console
	 */
	constructor(options = {}) {
		options = mergeDefault(constants.DEFAULTS.CONSOLE, options);

		super(options.stdout, options.stderr);

		/**
		 * The standard output stream for this console, defaulted to process.stderr.
		 * @since 0.4.0
		 * @name KlasaConsole#stdout
		 * @type {NodeJS.WritableStream}
		 * @readonly
		 */
		Object.defineProperty(this, 'stdout', { value: options.stdout });

		/**
		 * The standard error output stream for this console, defaulted to process.stderr.
		 * @since 0.4.0
		 * @name KlasaConsole#stderr
		 * @type {NodeJS.WritableStream}
		 * @readonly
		 */
		Object.defineProperty(this, 'stderr', { value: options.stderr });

		Colors.useColors = typeof options.useColor === 'undefined' ? this.stdout.isTTY || false : options.useColor;

		/**
		 * Whether or not timestamps should be enabled for this console.
		 * @since 0.5.0
		 * @type {?Timestamp}
		 */
		this.template = options.timestamps !== false ? new Timestamp(options.timestamps === true ? 'YYYY-MM-DD HH:mm:ss' : options.timestamps) : null;

		/**
		 * The colors for this console.
		 * @since 0.4.0
		 * @type {object}
		 */
		this.colors = {};

		for (const [name, formats] of Object.entries(options.colors)) {
			this.colors[name] = {};
			for (const [type, format] of Object.entries(formats)) this.colors[name][type] = new Colors(format);
		}

		/**
		 * Whether the timestamp should be in utc or not
		 * @since 0.5.0
		 * @type {boolean}
		 */
		this.utc = options.utc;
	}

	/**
	 * The timestamp to use
	 * @type {string}
	 * @private
	 */
	get timestamp() {
		return this.utc ? this.template.displayUTC() : this.template.display();
	}

	/**
	 * Logs everything to the console/writable stream.
	 * @since 0.4.0
	 * @param {Array<*>} data The data we want to print
	 * @param {string} [type="log"] The type of log, particularly useful for coloring
	 * @private
	 */
	write(data, type = 'log') {
		type = type.toLowerCase();
		data = data.map(this.constructor._flatten).join('\n');
		const { time, message } = this.colors[type];
		const timestamp = this.template ? time.format(`[${this.timestamp}]`) : '';
		super[constants.DEFAULTS.CONSOLE.types[type] || 'log'](data.split('\n').map(str => `${timestamp} ${message.format(str)}`).join('\n'));
	}

	/**
	 * Calls a log write with everything to the console/writable stream.
	 * @since 0.4.0
	 * @param {...*} data The data we want to print
	 * @returns {void}
	 */
	log(...data) {
		this.write(data, 'log');
	}

	/**
	 * Calls a warn write with everything to the console/writable stream.
	 * @since 0.4.0
	 * @param {...*} data The data we want to print
	 * @returns {void}
	 */
	warn(...data) {
		this.write(data, 'warn');
	}

	/**
	 * Calls an error write with everything to the console/writable stream.
	 * @since 0.4.0
	 * @param {...*} data The data we want to print
	 * @returns {void}
	 */
	error(...data) {
		this.write(data, 'error');
	}

	/**
	 * Calls a debug write with everything to the console/writable stream.
	 * @since 0.4.0
	 * @param {...*} data The data we want to print
	 * @returns {void}
	 */
	debug(...data) {
		this.write(data, 'debug');
	}

	/**
	 * Calls a verbose write with everything to the console/writable stream.
	 * @since 0.4.0
	 * @param {...*} data The data we want to print
	 * @returns {void}
	 */
	verbose(...data) {
		this.write(data, 'verbose');
	}

	/**
	 * Calls a wtf (what a terrible failure) write with everything to the console/writable stream.
	 * @since 0.4.0
	 * @param {...*} data The data we want to print
	 * @returns {void}
	 */
	wtf(...data) {
		this.write(data, 'wtf');
	}

	/**
	 * Flattens our data into a readable string.
	 * @since 0.4.0
	 * @param {*} data Some data to flatten
	 * @returns {string}
	 * @private
	 */
	static _flatten(data) {
		if (typeof data === 'undefined' || typeof data === 'number' || data === null) return String(data);
		if (typeof data === 'string') return data;
		if (typeof data === 'object') {
			const isArray = Array.isArray(data);
			if (isArray && data.every(datum => typeof datum === 'string')) return data.join('\n');
			return data.stack || data.message || inspect(data, { depth: Number(isArray), colors: Colors.useColors });
		}
		return String(data);
	}

}

module.exports = KlasaConsole;
