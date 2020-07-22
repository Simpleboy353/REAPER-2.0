module.exports = {
    name: "say",
    description: "Make the bot say your message",
    execute(message, args) {
        message.channel.send(args.join(" "), { allowedMentions: { parse:["users"] } });
    }
}