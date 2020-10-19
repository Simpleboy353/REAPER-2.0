const { readdirSync } = require("fs")
const ascii = require("ascii-table")
const asciiTable = require("ascii-table");

const table = new ascii().setHeading('Commands', 'Load Status');

module.exports = (client) => {
    readdirSync('./Commands/').forEach(dir => {
        const commands = readdirSync(`./Commands/${dir}/`).filter(f => f.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../Commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✔️')
            } else {
                table.addRow(file, "❌ => Missing a help.name or help.name is not in string")
                continue;
            }
            if (pull.aliases && Array.isArray(pull))
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());
}
