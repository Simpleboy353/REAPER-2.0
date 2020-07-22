var config = require('../../../')('./configs/custom.json', 'test');

process.stdout.write(config.foo);
