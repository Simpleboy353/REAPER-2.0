var path = require('path');
var nconf = require('nconf');

module.exports = function (filepath, env) {
    filepath = filepath || path.join(process.cwd(), 'config.json');
    env = env || process.env.NODE_ENV || 'development';

    // Command-line arguments
    nconf.argv();

    // Environment variables
    nconf.env();

    // Environment specific configuration file
    var parts = filepath.split('.');

    parts.splice(parts.length - 1, 0, env);

    nconf.file(env, parts.join('.'));

    // Default configuration file
    nconf.file(filepath);

    return nconf.get();
};
