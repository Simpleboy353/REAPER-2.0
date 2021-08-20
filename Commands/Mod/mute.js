const { MessageEmbed } = module.require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute members in one shot",
  category: "moderation",
  usage: "=mute <@user> <reason >",
  userPerms: ["MANAGE_ROLES"],
  botPerms: ["EMBED_LINKS", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        `**${message.author.username}**, Please mention the member who you want to mute`
      );
    }

    if (user.id === message.guild.owner.id) {
      return message.channel.send("You cannot mute the Server Owner");
    }

    if (user.id === message.author.id) {
      return message.channel.send(
        `**${message.author.username}**, You can't mute yourself`
      );
    }

    let reason = args.slice(1).join(" ");

    let muterole = message.guild.roles.cache.find((x) => x.name === "Muted");

    if (!muterole) {
     try {
				message.reply({
					content: `I dont find the role, I go to create them`, 
					allowedMentions: { repliedUser: true}
			    });
                muterole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
       
					message.channel.send({
						content: `The role <@&${muterole}> be created`
                    });
       
			} catch (error) {
                console.log(error)
            }
        };

    if (user.roles.cache.has(muterole)) {
      return message.channel.send(`Given User is already muted`);
    }

    user.roles.add(muterole);

    const embed = new MessageEmbed()
      .setTitle("Muted!")
      .setColor("RANDOM")
      .setDescription(
        `Action: Muted \nUser:${user} \nReason: ${reason} \nModerator: ${message.member} `
      );
    message.channel.send({ embeds: [embed] });
  },
};
