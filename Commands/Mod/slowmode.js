const Discord = module.require("discord.js");

module.exports = {
    name: "slowmode",
    description: "Start slowmode in a channel",
    run: async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send("You don't have enough Permissions!")            
        }
        const amount = parseInt(args[0])
        if (!amount) {
            return message.channel.send("Enter a valid time period in `Seconds(s)`, `Minutes(m)` or `Hours(h)`!!")
        }
        if (args[0] === amount + "s") {
            message.channel.setRateLimitPerUser(amount)
        if (amount > 1 ) {
            message.channel.send("Slowmode is set for " + amount + " seconds!")
            return }
        } 
        else {message.channel.send("Slowmode is set for " + amount + " second!");
        return
        }
        if (args[0] === amount + "m") {
            message.channel.setRateLimitPerUser(amount * 60)
            if (amount > 1) {
                message.channel.send("Slowmode is set for " + amount + " minutes!")
                return
            } else {
                message.channel.send("Slowmode is set for " + amount + " minute!")
            return }
        } if (args[0] === amount + "h") {
            message.channel.setRateLimitPerUser(amount * 60 * 60)
            if (amount > 1 ) {
                message.channel.send("Slowmode is set for " + amount + " hours!")
                return
            } else {
                message.channel.send("Slowmode is set for " + amount + " hour!")
            return }
        } else {
            message.channel.send("You can only set slowmode in `Seconds(s)`, `Minutes(m)` or `Hours(h)`!")
        }
    }
}