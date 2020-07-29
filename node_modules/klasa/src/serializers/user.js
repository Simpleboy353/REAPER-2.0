const { Serializer } = require('klasa');

module.exports = class extends Serializer {

	async deserialize(data, piece, language) {
		let user = this.client.users.resolve(data);
		if (user) return user;
		if (this.constructor.regex.userOrMember.test(data)) user = await this.client.users.fetch(this.constructor.regex.userOrMember.exec(data)[1]).catch(() => null);
		if (user) return user;
		throw language.get('RESOLVER_INVALID_USER', piece.key);
	}

	serialize(value) {
		return value.id;
	}

	stringify(value) {
		return (this.client.users.cache.get(value) || { username: (value && value.username) || value }).username;
	}

};
