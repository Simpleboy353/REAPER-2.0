const Discord = module.require("discord.js");

module.exports = {
   name: "respect",
   description: "Returns Random Respect GIF",
   run: async(client, message, args) => {
   const user = message.mentions.members.first();
   if (!user) {
   return message.channel.send("You need to mention someone")
   }
   var gif = [
    `https://media.tenor.com/images/0eb1f1ff68936dbde97bebfa4145e6f0/tenor.gif`,
    `https://media.tenor.com/images/aff79a052e44a086ae473277d7da8a16/tenor.gif`,
    `https://media.tenor.com/images/81e0044564919b3804681952f4191621/tenor.gif`,
    `https://media.tenor.com/images/67e34fd8928748888c93894e0fc07c1d/tenor.gif`,
    `https://media.tenor.com/images/6c6d4aef595b236fa1e925ab1ab43502/tenor.gif`,
    `https://media.tenor.com/images/045b1c2e205826ccc7418bb13cc1bcd7/tenor.gif`,
    `https://media.tenor.com/images/e56d320cdc20d4f8602be39b4e460d49/tenor.gif`,
    `https://media.tenor.com/images/cb6989d452a97107bcff9e6aa8c4ba3d/tenor.gif`,
    `https://media.tenor.com/images/a697ff336053aa2eb4d9ed9a8b8526ea/tenor.gif`,
    `https://media.tenor.com/images/4363c864b009e851dacc13b259a9d75c/tenor.gif`,
    `https://media.tenor.com/images/d73aac94ff4e9b22a94a223ffd9ec651/tenor.gif`,
   ];
    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username} respects ${user.displayName}`)
    .setImage(`${gif[Math.floor(Math.random()*gif.length)]}`)
    .setColor("RANDOM");

   message.channel.send(embed);
}
}
