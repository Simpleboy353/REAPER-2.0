'use strict';

/* eslint-env browser */

function request(snek) {
  snek.options.body = snek.options.data;
  const type = snek.options.responseType === 'arraybuffer' ? 'arrayBuffer' : 'text';
  return window.fetch(snek.options.url, snek.options)
    .then((r) => r[type]().then((raw) => {
      const headers = {};
      for (const [k, v] of r.headers.entries()) {
        headers[k.toLowerCase()] = v;
      }
      return {
        raw,
        headers,
        statusCode: r.status,
        statusText: r.statusText,
      };
    }));
}

module.exports = {
  request,
  shouldSendRaw: () => false,
  METHODS: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'PATCH'],
  Parent: Object,
  FormData: window.FormData,
  querystring: {
    parse: (str) => {
      const parsed = {};
      for (const [k, v] of new window.URLSearchParams(str).entries()) {
        parsed[k] = v;
      }
      return parsed;
    },
    stringify: (obj) => new window.URLSearchParams(obj).toString(),
  },
};

