const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js")
let os = require('os')
let cpuStat = require("cpu-stat")
var prettyMs = require('pretty-ms');
var oss = require('os-utils');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

module.exports ={
    name: "stats",
    descriptiom: "Get Inifnity's Stats",
    run: async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        const cmdFiles = await readdir("./Commands/");
        let cpuLol;
        cpuStat.usagePercent(function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            let bicon = client.user.displayAvatarURL;
            const RynEmb = new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription("Infinity Bot's Stats:")
                .setTimestamp()
                .setThumbnail(bicon)
                .setColor("RANDOM")
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                .addField(":floppy_disk: Memory usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                .addField(":minidisc: CPU usage", `\`${percent.toFixed(2)}%\``, true)
                .addField("CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``, true)
                .addField(":computer: System", `\`${os.arch()}\``, true)
                .addField(":desktop: Platform", `\`\`${os.platform()}\`\``, true)
                .addField("👥 Users", `${client.users.cache.size}`, true)
                .addField("Servers", `${client.guilds.cache.size}`, true)
                .addField("Channels", `${client.channels.cache.size}`, true)
                .addField("Commands Count", "`\`143`\`", true)
                .addField("Library", `\`Discord.js\``, true)
                .addField("Library Version", `v${version}`, true)
                .addField(":book: Node Version", `${process.version}`, true)
                .addField(":stopwatch: Uptime & Ping", `${duration} / ${Math.round(client.ws.ping)}ms`, true)
                //.addField(":stopwatch: Server uptime", `${prettyMs(oss.sysUptime())}`, true)
                .addField(":calendar_spiral: Created On", client.user.createdAt, true)
            message.channel.send(RynEmb)
        });
    } catch (err) {
        const errorlogs = client.channels.cache.get('747750993583669258')
        message.channel.send(`Whoops, We got a error right now! This error has been reported to Support center!`)
        errorlogs.send(`Error on stats commands!\n\nError:\n\n ${err}`)
    }
}
};
