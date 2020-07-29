const Discord = require("discord.js");

module.exports = {
    name: "hack",
    description: "Hacking Prank",
    run: async (client, message, args) => {
      let tag = message.mentions.members.first();
    if(!tag){
      return message.channel.send(`${message.author.username}, Mention a guy to hack`)
    }
    if(tag.id === message.author.id){
      return message.channel.send(`${message.author.username} I cant hack you , tell someone to hack`)
    }
    const a = await message.channel.send((`Hacking ${tag}`), 2000)
    const b = await a.edit("Getting User's Personal info....")
    const c = await b.edit(("Getting User's Personal info."), 3000)
    const d = await c.edit(("Getting User's Personal info.."), 3000)
    const e = await d.edit(("Getting User's Personal info..."), 3000)
    const f = await e.edit(("Done Getting User's info"), 3000)
    const g = await f.edit(("Selling the data to FBI"), 3000)
    let random = Math.floor(Math.random() * 500 )
    const h = await g.edit(`Sold for ${random}$ to the fbi`)

    }
    }

