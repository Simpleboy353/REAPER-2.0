const Discord = require('discord.js')

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "help_menu") {

        let msg = await interaction.channel.messages.fetch(interaction.message.id)

        if (interaction.values[0] === "settings") {

          await interaction.deferUpdate();

            const settingsEmbed = new Discord.EmbedBuilder()
        .setTitle("Config Commands")
        .setDescription(
          "`autorole`, `antilink`, `joinchannel`, `joinmessage`, `leavechannel`, `leavemessage` `prefix`"
        )
        .setColor("Random");

      await msg.edit({ embeds: [settingsEmbed] });

        } else if (interaction.values[0] === "fun") {

          await interaction.deferUpdate();

            const funEmbed = new Discord.EmbedBuilder()
        .setTitle("Fun Commands")
        .setDescription(
          "`8ball`, `ascii`, `clap`, `clyde`, `cowsay`, `dab`, `emojify`, `fliptext`, `greentext`, `hack`, `howgay`, `hug`, `joke`, `kill`, `orangetext`, `pokeimg`, `pp`, `respect`, `reverse`, `roast`, `slap`, `urban`, `vaportext`, `yomama`"
        )
        .setColor("Random");

        await msg.edit({ embeds: [funEmbed] });

        } else if (interaction.values[0] === "image") {

          await interaction.deferUpdate();

            const imageEmbed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setTitle("Image Commands")
            .setDescription(
              "`afraid`, `alert`, `amazeme`, `biden`,`changemymind`, `clyde`, `cryingfloor`, `disastergirl`, `dockofshame`, `doge`, `drake`, `facepalm`, `feelsgood`, `illegal`, `keanu`, `trigger`, `trumptweet`, `wasted`, `wideavatar`"
            )

            await msg.edit({ embeds: [imageEmbed]})

            } else if (interaction.values[0] === "music") {

              await interaction.deferUpdate();
 
         const musicEmbed = new Discord.EmbedBuilder()
         .setTitle(`Music Commands`)
         .setDescription("`clearqueue`, `filter`, `filter list`, `info`, `jump`, `loop`, `lyrics`, `move`, `mute`, `pause`, `play`, `previoustrack`, `queue`, `remove`, `resume`, `unmute`, `volume`, `youtube`\n\n```Note: Music commands work only with slash commands!```")
         .setColor("BLUE")
 
         await msg.edit({ embeds: [musicEmbed] })

        } else if (interaction.values[0] === "info") {

          await interaction.deferUpdate();

            const infoEmbed = new Discord.EmbedBuilder()
        .setTitle("Info Commands")
        .setDescription(
          "`botinfo`, `emojiid`, `help`, `invite`, `ping`, `policy`, `report`, `userinfo`, `userid`, `serverinfo`, `suggest`"
        )
        .setColor("Random");

        await msg.edit({ embeds: [infoEmbed] })

        } else if (interaction.values[0] === "moderation") {

          await interaction.deferUpdate();

            const modEmbed = new Discord.EmbedBuilder()
            .setTitle("Moderation Commands")
            .setDescription(
              "`kick`, `ban`, `softban`, `mute`, `unmute`, `tempmute`"
            )
            .setColor("Random");

            await msg.edit({ embeds: [modEmbed] })

        } else if (interaction.values[0] === "nsfw") {

          await interaction.deferUpdate();

            if (!interaction.channel.nsfw) {
              const denyEmbed = new Discord.EmbedBuilder()
              .setDescription("You can view NSFW commands only in a NSFW channel!")
              .setColor("RED")

              return msg.edit({ embeds: [denyEmbed] })
            }

              const nsfwEmbed = new Discord.EmbedBuilder()
              .setTitle("NSFW Commands")
              .setDescription(
                  "`4k`, `anal`,`asian`, `ass`, `blowjob`, `boobs`, `cumsluts`, `erokemo`, `danbooru`, `kitsune`, `hentai`, `hentaiass`, `hentaithigh`, `gonewild`, `milf`, `feetgif`, `pussy`, `porngif`, `urban`, `thigh`, `lewd`"
              )
              .setColor("Random");

              await msg.edit({ embeds: [nsfwEmbed] })

        } else if (interaction.values[0] === "utility") {

          await interaction.deferUpdate();

            const utilityEmbed = new Discord.EmbedBuilder()
        .setTitle("Utility Commands")
        .setDescription(
          "`avatar`, `animesearch`, `announce`, `clear`, `createrole`, `delchannel`, `delrole`, `enlargemoji`, `esay`, `giverole`, `google`, `imdb`, `lock`, `newtext`, `newvoice`, `nickname`, `poll`, `removerole`, `say`, `servericon`, `serverinfo`, `suggestion`, `translate`, `unlock`, `weather`, `wiki`"
        )
        .setColor("Random");

        await msg.edit({ embeds: [utilityEmbed] })

      } else if (interaction.values[0] === "game") {

        await interaction.deferUpdate();

          const gameEmbed = new Discord.EmbedBuilder()
        .setTitle("Game Commands")
        .setDescription(
          "`catchthefish`, `football`, `gunfight`"
        )
        .setColor("Random");

        await msg.edit({ embeds: [gameEmbed] })
      } else if (interaction.values[0] === "activities") {

        await interaction.deferUpdate();
            
        const activityEmbed = new Discord.EmbedBuilder()
        .setTitle("Activity Commands")
        .setDescription(
          "`awkword`, `betrayal`, `chess`, `doodlecrew`, `fishington`, `lettertile`, `poker`, `spellcast`, `youtube`"
        )
        .setColor("Random")

        await msg.edit({ embeds: [activityEmbed]})
      }
    }
}
