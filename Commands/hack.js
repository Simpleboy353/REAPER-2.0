const Discord = module.require("discord.js");

module.exports = {
	name: "hack",
	description: "Another Fun Command",
	run: async(client, message, args, Memer) => {
		const hacked = message.mentions.members.first();
		if (!hacked) {
		return message.channel.send("Woah..... Slow down, Who are we hacking..?")
		}
		const prompt = await message.channel.send(`Hacking ${hacked.displayName} now...`)
    await Memer.sleep(1500)
    if (hacked) {
      await prompt.edit('Finding discord login...')
      await Memer.setInterval(1700)
      await prompt.edit(`Found:\n**Email**: \`${hacked.username}***@gmail.com\`\n**Password**: \`*******\``)
      await Memer.setInterval(1700)
      await prompt.edit('Fetching dms')
      await Memer.setInterval(1000)
      await prompt.edit('Listing most common words...')
      await Memer.setInterval(1000)
      await prompt.edit(`Injecting virus into discriminator #${hacked.discriminator}`)
      await Memer.setInterval(1000)
      await prompt.edit('Virus injected')
      await Memer.setInterval(1000)
    }
    await prompt.edit('Finding IP address')
    await Memer.setInterval(2000)
    await prompt.edit('Spamming email...')
    await Memer.setInterval(1000)
    await prompt.edit('Selling data to facebook...')
    await Memer.setInterval(1000)
    await prompt.edit(`Finished hacking ${hacked.displayName}`)
    return 'The hack is complete.'
		}
	}
