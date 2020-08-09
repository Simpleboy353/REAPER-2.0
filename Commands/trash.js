const Discord = module.require("discord.js");

module.exports = {
   name: "trash",
   description: "Trash Generator",
   run: async(client, message, args) => {
   const base = message.author;
   const target = message.mentions.members.first();
   if (!target) {
   return message.channel.send("You need to mention Someone")
   }
   const baseAvatarURL = base.user.displayAvatarURL({ format: 'png', size: 512 });
   const targetAvatarURL = target.user.displayAvatarURL({ format: 'png', size: 512 });

   message.channel.send({files: [{attachment: `https://api.alexflipnote.dev/trash?face=${baseAvatarURL}&trash=${targetAvatarURL}`, name: 'file.jpg' }]});
}
}
