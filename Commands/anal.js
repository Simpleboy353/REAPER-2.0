const superagent = require("snekfetch");
const Discord = require('discord.js')

const rp = require('request-promise-native');

module.exports = {
    name: "ass",
    category: "nsfw",
  description: "Sends ass",
  run: async (client, message, args) => {
  //command
  if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')


  return rp.get('http://api.obutts.ru/butts/0/1/random').then(JSON.parse).then(function(res)  {
    return rp.get({
        url:'http://media.obutts.ru/' + res[0].preview,
        encoding: null
    });
}).then(function(res)   {

const lewdembed = new Discord.MessageEmbed()
      .setTitle("Ass")
      .setColor(`#000000`)
      .setImage("attachment://file.png").attachFiles([{ attachment: res, name: "file.png" }])


    message.channel.send(lewdembed);
});
  }
  };