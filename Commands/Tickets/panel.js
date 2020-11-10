const { MessageEmbed } = require("discord.js");
const { panelModel } = require("../Owner/models/tickets/panel");
module.exports = {
  name: "panel",
  description: "Get the pannel!",
  cooldown: 3,
  run: async(client, message, args)=> {
    const panel = await panelModel.findOne({
      guild: message.guild.id,
    });
    if (!panel) {
      let a = new panelModel({
        guild: message.guild.id,
      });
      a.save();
    }
    if (panel) {
      const e = new MessageEmbed()
        .setTitle(`Panel`)
        .setDescription(
          `This is the panel if u react here a ticket will open.`
        );
      message.channel.send(e).then(async (msg) => {
        await panelModel.findOneAndUpdate({
          guild: message.guild.id,
          msg: msg.id,
        });
        await msg.react("🎫");
      });
    }
  },
};