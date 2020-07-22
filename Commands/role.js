const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "createrole",
    description: "Create roles in your Server",
    run: async(client, message, args) => {
        if(args[0].toLowerCase()=='create'){
            let Rname= message.content.split(`${client.prefix}role create `).join("")
            let rColor;
            args.forEach(arg=>{
                if(args.startWith("#")){
                    rColor=arg
                }
            })
            if(!rName){
                return message.channel.send(`You did not specify a name for your role!`)
            }
            if(!rColor){
                return message.channel.send(`You did not specify a color for your role!`)
            }
            if(rColor=>16777215) return message.channel.send(`That hex color range was too big. Please keep it between o and 16777215`)
            if(rColor<=0) return message.channel.send(`That hex color range was too small. Please keep it between o and 16777215`)
            rName=rName.replace(`${rColor}`,``)
            let rNew = await message.guild.roles.create({
                data:{
                    name: rName,
                    color: rColor,
                }
            })
            const Embed = new MessageEmbed()
            .setTitle(`New Role`)
            .setDescription(`${message.author.username} has created a new role "${rName}" \nIt Hex Color code: ${rColor} \nIts ID: ${rNew.id}`)
            .setColor("RANDOM");
            message.channel.send(Embed);
        }
    }
}