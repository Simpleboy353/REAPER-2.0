const { FieldsEmbed } = require("discord-paginationembed");

const Discord = module.require("discord.js");

module.exports = {
  name: "halp",
  description: "Trying a new Help command",
  run: async(client, message, args)=> {
    const Pagination = require("discord-paginationembed")
    const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray([{word: "help2"}, {word: "commands"}])
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(4)
    .setPageIndicator(true)
    .formatField("Commands List", el => el.word)
    FieldsEmbed.embed
    .setColor("CYAN")
    .setTitle("Hi")
    .setTimestamp()
    FieldsEmbed.build()
  }
}