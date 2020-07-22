var test = require('tape')
  , flip = require('..')

test('should flip text', function (t) {
  t.equal(flip('Hello, World!'), '¡plɹoM \'ollǝH', 'text is flipped')
  t.end()
})

test('should be reversible', function (t) {
  t.equal(flip(flip('Hello, World!')), 'Hello, World!')
  t.end()
})
