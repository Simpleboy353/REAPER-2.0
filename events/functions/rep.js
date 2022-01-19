const repData = require("../../database/guildData/rep")
const userRepData = require("../../database/guildData/userRep")

module.exports = async (message, client) => {

	if (!message.mentions.members.first()) return;

	const data = await repData.findOne({
		GuildID: message.guild.id
	}).catch(console.error)

	if (!data) return;

	const userData = await userRepData.findOne({
		GuildID: message.guild.id,
		UserID: message.mentions.members.first().id
	}).catch(console.error);



	let words = ["ft", "lf", "for trade", "looking for"]
	let tradeRepChannel = await data.ChannelID
	let found;

	let messageArray = await message.content.toLowerCase().split(" ");

    words.forEach(async(word)=>{
		if (messageArray.includes(word)) found = true
		else found = false
	})

	if (found != true) return;

	if (message.channel.id === tradeRepChannel) {

		if (!userData) {

			let newData = new userRepData({
				GuildID: message.guild.id,
				UserID: message.mentions.members.first().id,
				GeneralRep: 0,
				TradeRep: 1
			})
			newData.save()
			message.reply(`${message.mentions.members.first()}, You gained +1 Trade Rep!`)

		} else if (userData) {

			userData.TradeRep += 1;
			userData.save();
			message.channel.send(`${message.mentions.members.first()}, You gained +1 Trade Rep!`)

		}
	} else {

		if (!userData) {

			let newData = new userRepData({
				GuildID: message.guild.id,
				UserID: message.mentions.members.first().id,
				GeneralRep: 1,
				TradeRep: 0
			})
			newData.save();
			message.reply(`${message.mentions.members.first()}, You gained +1 General Rep!`)

		} else if (userData) {

			userData.GeneralRep += 1;
			userData.save();
			message.channel.send(`${message.mentions.members.first()}, You gained +1 General Rep!`)
				
		}
		
	}
}