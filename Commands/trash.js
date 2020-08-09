const Discord = module.require("discord.js");

module.exports = {
   name: "trash",
   description: "Trash Generator",
   run: async(client, message, args) => {
   const base = message.author;
   const avatar1 = base.displayAvatarURL();
   const target = message.mentions.members.first();
   if (!target) {
   return messagsle.channel.send("You need to mention Someone")
   }
   const avatar2 = target.displayAvatarURL();

   message.channel.send({files: [{attachment: `https://api.alexflipnote.dev/trash?face=${avatar1}&trash=${avatar2}`, name: 'file.jpg' }]});
}
}
