const fs = require("fs");
const Discord = require("discord.js");
let config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
   client.user.setPresence({ status: 'online' });
  const activities_list = [ 
   { msg: `in ${client.guilds.cache.size} Servers`, type:"PLAYING"},
   { msg: "Infinity Rocks", type:"STREAMING"},
   { msg: "Over Your Server 24/7", type:"WATCHING"},
   { msg: "=help", type:"LISTENING"},
   { msg: "Helping You make your Server Better", type:"PLAYING"},
   { msg: `in ${client.guilds.cache.size} Servers`, type:"PLAYING"},
    ];// creates an arraylist containing phrases you want your bot to switch through.
   setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5). 
        client.user.setActivity(activities_list[index].msg, {
          type: activities_list[index].type,
        }); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.});
});

client.on('message', message => {

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8")); //Read File
    if(!prefixes[message.guild.id]){  //If there is no string that is startwith prefixes[msg.guild.id]
       prefixes[message.guild.id] = { //Let prefixes[msg.guild.id] be
        prefix: config.DEFAULT_PREFIX //Prefix = Default Prefix Which is on confiฌ.json
       }
    }


    let prefix = prefixes[message.guild.id].prefix; //Let prefix be prefixes[msg.guild.id].prefix

      if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();

if (!client.commands.has(command)) return;

try{
  client.commands.get(command).run(client, message, args);
} catch (error) {
  console.error(error);
  message.channel.send("An Error has occured during the execution of the command: \nError: "+error)
}
});
client.login(process.env.token);