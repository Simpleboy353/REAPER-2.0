'use strict';

var assert = require('assert');
var request = require('../');

request('GET', 'http://example.com', function (err, res) {
  if (err) throw err;

  console.log('response A');
  assert(res.statusCode === 200);
  res.body.resume();
});

request('GET', 'http://example.com:80', function (err, res) {
  if (err) throw err;

  console.log('response A1');
  assert(res.statusCode === 200);
  res.body.resume();
});


request('GET', 'https://www.promisejs.org', function (err, res) {
  if (err) throw err;

  console.log('response B');
  assert(res.statusCode === 200);
  res.body.resume();
});

request('GET', 'https://promisejs.org', {followRedirects: true}, function (err, res) {
  if (err) throw err;

  console.log('response C');
  assert(res.statusCode === 200);
  res.body.resume();
});

request('GET', 'https://api.github.com/repos/isaacs/npm', {allowRedirectHeaders: ['User-Agent'], followRedirects: true, headers: {'User-Agent': 'http-basic'}}, function (err, res) {
  if (err) throw err;

  console.log('response D');
  assert(res.statusCode === 200);
  res.body.resume();
});