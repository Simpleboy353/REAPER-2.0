const { find } = require('@discordjs/node-pre-gyp');
const { resolve, join } = require('path');

const bindingPath = find(resolve(join(__dirname, '..', 'package.json')));
const binding = require(bindingPath);

module.exports = binding;
