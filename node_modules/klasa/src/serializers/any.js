const { Serializer } = require('klasa');

module.exports = class extends Serializer {

	deserialize(data) {
		return data;
	}

};
