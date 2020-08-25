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

if (command === 'ping') {
  client.commands.get('ping').run(client, message, args);
  } else if(command === 'mute') {
  client.commands.get('mute').run(message, args);
  }
  if (command === 'avatar') {
  client.commands.get('avatar').run(message, args);
  } else if(command === 'ascii') {
  client.commands.get('ascii').run(message, args);
  }
  if (command === 'kick') {
  client.commands.get('kick').run(message, args);
  } else if (command === 'ban') {
  client.commands.get('ban').run(message, args);
  }
  if (command === 'help') {
  client.commands.get('help').run(message, args);
  } else if (command === 'warn') {
  client.commands.get('warn').run(message, args);
  }
  if (command === 'unmute') {
  client.commands.get('unmute').run(message, args);
  } else if (command === 'say') {
  client.commands.get('say').run(message, args);
  }
  if (command === 'emojify') {
  client.commands.get('emojify').run(message, args);
  } else if (command === 'tempmute') {
  client.commands.get('tempmute').run(message, args);
  }
  if (command === 'amazeme') {
  client.commands.get('amazeme').run(message, args);
  } else if (command === 'softban') {
  client.commands.get('softban').run(message, args);
  }
  if (command === 'clear') {
  client.commands.get('clear').run(message, args);
  } else if (command === 'trivia') {
  client.commands.get('trivia').run(client, message, args);
  }
  if (command === 'fliptext') {
  client.commands.get('fliptext').run(message, args);
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
  } else if (command === 'kill') {
  client.commands.get('kill').run(client, message, args);
  }
  if (command === "botinfo") {
  client.commands.get("botinfo").run(client, message, args);
  } else if (command === "createrole") {
  client.commands.get("createrole").run(client, message, args);
  }
  if (command === 'helpconfig') {
  client.commands.get('helpconfig').run(client, message, args);
  } else if (command === 'helpimage') {
  client.commands.get('helpimage').run(client, message, args);
  }
  if (command === 'poll') {
  client.commands.get('poll').run(client, message, args);
  } else if (command === 'nickname') {
  client.commands.get('nickname').run(client, message, args);
  }
  if (command === 'reverse') {
  client.commands.get('reverse').run(client, message, args);
  } else if (command === 'yomama') {
  client.commands.get('yomama').run(client, message, args);
  }
  if (command === 'howgay') {
  client.commands.get('howgay').run(client, message, args);
  } else if (command === 'clap') {
  client.commands.get('clap').run(client, message, args);
  }
  if (command === 'vaportext') {
  client.commands.get('vaportext').run(client, message, args);
  } else if (command === 'slap') {
  client.commands.get('slap').run(client, message, args);
  }
  if (command === 'urban') {
  client.commands.get('urban').run(client, message, args);
  } else if (command === 'illegal') {
  client.commands.get('illegal').run(client, message, args);
  }
  if (command === 'scroll') {
  client.commands.get('scroll').run(client, message, args);
  } else if (command === 'facts') {
  client.commands.get('facts').run(client, message, args);
  }
  if (command === 'pornhub') {
  client.commands.get('pornhub').run(client, message, args);
  } else if (command === 'drake') {
  client.commands.get('drake').run(client, message, args);
  }
  if (command === 'didyoumean') {
  client.commands.get('didyoumean').run(client, message, args);
  } else if (command === 'achievement') {
  client.commands.get('achievement').run(client, message, args);
  }
  if (command === 'challenge') {
  client.commands.get('challenge').run(client, message, args);
  } else if (command === 'textimage') {
  client.commands.get('textimage').run(client, message, args);
  }
  if (command === 'amiajoke') {
  client.commands.get('amiajoke').run(client, message, args);
  } else if (command === 'bad') {
  client.commands.get('bad').run(client, message, args);
  }
  if (command === 'penis') {
  client.commands.get('penis').run(client, message, args);
  } else if (command === 'jokeoverhead') {
  client.commands.get('jokeoverhead').run(client, message, args);
  }
  if (command === 'dab') {
  client.commands.get('dab').run(client, message, args);
  } else if (command === 'time') {
  client.commands.get('time').run(client, message, args);
  }
  if (command === 'newtext') {
  client.commands.get('newtext').run(client, message, args);
  } else if (command === 'newvoice') {
  client.commands.get('newvoice').run(client, message, args);
  }
  if (command === 'delchannel') {
  client.commands.get('delchannel').run(client, message, args);
  } else if (command === 'emojiid') {
  client.commands.get('emojiid').run(client, message, args);
  }
  if (command === 'hack') {
  client.commands.get('hack').run(client, message, args);
  } else if (command === 'spam') {
  client.commands.get('spam').run(client, message, args);
  }
  if (command === 'meme') {
  client.commands.get('meme').run(client, message, args);
  } else if (command === 'hug') {
  client.commands.get('hug').run(client, message, args);
  }
  if (command === 'voicekick') {
  client.commands.get('voicekick').run(client, message, args);
  } else if (command === 'greentext') {
  client.commands.get('greentext').run(client, message ,args);
  }
  if (command === 'memberinfo') {
  client.commands.get('memberinfo').run(client, message, args);
  } else if (command === 'respect') {
  client.commands.get('respect').run(client, message, args);
  }
  if (command === 'sacrifice') {
  client.commands.get('sacrifice').run(client, message, args);
  } else if (command === 'orangetext') {
  client.commands.get('orangetext').run(client, message, args);
  }
  if (command === 'weather') {
  client.commands.get('weather').run(client, message, args);
  } else if (command === 'trash') {
  client.commands.get('trash').run(client, message, args);
  }
  if (command === 'lock') {
  client.commands.get('lock').run(client, message, args);
  } else if (command === 'unlock') {
  client.commands.get('unlock').run(client, message, args);
  }
  if (command === 'delrole') {
  client.commands.get('delrole').run(client, message, args);
  } else if (command === 'joke') {
  client.commands.get('joke').run(client, message, args);
  }
  if (command === 'emoji') {
  client.commands.get('emoji').run(client, message, args);
  } else if (command === 'clyde') {
  client.commands.get('clyde').run(client, message, args);
  }
  if (command === 'google') {
  client.commands.get('google').run(client, message, args);
  } else if (command === 'gstart') {
  client.commands.get('gstart').run(client, message, args);
  }
  if (command === 'servericon') {
  client.commands.get('servericon').run(client, message, args);
  } else if (command === 'youtube') {
  client.commands.get('youtube').run(client, message ,args);
  }
  if (command === 'partnerships') {
  client.commands.get('partnerships').run(client, message, args);
  } else if (command === 'timedlockdown') {
  client.commands.get('timedlockdown').run(client, message, args);
  }
  if (command === 'esay') {
  client.commands.get('esay').run(client, message, args);
  } else if (command === 'suggestion') {
  client.commands.get('suggestion').run(client, message, args);
  }
  if (command === 'wiki') {
  client.commands.get('wiki').run(client, message, args);
  } else if (command === 'report') {
  client.commands.get('report').run(client, message, args);
  }
});

client.login(process.env.token);
