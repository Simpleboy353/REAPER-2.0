const Discord = module.require("discord.js");

module.exports = {
  name: "help",
  description: "Get the Command List",
  run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('Commands List')
      .setDescription("Available Categories: ")
      .addField(`<a:ColorDino:726964382009131099> __**Fun**__: `, "`=help fun`\nUse these commands to have some fun in your Server")
      .addField(`<:cam:748544442478100511> __**Image**__: `, "`=help image`\nManipulate Images with these commands")
      .addField(`<:inf:748544269798866964> __**Info**__: `, "`=help info`\nHave some info relating the Server, Users or Our Bot")
      .addField(`<:mod:748544387499294841> __**Moderation**__: `, "`=help mod`\nIssues relating some users? Use these Commands")
      .addField(`<:music:761893108442071060> __**Music**__: `, "`=help music`\nRelax and listen to some music!")
      .addField(`<:utility:748177830134808597> __**Utility**__: `, "`=help utility`\nSome Simple Utility Commands")
      .setColor("RANDOM");

      message.channel.send(embed);
  }
}