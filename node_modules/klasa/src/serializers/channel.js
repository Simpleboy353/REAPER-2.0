const { Serializer } = require('klasa');
const { Channel } = require('discord.js');

module.exports = class extends Serializer {

	constructor(...args) {
		super(...args, { aliases: ['textchannel', 'voicechannel', 'categorychannel'] });
	}

	checkChannel(data, piece, language) {
		if (
			piece.type === 'channel' ||
			(piece.type === 'textchannel' && data.type === 'text') ||
			(piece.type === 'voicechannel' && data.type === 'voice') ||
			(piece.type === 'categorychannel' && data.type === 'category')
		) return data;
		throw language.get('RESOLVER_INVALID_CHANNEL', piece.key);
	}

	deserialize(data, piece, language, guild) {
		if (data instanceof Channel) return this.checkChannel(data, piece, language);
		const channel = this.constructor.regex.channel.test(data) ? (guild || this.client).channels.cache.get(this.constructor.regex.channel.exec(data)[1]) : null;
		if (channel) return this.checkChannel(channel, piece, language);
		throw language.get('RESOLVER_INVALID_CHANNEL', piece.key);
	}

	serialize(value) {
		return value.id;
	}

	stringify(value, message) {
		return (message.guild.channels.cache.get(value) || { name: (value && value.name) || value }).name;
	}

};
