const { Serializer } = require('klasa');
const { Role } = require('discord.js');

module.exports = class extends Serializer {

	deserialize(data, piece, language, guild) {
		if (!guild) throw this.client.languages.default.get('RESOLVER_INVALID_GUILD', piece.key);
		if (data instanceof Role) return data;
		const role = this.constructor.regex.role.test(data) ? guild.roles.cache.get(this.constructor.regex.role.exec(data)[1]) : guild.roles.cache.find(rol => rol.name === data) || null;
		if (role) return role;
		throw language.get('RESOLVER_INVALID_ROLE', piece.key);
	}

	serialize(value) {
		return value.id;
	}

	stringify(value, message) {
		return (message.guild.roles.cache.get(value) || { name: (value && value.name) || value }).name;
	}

};
