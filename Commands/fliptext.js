const Discord = module.require("discord.js");
const flip = require("flip-text");

module.exports = {
    name: "fliptext",
    description: "Flip some text",
    usage: "fliptext <text>",
    type: "Fun",
    execute(message, args) {
  args.reverse();
  var flipped = [];
  
  args.forEach((arg) => {
      flipped.push(flip(arg));
  });
  
  message.channel.send(flipped.join(" "));
}
}