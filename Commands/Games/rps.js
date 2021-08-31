const Discord = module.require("discord.js");
const simplydjs = require("simply-djs");

module.exports = {
  name: "rps",
  description: "Rock paper scissors in discord!",
  run: async (client, message, args) => {
    simplydjs.rps(message)
  },
};
