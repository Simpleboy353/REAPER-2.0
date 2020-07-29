const { Serializer } = require('klasa');

module.exports = class extends Serializer {

	constructor(...args) {
		super(...args, { aliases: ['command', 'language'] });
	}

	deserialize(data, piece, language) {
		const store = this.client[`${piece.type}s`];
		const parsed = typeof data === 'string' ? store.get(data) : data;
		if (parsed && parsed instanceof store.holds) return parsed;
		throw language.get('RESOLVER_INVALID_PIECE', piece.key, piece.type);
	}

	serialize(value) {
		return value.name;
	}

};
