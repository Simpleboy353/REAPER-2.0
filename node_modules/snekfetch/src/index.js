'use strict';

const transport = require(typeof window !== 'undefined' ? './browser' : './node');

/**
 * Snekfetch
 * @extends Stream.Readable
 * @extends Promise
 */
class Snekfetch extends transport.Parent {
  /**
   * Options to pass to the Snekfetch constructor
   * @typedef {object} SnekfetchOptions
   * @memberof Snekfetch
   * @property {object} [headers] Headers to initialize the request with
   * @property {object|string|Buffer} [data] Data to initialize the request with
   * @property {string|Object} [query] Query to intialize the request with
   * @property {boolean} [redirect='follow'] If the request should follow redirects
   * @property {object} [qs=querystring] Querystring module to use, any object providing
   * `stringify` and `parse` for querystrings
   * @property {external:Agent|boolean} [agent] Whether to use an http agent
   */

  /**
   * Create a request.
   * Usually you'll want to do `Snekfetch#method(url [, options])` instead of
   * `new Snekfetch(method, url [, options])`
   * @param {string} method HTTP method
   * @param {string} url URL
   * @param {SnekfetchOptions} [opts] Options
   */
  constructor(method, url, opts = {}) {
    super();
    this.options = Object.assign({
      qs: transport.querystring,
      method,
      url,
      redirect: 'follow',
    }, opts, {
      headers: {},
      query: undefined,
      data: undefined,
    });
    if (opts.headers) {
      this.set(opts.headers);
    }
    if (opts.query) {
      this.query(opts.query);
    }
    if (opts.data) {
      this.send(opts.data);
    }
  }

  /**
   * Add a query param to the request
   * @param {string|Object} name Name of query param or object to add to query
   * @param {string} [value] If name is a string value, this will be the value of the query param
   * @returns {Snekfetch} This request
   */
  query(name, value) {
    if (this.options.query === undefined) {
      this.options.query = {};
    }
    if (typeof name === 'object') {
      Object.assign(this.options.query, name);
    } else {
      this.options.query[name] = value;
    }

    return this;
  }

  /**
   * Add a header to the request
   * @param {string|Object} name Name of query param or object to add to headers
   * @param {string} [value] If name is a string value, this will be the value of the header
   * @returns {Snekfetch} This request
   */
  set(name, value) {
    if (typeof name === 'object') {
      for (const [k, v] of Object.entries(name)) {
        this.options.headers[k.toLowerCase()] = v;
      }
    } else {
      this.options.headers[name.toLowerCase()] = value;
    }

    return this;
  }

  /**
   * Attach a form data object
   * @param {string} name Name of the form attachment
   * @param {string|Object|Buffer} data Data for the attachment
   * @param {string} [filename] Optional filename if form attachment name needs to be overridden
   * @returns {Snekfetch} This request
   */
  attach(...args) {
    const form = this.options.data instanceof transport.FormData ?
      this.options.data : this.options.data = new transport.FormData();
    if (typeof args[0] === 'object') {
      for (const [k, v] of Object.entries(args[0])) {
        this.attach(k, v);
      }
    } else {
      form.append(...args);
    }

    return this;
  }

  /**
   * Send data with the request
   * @param {string|Buffer|Object} data Data to send
   * @returns {Snekfetch} This request
   */
  send(data) {
    if (data instanceof transport.FormData || transport.shouldSendRaw(data)) {
      this.options.data = data;
    } else if (data !== null && typeof data === 'object') {
      const header = this.options.headers['content-type'];
      let serialize;
      if (header) {
        if (header.includes('application/json')) {
          serialize = JSON.stringify;
        } else if (header.includes('urlencoded')) {
          serialize = this.options.qs.stringify;
        }
      } else {
        this.set('Content-Type', 'application/json');
        serialize = JSON.stringify;
      }
      this.options.data = serialize(data);
    } else {
      this.options.data = data;
    }
    return this;
  }

  then(resolver, rejector) {
    if (this._response) {
      return this._response.then(resolver, rejector);
    }
    this._finalizeRequest();
    // eslint-disable-next-line no-return-assign
    return this._response = transport.request(this)
      .then(({ raw, headers, statusCode, statusText }) => {
        // forgive me :(
        const self = this; // eslint-disable-line consistent-this
        /**
         * Response from Snekfetch
         * @typedef {Object} SnekfetchResponse
         * @memberof Snekfetch
         * @prop {HTTP.Request} request
         * @prop {?string|object|Buffer} body Processed response body
         * @prop {Buffer} raw Raw response body
         * @prop {boolean} ok If the response code is >= 200 and < 300
         * @prop {number} statusCode HTTP status code
         * @prop {string} statusText Human readable HTTP status
         */
        const res = {
          request: this.request,
          get body() {
            delete res.body;
            const type = res.headers['content-type'];
            if (raw instanceof ArrayBuffer) {
              raw = new window.TextDecoder('utf8').decode(raw); // eslint-disable-line no-undef
            }
            if (/application\/json/.test(type)) {
              try {
                res.body = JSON.parse(raw);
              } catch (err) {
                res.body = String(raw);
              }
            } else if (/application\/x-www-form-urlencoded/.test(type)) {
              res.body = self.options.qs.parse(String(raw));
            } else {
              res.body = raw;
            }
            return res.body;
          },
          raw,
          ok: statusCode >= 200 && statusCode < 400,
          headers,
          statusCode,
          statusText,
        };

        if (res.ok) {
          return res;
        }
        const err = new Error(`${statusCode} ${statusText}`.trim());
        Object.assign(err, res);
        return Promise.reject(err);
      })
      .then(resolver, rejector);
  }

  catch(rejector) {
    return this.then(null, rejector);
  }

  /**
   * End the request
   * @param {Function} [cb] Optional callback to handle the response
   * @returns {Promise} This request
   */
  end(cb) {
    return this.then(
      (res) => (cb ? cb(null, res) : res),
      (err) => (cb ? cb(err, err.statusCode ? err : null) : Promise.reject(err)),
    );
  }

  _finalizeRequest() {
    if (this.options.method !== 'HEAD') {
      this.set('Accept-Encoding', 'gzip, deflate');
    }
    if (this.options.data && this.options.data.getBoundary) {
      this.set('Content-Type', `multipart/form-data; boundary=${this.options.data.getBoundary()}`);
    }

    if (this.options.query) {
      const [url, query] = this.options.url.split('?');
      this.options.url = `${url}?${this.options.qs.stringify(this.options.query)}${query ? `&${query}` : ''}`;
    }
  }

  _read() {
    this.resume();
    if (this._response) {
      return;
    }
    this.catch((err) => this.emit('error', err));
  }
}

/**
 * Create a ((THIS)) request
 * @dynamic this.METHODS
 * @method Snekfetch.((THIS)lowerCase)
 * @param {string} url The url to request
 * @param {Snekfetch.snekfetchOptions} [opts] Options
 * @returns {Snekfetch}
 */
Snekfetch.METHODS = transport.METHODS.filter((m) => m !== 'M-SEARCH');
for (const method of Snekfetch.METHODS) {
  Snekfetch[method.toLowerCase()] = function runMethod(url, opts) {
    const Constructor = this && this.prototype instanceof Snekfetch ? this : Snekfetch;
    return new Constructor(method, url, opts);
  };
}

module.exports = Snekfetch;

/**
 * @external Agent
 * @see {@link https://nodejs.org/api/http.html#http_class_http_agent}
 */
