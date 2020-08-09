const Discord = module.require("discord.js");

module.exports = {
   name: "trash",
   description: "Trash Generator",
   run: async(client, message, args) => {
   const base = message.author;
   const avatar1 = base.user.displayAvatarURL({ format: 'png', size: '512'});
   const target = message.mentions.members.first();
   if (!target) {
   return message.channel.send("You need to mention Someone")
   }
   const avatar2 = target.user.displayAvatarURL({ format: 'png', size: '512' });

   message.channel.send({files: [{attachment: `https://api.alexflipnote.dev/trash?face=${avatar1}&trash=${avatar2}`, name: 'file.jpg' }]});
}
}
