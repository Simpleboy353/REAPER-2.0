const Discord = module.require("discord.js");
const mongoose = require("mongoose")
const prefix = require("../Owner/models/prefix");

mongoose.connect("mongodb+srv://Simpleboy353:rhtking123@cluster0.hcxzx.mongodb.net/Clustor0?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  name: "help",
  description: "Get the Command List",
  run: async(client, message, args) => {
    const data = await prefix.findOne({
      GuildID: message.guild.id
    });
    
    if (data) {
     var prefix = data.Prefix;
    } else if (!data) {
      //set the default prefix here
     var prefix = "=";
    }
    const embed = new Discord.MessageEmbed()
      .setTitle('Commands List')
      .setDescription(`Prefix for your Server: ${prefix} \nAvailable Categories: `)
      .addField(`<:conf:748544324978999448> __**Configuration**__: `, `\`helpconfig\`\nConfigure the bot as per your server!`)
      .addField(`<a:ColorDino:726964382009131099> __**Fun**__: `, `\`${prefix}helpfun\`\nUse these commands to have some fun in your Server`)
      .addField(`<:cam:748544442478100511> __**Image**__: `, `\`${prefix}helpimage\`\nManipulate Images with these commands`)
      .addField(`<:inf:748544269798866964> __**Info**__: `, `\`${prefix}helpinfo\`\nHave some info relating the Server, Users or Our Bot`)
      .addField(`<:mod:748544387499294841> __**Moderation**__: `, `\`${prefix}helpmod\`\nIssues relating some users? Use these Commands`)
      .addField(`<:music:761893108442071060> __**Music**__: `, `\`${prefix}helpmusic\`\nRelax and listen to some music!`)
      .addField(`<:utility:748177830134808597> __**Utility**__: `, `\`${prefix}helputility\`\nSome Simple Utility Commands`)
      .setColor("RANDOM");

      message.channel.send(embed);
  }
}