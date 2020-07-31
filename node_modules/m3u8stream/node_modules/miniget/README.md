# node-miniget

A small http(s) GET library with redirects, retries, reconnects, concatenating or streaming, and no dependencies. This keeps filesize small for potential browser use.

[![Dependency Status](https://david-dm.org/fent/node-miniget.svg)](https://david-dm.org/fent/node-miniget)
[![codecov](https://codecov.io/gh/fent/node-miniget/branch/master/graph/badge.svg)](https://codecov.io/gh/fent/node-miniget)


# Usage

Concatenates a response

```js
const miniget = require('miniget');

miniget('http://mywebsite.com', (err, res, body) => {
  console.log('webpage contents: ', body);
});

// with await
let [res, body] = await miniget.promise('http://yourwebsite.com');
```

Request can be streamed right away

```js
miniget('http://api.mywebsite.com/v1/messages.json')
  .pipe(someWritableStream());
```


# API

### miniget(url, [options], [callback(err, http.RequestResponse, body)])

Makes a GET request. `options` can have any properties from the [`http.request()` function](https://nodejs.org/api/http.html#http_http_request_options_callback), in addition to

* `maxRedirects` - Default is `2`.
* `maxRetries` - Number of times to retry the request if there is a 500 or connection error. Default is `1`.
* `maxReconnects` - During a big download, if there is a disconnect, miniget can try to reconnect and continue the download where it left off. Defaults to `0`.
* `backoff` - An object with `inc` and `max` used to calculate how long to wait to retry a request. Defaults to `{ inc: 100, max: 10000 }`.
* `retryOnAuthError` - In addition to retrying the request on server and connection errors, any authentication errors will trigger a retry.
* `highWaterMark` - Amount of data to buffer when in stream mode.
* `transform` - Use this to add additional features. Called with the object that `http.get()` or `https.get()` would be called with. Must return a transformed object.
* `acceptEncoding` - An object with encoding name as the key, and the value as a function that returns a decoding stream.
  ```js
  acceptEncoding: { gzip: () => require('zlip').createGunzip(stream) }
  ```
  Given encodings will be added to the `Accept-Encoding` header, and the response will be decoded if the server responds with encoded content.

If `callback` is given, will concatenate the response, and call `callback` with a possible error, the response, and the response body. If you'd like a concatenated response, but want to use `await` instead, you can call `miniget.promise()`.

```js
let [res, body] = await miniget.promise('http://yourwebsite.com');
```

Miniget returns a readable stream if `callback` is not given, errors will then be emitted on the stream. Returned stream also contains an `.abort()` method, and can emit the following events.

#### Event: redirect
* `string` - URL redirected to.

Emitted when the request was redirected with a redirection status code.

#### Event: retry
* `number` - Number of retry.
* `Error` - Request or status code error.

Emitted when the request fails, or the response has a status code >= 500.

#### Event: reconnect
* `number` - Number of reconnect.
* `Error` - Request or response error.

Emitted when the request or response fails after download has started.


# Install

    npm install miniget


# Tests
Tests are written with [mocha](https://mochajs.org)

```bash
npm test
```
