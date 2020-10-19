const Discord = module.require("discord.js");




module.exports = {
    name: "softban",
    description: "Soft Ban a User",

    run: async(client, message, args) => {



        message.delete()

if(!message.member.hasPermission("BAN_MEMBERS")) {
  return message.channel.send("You do not have permission to perform this command!")
}
if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
  return message.channel.send("I dont have permission to perform this command")
}
   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")
   if(banMember.id === message.guild.owner.id) return message.channel.send("You cannot SoftBan the Server Owner");

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   

   banMember.send({embed: {color: "#ff0019", description:`Hello, you have been banned from ${message.guild.name} for violating Server Rules`}}).then(() =>
   message.guild.member(banMember).ban(banMember, { days: 1, reason: reason})).then(() => message.guild.members.unban(banMember.id).catch(err => console.log(err)));

   

    let embed = new Discord.MessageEmbed()
    .setThumbnail(banMember.user.displayAvatarURL())
    .setColor("RANDOM")
    .addField("Moderation:", "SOFT BAN")
    .addField("Banned:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .setTimestamp()

       message.channel.send(embed);

    }
}