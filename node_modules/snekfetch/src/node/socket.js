'use strict';

const tls = require('tls');
const http = require('http');
const https = require('https');
// lazy require http2 because it emits a warning
let http2;

const hasHttp2 = (() => {
  const [a, b, c] = process.version.split('.');
  return (+a.slice(1) * 0x1000) + (+b * 0x100) + +c >= 38912;
})();
const ALPNProtocols = hasHttp2 ? ['h2', 'http/1.1'] : ['http/1.1'];

function connectHttp(opt) {
  const req = http.request(opt);
  return Promise.resolve({ req });
}

function http2req(connection, opt) {
  return connection.request(Object.assign({
    ':path': opt.path,
    ':method': opt.method,
    ':authority': opt.host,
  }, opt.headers));
}

function connectHttps(opt) {
  return new Promise((resolve, reject) => {
    const port = opt.port = +opt.port || 443;
    const socket = tls.connect({
      host: opt.host,
      port,
      servername: opt.host,
      ALPNProtocols,
    });
    socket.once('error', reject);
    socket.once('secureConnect', () => {
      switch (socket.alpnProtocol) {
        case false:
        case 'http/1.1': {
          const req = https.request(Object.assign({
            createConnection: () => socket,
          }, opt));
          resolve({ req });
          break;
        }
        case 'h2': {
          if (http2 === undefined) {
            http2 = require('http2');
          }

          const connection = http2.connect({
            host: opt.host,
            port,
          }, {
            createConnection: () => socket,
          });

          connection.port = opt.port;
          connection.host = opt.host;

          const req = http2req(connection, opt);
          resolve({ req, http2: true, connection });
          break;
        }
        default:
          reject(new Error(`No supported ALPN protocol was negotiated, got ${socket.alpnProtocol}`));
          break;
      }
    });
  });
}

module.exports = (options) =>
  (options.protocol === 'https:' ? connectHttps : connectHttp)(options);

module.exports.http2req = http2req;
