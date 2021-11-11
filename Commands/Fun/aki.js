const express = require("express");
const app = express();
 
app.listen(() => console.log("💕💕💕💕"));
 
app.use('/ping', (req, res) => {
  res.send(new Date());
});

const { Client, MessageEmbed  } = require("discord.js"),
      {     prefix, token     } = require("./config"),
      {          Aki          } = require("aki-api"),
      emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"],
      Started = new Set();


new Client({messageCacheMaxSize: 50})
.on("ready", () => console.log(`Bot is Ready`))
.on("message", async message => {
if (message.author.bot || !message.guild) return;
if (message.content.startsWith(prefix + "start")) {
if(!Started.has(message.author.id))Started.add(message.author.id);
else return message.channel.send("**:x: | The game already started..**");
      const aki = new Aki("ar"); // Full languages list at: https://github.com/jgoralcz/aki-api
      await aki.start();
const msg = await message.channel.send(new MessageEmbed()
                                       .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
                                       .setColor("RANDOM")
                                       .setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `${x} | ${emojis[i]}`).join("\n")}`));
for(let emoji of emojis)await msg.react(emoji).catch(console.error);
const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id,{ time: 60000 * 6 });
      collector.on("collect", async (reaction, user) => {
      reaction.users.remove(user).catch(console.error);
if(reaction.emoji.name == "❌")return collector.stop();

await aki.step(emojis.indexOf(reaction.emoji.name));
if (aki.progress >= 70 || aki.currentStep >= 78) {
          await aki.win();
          collector.stop();
          message.channel.send(new MessageEmbed()
              .setTitle("Is this your character?")
              .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking as **#${aki.answers[0].ranking}**\n\n[yes (**y**) / no (**n**)]`)
              .setImage(aki.answers[0].absolute_picture_path)
              .setColor("RANDOM"));
message.channel.awaitMessages(response => ["yes","y","no","n"].includes(response.content.trim().toLowerCase()) &&
response.author.id == message.author.id, { max: 1, time: 30000, errors: ["time"] })
        .then(collected => {
           const content = collected.first().content.trim().toLowerCase();
              if (content == "y" || content == "yes")
                   return message.channel.send(new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Great! Guessed right one more time.")
                    .setDescription("I love playing with you!"));
              else 
                  return message.channel.send(new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Uh. you are win")
                    .setDescription("I love playing with you!"));
            });
          return;
        }
         msg.edit(new MessageEmbed()
                  .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
                  .setColor("RANDOM")
                  .setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `${x} | ${emojis[i]}`).join("\n")}`));
   });
  
  
collector.on("end",()=>{ Started.delete(message.author.id);
                         msg.delete({ timeout: 1000 }).catch(()=>{});
                       });   
