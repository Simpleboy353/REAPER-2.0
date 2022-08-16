const discord = require("discord.js");
const translate = require('@iamtraction/google-translate');

module.exports = {
  name: "translate",
  description: "Translates the given message.",
  run: async (client, message, args) => {
        const txt = args.slice(1).join(" ")
        const lang = args[0]
        if(!lang) return message.channel.send("Provide the ISO code of the language.")
        if(!txt) return message.channel.send("Provide a text to translate.")
        translate(txt, { to: lang }).then(res => {
          const embed = new discord.EmbedBuilder()
          .setDescription(res.text)
          .setColor("Random")
          message.channel.send({ embeds: [embed] });
    }).catch(err => {
      message.channel.send("Please provide a valid ISO language code.")
    });
  },
};
