const { performance } = require('perf_hooks');

/**
 * Klasa's Stopwatch class, uses native node to replicate/extend previous performance now dependency.
 */
class Stopwatch {

	/**
	 * Starts a new Stopwatch
	 * @since 0.4.0
	 * @param {number} [digits=2] The number of digits to appear after the decimal point when returning the friendly duration
	 */
	constructor(digits = 2) {
		/**
		 * The number of digits to appear after the decimal point when returning the friendly duration.
		 * @since 0.4.0
		 * @type {number}
		 */
		this.digits = digits;

		/**
		 * The start time of this stopwatch
		 * @since 0.4.0
		 * @type {number}
		 * @private
		 */
		this._start = performance.now();

		/**
		 * The end time of this stopwatch
		 * @since 0.4.0
		 * @type {?number}
		 * @private
		 */
		this._end = null;
	}

	/**
	 * The duration of this stopwatch since start or start to end if this stopwatch has stopped.
	 * @since 0.4.0
	 * @type {number}
	 * @readonly
	 */
	get duration() {
		return this._end ? this._end - this._start : performance.now() - this._start;
	}

	/**
	 * If the stopwatch is running or not
	 * @since 0.4.0
	 * @type {boolean}
	 * @readonly
	 */
	get running() {
		return Boolean(!this._end);
	}

	/**
	 * Restarts the Stopwatch (Returns a running state)
	 * @since 0.4.0
	 * @returns {this}
	 * @chainable
	 */
	restart() {
		this._start = performance.now();
		this._end = null;
		return this;
	}

	/**
	 * Resets the Stopwatch to 0 duration (Returns a stopped state)
	 * @since 0.4.0
	 * @returns {this}
	 * @chainable
	 */
	reset() {
		this._start = performance.now();
		this._end = this._start;
		return this;
	}

	/**
	 * Starts the Stopwatch
	 * @since 0.4.0
	 * @returns {this}
	 * @chainable
	 */
	start() {
		if (!this.running) {
			this._start = performance.now() - this.duration;
			this._end = null;
		}
		return this;
	}

	/**
	 * Stops the Stopwatch, freezing the duration
	 * @since 0.4.0
	 * @returns {this}
	 * @chainable
	 */
	stop() {
		if (this.running) this._end = performance.now();
		return this;
	}

	/**
	 * Defines toString behavior
	 * @since 0.4.0
	 * @returns {string}
	 */
	toString() {
		const time = this.duration;
		if (time >= 1000) return `${(time / 1000).toFixed(this.digits)}s`;
		if (time >= 1) return `${time.toFixed(this.digits)}ms`;
		return `${(time * 1000).toFixed(this.digits)}μs`;
	}

}

module.exports = Stopwatch;
