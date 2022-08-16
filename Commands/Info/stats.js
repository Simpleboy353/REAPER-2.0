const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

module.exports = {
  name: "stats",
  descriptiom: "Get Inifnity's Stats",
  botPerms: ["EmbedLinks"],
  run: async (client, message, args, level) => {
    // eslint-disable-line no-unused-vars
    try {
      const cmdFiles = await readdir("./Commands/");
      let cpuLol;
      cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(client.uptime)
          .format(" D [days], H [hrs], m [mins], s [secs]");
        let bicon = client.user.displayAvatarURL;
        const RynEmb = new Discord.EmbedBuilder()
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription("Infinity Bot's Stats:")
          .setTimestamp()
          .setThumbnail(bicon)
          .setColor("Random")
          .setFooter(
            `Requested by ${message.author.username}#${message.author.discriminator}`,
            message.author.displayAvatarURL
          )
          .addFields([
            {
            name: ":floppy_disk: Memory usage",
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(
              os.totalmem() /
              1024 /
              1024
            ).toFixed(2)} MB`
            },
          { name: ":minidisc: CPU usage", value: `\`${percent.toFixed(2)}%\`` },
          {
            name: "CPU",
            value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,
          },
          { name: ":computer: System", value: `\`${os.arch()}\`` },
          { name: ":desktop: Platform", value: `\`\`${os.platform()}\`\`` },
          { name: "👥 Users", value: `${client.users.cache.size}` },
          { name: "Servers", value:`${client.guilds.cache.size}` },
          { name: "Channels", value: `${client.channels.cache.size}` },
          { name: "Commands Count", value: `${client.commands.size}` },
          { name: "Library", value: `\`Discord.js\`` },
          { name: "Library Version", value: `v${version}` },
          { name: ":book: Node Version", value: `${process.version}` },
          {
            name: ":stopwatch: Uptime & Ping",
            value: `${duration} / ${Math.round(client.ws.ping)}ms`
          },
          //.addField(":stopwatch: Server uptime", `${prettyMs(oss.sysUptime())}`, true)
          {
            name: ":calendar_spiral: Created On",
            value: client.user.createdAt,
          }
        ]);
        message.channel.send({ embeds: [RynEmb] });
      });
    } catch (err) {
      const errorlogs = client.channels.cache.get("747750993583669258");
      message.channel.send(
        `Whoops, We got a error right now! This error has been reported to Support center!`
      );
      errorlogs.send(`Error on stats commands!\n\nError:\n\n ${err}`);
    }
  },
};
