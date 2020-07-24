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
  client.user.setActivity('Beta Version 2.5.2',{ type: 'STREAMING'}).catch(console.error);
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

  if (command === 'ping') {
	client.commands.get('ping').execute(message, args);
  } else if(command === 'mute') {
  client.commands.get('mute').execute(message, args);
  }
  if (command === 'avatar') {
  client.commands.get('avatar').execute(message, args);
  } else if(command === 'ascii') {
  client.commands.get('ascii').execute(message, args);
  }
  if (command === 'kick') {
  client.commands.get('kick').execute(message, args);
  } else if (command === 'ban') {
  client.commands.get('ban').execute(message, args);
  }
  if (command === 'help') {
  client.commands.get('help').execute(message, args);
  } else if (command === 'warn') {
  client.commands.get('warn').execute(message, args);
  }
  if (command === 'unmute') {
  client.commands.get('unmute').execute(message, args);
  } else if (command === 'say') {
  client.commands.get('say').execute(message, args);
  }
  if (command === 'emojify') {
  client.commands.get('emojify').execute(message, args);
  } else if (command === 'tempmute') {
  client.commands.get('tempmute').execute(message, args);
  }
  if (command === 'amazeme') {
  client.commands.get('amazeme').execute(message, args);
  } else if (command === 'softban') {
  client.commands.get('softban').execute(message, args);
  }
  if (command === 'clear') {
  client.commands.get('clear').execute(message, args);
  } else if (command === 'trivia') {
  client.commands.get('trivia').run(client, message, args);
  }
  if (command === 'fliptext') {
  client.commands.get('fliptext').execute(message, args);
  } else if (command === '8ball') {
  client.commands.get('8ball').run(client, message, args);
  }
  if (command === 'serverinfo') {
  client.commands.get('serverinfo').run(client, message, args);
  } else if (command === 'userinfo') {
  client.commands.get('userinfo').run(client, message, args);
  }
  if (command === 'helpmod') {
  client.commands.get('helpmod').run(client, message, args);
  } else if (command === 'helpfun') {
  client.commands.get('helpfun').run(client, message, args);
  }
  if (command === 'helpinfo') {
  client.commands.get('helpinfo').run(client, message, args);
  } else if (command === 'helputility') {
  client.commands.get('helputility').run(client, message, args);
  }
  if (command === 'userid') {
  client.commands.get('userid').run(client, message, args);
  } else if (command === 'prefix') {
  client.commands.get('prefix').run(client, message, args);
  }
  if (command === 'giverole') {
  client.commands.get('giverole').run(client, message, args);
  } else if (command === 'removerole') {
  client.commands.get('removerole').run(client, message, args);
  }
  if (command === 'shutdown') {
  client.commands.get('shutdown').run(client, message, args);
  } else if (command === 'invite') {
  client.commands.get('invite').run(client, message, args);
  }
  if (command === 'announce') {
  client.commands.get('announce').run(client, message, args);
  } else if (command === 'cowsay') {
  client.commands.get('cowsay').run(client, message, args);
  }
  if (command === 'roast') {
  client.commands.get('roast').run(client, message, args);
  }
});

client.login(process.env.token);