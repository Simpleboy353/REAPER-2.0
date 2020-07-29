/**
 * Handles generic RateLimits such as for {@link Command#cooldown}s
 */
class RateLimit {

	/**
	 * @since 0.5.0
	 * @param {number} bucket The number of requests before this is limited
	 * @param {number} cooldown The amount of milliseconds for the ratelimit to expire
	 */
	constructor(bucket, cooldown) {
		/**
		 * The number of requests before this is limited
		 * @since 0.5.0
		 * @type {number}
		 */
		this.bucket = bucket;

		/**
		 * The amount of milliseconds for the ratelimit to expire
		 * @since 0.5.0
		 * @type {number}
		 */
		this.cooldown = cooldown;

		this.reset();
	}

	/**
	 * Whether this RateLimit is expired or not, allowing the bucket to be reset
	 * @since 0.5.0
	 * @type {boolean}
	 * @readonly
	 */
	get expired() {
		return this.remainingTime === 0;
	}

	/**
	 * Whether this RateLimit is limited or not
	 * @since 0.5.0
	 * @type {boolean}
	 * @readonly
	 */
	get limited() {
		return !(this.remaining > 0 || this.expired);
	}

	/**
	 * The remaining time in milliseconds before this RateLimit instance is reset
	 * @since 0.5.0
	 * @type {number}
	 * @readonly
	 */
	get remainingTime() {
		return Math.max(this.time - Date.now(), 0);
	}

	/**
	 * Drips the RateLimit bucket
	 * @since 0.5.0
	 * @returns {this}
	 */
	drip() {
		if (this.limited) throw new Error('Ratelimited');
		if (this.expired) this.reset();

		this.remaining--;
		return this;
	}

	/**
	 * Resets the RateLimit back to it's full state
	 * @since 0.5.0
	 * @returns {this}
	 */
	reset() {
		return this.resetRemaining().resetTime();
	}

	/**
	 * Resets the RateLimit's remaining uses back to full state
	 * @since 0.5.0
	 * @returns {this}
	 */
	resetRemaining() {
		/**
		 * The remaining times this RateLimit can be dripped before the RateLimit bucket is empty
		 * @since 0.5.0
		 * @type {number}
		 * @private
		 */
		this.remaining = this.bucket;

		return this;
	}

	/**
	 * Resets the RateLimit's reset time back to full state
	 * @since 0.5.0
	 * @returns {this}
	 */
	resetTime() {
		/**
		 * When this RateLimit is reset back to a full state
		 * @since 0.5.0
		 * @type {number}
		 * @private
		 */
		this.time = Date.now() + this.cooldown;

		return this;
	}

}

module.exports = RateLimit;
