"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = require("url");
const stream_1 = require("stream");
const httpLibs = { 'http:': http_1.default, 'https:': https_1.default };
const redirectCodes = { 301: true, 302: true, 303: true, 307: true };
const retryCodes = { 429: true, 503: true };
const defaults = {
    maxRedirects: 2,
    maxRetries: 2,
    maxReconnects: 0,
    backoff: { inc: 100, max: 10000 },
};
function Miniget(url, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    else if (!options) {
        options = {};
    }
    const opts = Object.assign({}, defaults, options);
    const stream = new stream_1.PassThrough({ highWaterMark: opts.highWaterMark });
    let myreq, mydecoded;
    let aborted = false;
    let redirects = 0;
    let retries = 0;
    let retryTimeout;
    let reconnects = 0;
    let contentLength;
    let acceptRanges = false;
    let rangeStart = 0, rangeEnd;
    let downloaded = 0;
    // Check if this is a ranged request.
    if (opts.headers && opts.headers.Range) {
        let r = /bytes=(\d+)-(\d+)?/.exec(opts.headers.Range + '');
        if (r) {
            rangeStart = parseInt(r[1], 10);
            rangeEnd = parseInt(r[2], 10);
        }
    }
    // Add `Accept-Encoding` header.
    if (opts.acceptEncoding) {
        opts.headers = Object.assign({
            'Accept-Encoding': Object.keys(opts.acceptEncoding).join(', ')
        }, opts.headers);
    }
    const doRetry = (retryOptions = {}) => {
        if (aborted) {
            return false;
        }
        // If there is an error when the download has already started,
        // but not finished, try reconnecting.
        if (mydecoded && 0 < downloaded) {
            if (acceptRanges && downloaded < contentLength &&
                reconnects++ < opts.maxReconnects) {
                mydecoded = null;
                retries = 0;
                let inc = opts.backoff.inc;
                let ms = Math.min(inc, opts.backoff.max);
                retryTimeout = setTimeout(doDownload, ms);
                stream.emit('reconnect', reconnects, retryOptions.err);
                return true;
            }
        }
        else if ((!retryOptions.statusCode ||
            retryOptions.err && retryOptions.err.message === 'ENOTFOUND') &&
            retries++ < opts.maxRetries) {
            let ms = retryOptions.retryAfter ||
                Math.min(retries * opts.backoff.inc, opts.backoff.max);
            retryTimeout = setTimeout(doDownload, ms);
            stream.emit('retry', retries, retryOptions.err);
            return true;
        }
        return false;
    };
    const onRequestError = (err, statusCode) => {
        if (!doRetry({ err, statusCode })) {
            stream.emit('error', err);
        }
    };
    const doDownload = () => {
        if (aborted) {
            return;
        }
        let parsed, httpLib;
        try {
            parsed = url_1.parse(url);
            httpLib = httpLibs[parsed.protocol];
        }
        catch (err) {
            // Let the error be caught by the if statement below.
        }
        if (!httpLib) {
            stream.emit('error', Error('Invalid URL: ' + url));
            return;
        }
        Object.assign(parsed, opts);
        if (acceptRanges && downloaded > 0) {
            let start = downloaded + rangeStart;
            let end = rangeEnd || '';
            parsed.headers = Object.assign({}, parsed.headers, {
                Range: `bytes=${start}-${end}`
            });
        }
        if (opts.transform) {
            try {
                parsed = opts.transform(parsed);
            }
            catch (err) {
                stream.emit('error', err);
                return;
            }
            if (!parsed || parsed.protocol) {
                httpLib = httpLibs[parsed === null || parsed === void 0 ? void 0 : parsed.protocol];
                if (!httpLib) {
                    stream.emit('error', Error('Invalid URL object from `transform` function'));
                    return;
                }
            }
        }
        myreq = httpLib.get(parsed, (res) => {
            if (res.statusCode in redirectCodes) {
                if (redirects++ >= opts.maxRedirects) {
                    stream.emit('error', Error('Too many redirects'));
                }
                else {
                    url = res.headers.location;
                    setTimeout(doDownload, res.headers['retry-after'] ? parseInt(res.headers['retry-after'], 10) * 1000 : 0);
                    stream.emit('redirect', url);
                }
                return;
                // Check for rate limiting.
            }
            else if (res.statusCode in retryCodes) {
                if (!doRetry({ retryAfter: parseInt(res.headers['retry-after'], 10) })) {
                    let err = Error('Status code: ' + res.statusCode);
                    stream.emit('error', err);
                }
                return;
            }
            else if (res.statusCode < 200 || 400 <= res.statusCode) {
                let err = Error('Status code: ' + res.statusCode);
                if (res.statusCode >= 500) {
                    onRequestError(err, res.statusCode);
                }
                else {
                    stream.emit('error', err);
                }
                return;
            }
            let decoded = res;
            const cleanup = () => {
                res.removeListener('data', ondata);
                decoded.removeListener('end', onend);
                decoded.removeListener('error', onerror);
                res.removeListener('error', onerror);
            };
            const ondata = (chunk) => { downloaded += chunk.length; };
            const onend = () => {
                cleanup();
                if (!doRetry()) {
                    stream.end();
                }
            };
            const onerror = (err) => {
                cleanup();
                onRequestError(err);
            };
            if (opts.acceptEncoding && res.headers['content-encoding']) {
                for (let enc of res.headers['content-encoding'].split(', ').reverse()) {
                    let fn = opts.acceptEncoding[enc];
                    if (fn != null) {
                        decoded = decoded.pipe(fn());
                        decoded.on('error', onerror);
                    }
                }
            }
            if (!contentLength) {
                contentLength = parseInt(res.headers['content-length'] + '', 10);
                acceptRanges = res.headers['accept-ranges'] === 'bytes' &&
                    contentLength > 0 && opts.maxReconnects > 0;
            }
            res.on('data', ondata);
            decoded.on('end', onend);
            decoded.pipe(stream, { end: !acceptRanges });
            mydecoded = decoded;
            stream.emit('response', res);
            res.on('error', onerror);
        });
        myreq.on('error', onRequestError);
        stream.emit('request', myreq);
    };
    stream.abort = () => {
        aborted = true;
        stream.emit('abort');
        if (myreq) {
            myreq.abort();
        }
        if (mydecoded) {
            mydecoded.unpipe(stream);
        }
        clearTimeout(retryTimeout);
    };
    process.nextTick(doDownload);
    if (callback) {
        let body = '', myres;
        stream.setEncoding('utf8');
        stream.on('data', (chunk) => body += chunk);
        stream.on('response', (res) => myres = res);
        stream.on('end', () => callback(null, myres, body));
        stream.on('error', callback);
    }
    return callback ? null : stream;
}
// istanbul ignore next
// https://github.com/istanbuljs/nyc/issues/1209
(function (Miniget) {
    Miniget.promise = (url, options) => {
        return new Promise((resolve, reject) => {
            Miniget(url, options, (err, res, body) => {
                if (err)
                    return reject(err);
                resolve([res, body]);
            });
        });
    };
})(Miniget || (Miniget = {}));
module.exports = Miniget;
//# sourceMappingURL=index.js.map