"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = require("url");
const stream_1 = require("stream");
const httpLibs = { 'http:': http_1.default, 'https:': https_1.default };
const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
const retryStatusCodes = new Set([429, 503]);
const defaults = {
    maxRedirects: 10,
    maxRetries: 2,
    maxReconnects: 0,
    backoff: { inc: 100, max: 10000 },
};
function Miniget(url, options = {}) {
    var _a;
    const opts = Object.assign({}, defaults, options);
    const stream = new stream_1.PassThrough({ highWaterMark: opts.highWaterMark });
    let activeRequest;
    let activeDecodedStream;
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
    if ((_a = opts.headers) === null || _a === void 0 ? void 0 : _a.Range) {
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
    const downloadHasStarted = () => activeDecodedStream && 0 < downloaded;
    const downloadEnded = () => !acceptRanges || downloaded == contentLength;
    const reconnect = (err) => {
        activeDecodedStream = null;
        retries = 0;
        let inc = opts.backoff.inc;
        let ms = Math.min(inc, opts.backoff.max);
        retryTimeout = setTimeout(doDownload, ms);
        stream.emit('reconnect', reconnects, err);
    };
    const reconnectIfEndedEarly = (err) => {
        if (!downloadEnded() && reconnects++ < opts.maxReconnects) {
            reconnect(err);
            return true;
        }
        return false;
    };
    const retryRequest = (retryOptions) => {
        if (aborted) {
            return false;
        }
        if (downloadHasStarted()) {
            return reconnectIfEndedEarly(retryOptions.err);
        }
        else if ((!retryOptions.statusCode || retryOptions.err.message === 'ENOTFOUND') &&
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
        if (!retryRequest({ err, statusCode })) {
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
        activeRequest = httpLib.get(parsed, (res) => {
            if (redirectStatusCodes.has(res.statusCode)) {
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
            else if (retryStatusCodes.has(res.statusCode)) {
                if (!retryRequest({ retryAfter: parseInt(res.headers['retry-after'], 10) })) {
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
            let decodedStream = res;
            const cleanup = () => {
                res.removeListener('data', ondata);
                decodedStream.removeListener('end', onend);
                decodedStream.removeListener('error', onerror);
                res.removeListener('error', onerror);
            };
            const ondata = (chunk) => { downloaded += chunk.length; };
            const onend = () => {
                cleanup();
                if (!reconnectIfEndedEarly()) {
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
                        decodedStream = decodedStream.pipe(fn());
                        decodedStream.on('error', onerror);
                    }
                }
            }
            if (!contentLength) {
                contentLength = parseInt(res.headers['content-length'] + '', 10);
                acceptRanges = res.headers['accept-ranges'] === 'bytes' &&
                    contentLength > 0 && opts.maxReconnects > 0;
            }
            res.on('data', ondata);
            decodedStream.on('end', onend);
            decodedStream.pipe(stream, { end: !acceptRanges });
            activeDecodedStream = decodedStream;
            stream.emit('response', res);
            res.on('error', onerror);
        });
        activeRequest.on('error', onRequestError);
        stream.emit('request', activeRequest);
    };
    stream.abort = () => {
        aborted = true;
        stream.emit('abort');
        activeRequest === null || activeRequest === void 0 ? void 0 : activeRequest.abort();
        activeDecodedStream === null || activeDecodedStream === void 0 ? void 0 : activeDecodedStream.unpipe(stream);
        clearTimeout(retryTimeout);
    };
    stream.text = () => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let body = '';
            stream.setEncoding('utf8');
            stream.on('data', (chunk) => body += chunk);
            stream.on('end', () => resolve(body));
            stream.on('error', reject);
        });
    });
    process.nextTick(doDownload);
    return stream;
}
module.exports = Miniget;
//# sourceMappingURL=index.js.map