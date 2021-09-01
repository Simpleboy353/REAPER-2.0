const Discord = module.require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
  name: "ttt",
  description: "Tic Tac Toe in discord!",
  run: async (client, message, args) => {
    simplydjs.tictactoe(message)
  },
};
