var assert = require('assert');
var path = require('path');
var spawn = require('child_process').spawn;
var tests = {
    basic: path.join(__dirname, 'fixtures', 'basic', 'test.js'),
    complex: path.join(__dirname, 'fixtures', 'complex', 'test.js'),
    specific: path.join(__dirname, 'fixtures', 'complex', 'test-specific-env.js')
};

function run(test, callback, options) {
    options = options || {};

    var env = null;

    if (options.env) {
        env = {};

        Object.keys(process.env).forEach(function (key) {
            env[key] = process.env[key];
        });
        Object.keys(options.env).forEach(function (key) {
            env[key] = options.env[key];
        });
    }

    var child = spawn('node', [test].concat(options.args), { env: env, cwd: path.dirname(test) });

    child.stdout.on('data', function (data) {
        callback(data.toString());
    });
}

describe('config.json', function () {
    it('should load configuration file from the current working directory of the process', function (done) {
        run(tests.basic, function (foo) {
            assert.equal(foo, 'bar');
            done();
        });
    });

    it('should use the default configuration file', function (done) {
        run(tests.complex, function (foo) {
            assert.equal(foo, 'bar');
            done();
        }, {
            env: { NODE_ENV: 'production' }
        });
    });

    it('should use environment specific configuration file', function (done) {
        run(tests.complex, function (foo) {
            assert.equal(foo, 'baz');
            done();
        }, {
            env: { NODE_ENV: 'development' }
        });
    });

    it('should use environment variables', function (done) {
        run(tests.complex, function (foo) {
            assert.equal(foo, 'bar');
            done();
        }, {
            env: { NODE_ENV: 'development', foo: 'bar' }
        });
    });

    it('should use command-line arguments', function (done) {
        run(tests.complex, function (foo) {
            assert.equal(foo, 'qux');
            done();
        }, {
            env: { NODE_ENV: 'development', foo: 'bar' },
            args: ['--foo', 'qux']
        });
    });

    it('should use specific configuration file', function (done) {
        run(tests.specific, function (foo) {
            assert.equal(foo, 'qux');
            done();
        }, {
            env: { NODE_ENV: 'development' }
        });
    });
});
