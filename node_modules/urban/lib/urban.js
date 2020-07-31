var http = require('http'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,
    randomWord;

function urban() {
  var word = new Dictionary(null); // instantiate first
  return word.constructor.apply(word, arguments); // then re-instantiate it with the arguments of `urban`
}

function random() {
  randomWord = true;
  return urban();
}

urban.version = "0.3.1";

function Dictionary(words) {
  if (randomWord === true && !arguments.length){
    this.getData();
    randomWord = false;
    return this;
  }

  if (!arguments.length) {
    throw new Error('missing argument(s)');
  }
  else if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) words += ' ' +arguments[i];
  }
  else {
    if (Array.isArray(words)) {
      words = words.join(' ');
    }
  }

  this._ended = false;
  this.json = '';

  if (words !== null) {
    this.words = encodeURI(words.trim());
    this.getData();
  }
  else {
    return false;
  }

  return this;
}

util.inherits(Dictionary, EventEmitter);
Dictionary.fn = Dictionary.prototype;
Dictionary.fn._noop = function() {};
Dictionary.fn._end = function(fn) {
  if (this._ended) {
    fn(this.json);
  }
  else {
    this.once('end', function(json) {
      fn(json);
    });
  }
  return this;
};

Dictionary.fn.getData = function(page) {
  this.page = page || 1;
  var self = this;
  var _path = (!randomWord) ? '/v0/define?page=' + self.page + '&term=' + self.words : '/v0/random';
  if (this._req && this._ended === 0) this._req.abort(); // abort if there's already one request happening
  this._ended = false;
  this._req = http.get({
    port: 80,
    host: 'api.urbandictionary.com',
    path: _path
  }, function(res) {
    self._res = res; // reference
    self.json = '';
    res.on('data', function(data) {
      if (self._ended !== 0) self._ended = 0; // in progress
      self.json += data;
    }).on('end', function() {
      self.json = JSON.parse(self.json.trim());
      self.emit('end', self.json);
      self._ended = true;
    });
  });
  return this;
};

Dictionary.fn.images = function(fn) {
  return this._end(function(json) {
    if (fn) fn(json.images);
  });
};

Dictionary.fn.total = function(fn) {
  return this._end(function(json) {
    if (fn) fn(json.total);
  });
};

Dictionary.fn.pages = function(fn) {
  return this._end(function(json) {
    if (fn) fn(json.pages);
  });
};

Dictionary.fn.more = Dictionary.fn.next = function() {
  return this.getData(++this.page);
};

Dictionary.fn.prev = function() {
  return this.getData(this.page < 2 ? 1 : --this.page);
};

Dictionary.fn.res = Dictionary.fn.results = function(fn) {
  return this._end(function(json) {
    if (fn) fn(json.list);
  });
};

Dictionary.fn.first = function(fn) {
  return this._end(function(json) {
    if (fn && json.list) fn(json.list[0]);
  });
};

module.exports = urban;
module.exports.random = random;
