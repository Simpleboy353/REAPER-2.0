var assert = require('assert'),
    urban = require('../lib/urban');

// https://github.com/visionmedia/should.js/blob/master/examples/runner.js
function test(name, fn){
  try {
    fn();
  } catch (err) {
    console.log('    \x1b[31m%s', name);
    console.log('    %s\x1b[0m', err.stack);
    return;
  }
  console.log('  √ \x1b[32m%s\x1b[0m', name);
}

urban('bi winning').on('end', function(res) {
  var self = this;

  test('response: 200 ok', function() {
    assert.equal(self._res.statusCode, 200);
  });

  // many arguments
  urban('bi', 'winning').on('end', function() {
    var words = this.words;

    // an array as argument
    urban(['bi','winning']).on('end', function() {
      var array = this;
      test('passing arguments in various ways', function() {
        assert.equal(words, array.words);
        assert.equal(words, self.words);
        assert.equal(array.words, self.words);
      });

        // random mode
        urban.random().on('end', function(res){
            var self = this;
            test('random mode: response: 200 ok', function() {
                assert.equal(self._res.statusCode, 200);
            });
            test('random mode: list is populated', function() {
                assert.equal(res.list.length > 1, true);
            });
        })

    });
  });
});