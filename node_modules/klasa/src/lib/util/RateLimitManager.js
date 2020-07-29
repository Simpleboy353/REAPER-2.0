const { Collection } = require('discord.js');
const RateLimit = require('./RateLimit');

/**
 * Manages {@link RateLimit}s
 * @extends {external:Collection}
 */
class RateLimitManager extends Collection {

	/**
	 * @since 0.5.0
	 * @param {number} bucket The amount of times a RateLimit can drip before it's limited
	 * @param {number} cooldown The amount of milliseconds for the ratelimits from this manager to expire
	 */
	constructor(bucket, cooldown) {
		super();

		/**
		 * The sweep interval for this RateLimitManager
		 * @since 0.5.0
		 * @name RateLimitManager#sweepInterval
		 * @type {?NodeJS.Timer}
		 * @private
		 */
		Object.defineProperty(this, 'sweepInterval', { value: null, writable: true });
		Object.defineProperty(this, '_bucket', { value: bucket, writable: true });
		Object.defineProperty(this, '_cooldown', { value: cooldown, writable: true });
	}

	/**
	 * The amount of times a RateLimit from this manager can drip before it's limited
	 * @since 0.5.0
	 * @type {number}
	 */
	get bucket() {
		return this._bucket;
	}

	set bucket(value) {
		for (const ratelimit of this.values()) ratelimit.bucket = value;
		this._bucket = value;
		return value;
	}

	/**
	 * The amount of milliseconds for the ratelimits from this manager to expire
	 * @since 0.5.0
	 * @type {number}
	 */
	get cooldown() {
		return this._cooldown;
	}

	set cooldown(value) {
		for (const ratelimit of this.values()) ratelimit.cooldown = value;
		this._cooldown = value;
		return value;
	}

	/**
	 * Gets a {@link RateLimit} from this manager or creates it if it does not exist
	 * @since 0.5.0
	 * @param {string} id The id for the RateLimit
	 * @returns {RateLimit}
	 */
	acquire(id) {
		return this.get(id) || this.create(id);
	}

	/**
	 * Creates a {@link RateLimit} for this manager
	 * @since 0.5.0
	 * @param {string} id The id the RateLimit belongs to
	 * @returns {RateLimit}
	 */
	create(id) {
		const rateLimit = new RateLimit(this._bucket, this._cooldown);
		this.set(id, rateLimit);
		return rateLimit;
	}

	/**
	 * Wraps {@link external:Collection}'s set method to set interval to sweep inactive RateLimits
	 * @since 0.5.0
	 * @param {string} id The id the RateLimit belongs to
	 * @param {RateLimit} rateLimit The this for the sweep
	 * @returns {this}
	 * @private
	 */
	set(id, rateLimit) {
		if (!(rateLimit instanceof RateLimit)) throw new TypeError('Invalid RateLimit');
		if (!this.sweepInterval) this.sweepInterval = setInterval(this.sweep.bind(this), 30000);
		return super.set(id, rateLimit);
	}

	/**
	 * Wraps {@link external:Collection}'s sweep method to clear the interval when this manager is empty
	 * @since 0.5.0
	 * @param {Function} fn The filter function
	 * @param {any} thisArg The this for the sweep
	 * @returns {number}
	 * @private
	 */
	sweep(fn = rl => rl.expired, thisArg) {
		const amount = super.sweep(fn, thisArg);

		if (this.size === 0) {
			clearInterval(this.sweepInterval);
			this.sweepInterval = null;
		}

		return amount;
	}

	static get [Symbol.species]() {
		return Collection;
	}

}

module.exports = RateLimitManager;
