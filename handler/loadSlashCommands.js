
function loadSlashCommands(client) {
    const fs = require("fs");
    const ascii = require("ascii-table");

    let slash = []

    const table = new ascii().setHeading(" Slash Commands", "Load Status");
  
    const commandFolders = fs.readdirSync("./SlashCommands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./SlashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../SlashCommands/${folder}/${file}`);
        if (command.name) {
          client.slash.set(command.name, command);
          slash.push(command)
          table.addRow(file, "✔️");
        } else {
          table.addRow(
            file,
            "❌ => Missing a help.name or help.name is not in string"
          );
          continue;
        }
      }
      console.log(table.toString());
    }
    client.on("ready", async() => {
      await client.application.commands.set(slash)
    })
  }
  
  module.exports = {
    loadSlashCommands,
  };
  