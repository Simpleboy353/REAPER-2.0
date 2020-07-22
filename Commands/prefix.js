const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "prefix",
    description: "Change the bot prefix",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permissions to set prefix!"); //If The Author Doesnt Have Manage guild permission return a message
      if(!args[0]) return message.channel.send("Please specify a prefix!"); //If there isn't a prefix then return a message
      
      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8")); //Read File
      prefixes[message.guild.id] = { //Let The config be
      prefix: args[0] //Let prefix = arguement 1
      }
      
      fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => { //Write File
        if(err) console.log(err); //If error log error to the console
      })
      
      message.channel.send(`Prefix has been set to **${args[0]}**!`); //send message to that channel
      return; //return
    }
    }
