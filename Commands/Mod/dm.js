const Discord = module.require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "dm",
  description: "Sends DM message to any user.",
  userPerms: ["ManageMembers"],
  usage: "dm <@mention> <msg>",
  aliases: ["dme" , "msgme"],
  //botPerms: ["ADMINISTRATOR"],//
  //userPerms: ["ADMINISITRATOR"],//

  run: async (client, message, args) => {
      message.delete();

      if (!args[0]) {
      
      let Embed89 = new EmbedBuilder()
      .setDescription('your msg')
      .setTitle("**Syntax Helper - Command**")
      .setColor("#FBD570")
      .setFooter('your footer msg')
      return message.channel.send({ embeds: [Embed89] })}

      

      const user = message.mentions.users.first();
      const text = args.slice(1).join(" ");

      
      
    if (!user) {let Embed172 = new EmbedBuilder()
        .setDescription("Please mention a **Valid** user.")
        .setTitle("**Error - Impossible Action**")
        .setColor("#FF073A")
        .setFooter('Prefix: !')
        return message.channel.send({ embeds: [Embed172] })}

        
    

    if (!text){let Embed172 = new EmbedBuilder()
        .setDescription("Please enter a **Message**.")
        .setTitle("**Error - Impossible Action**")
        .setColor("#FBD570")
        .setFooter('your footer msg')
        return message.channel.send({ embeds: [Embed172] })}

       
      
   
   
     
    
      let embed = new EmbedBuilder()
      .setTitle("**Dear User**")
      .setDescription(`${text}`)
      .setColor("#FBD570")
      .setFooter('Direct Message')
      user.send({ embeds: [embed] })
    

  },

  
};
