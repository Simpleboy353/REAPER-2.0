const Discord = module.require("discord.js");
const { Connect4 } = require('discord-gamecord')

module.exports = {
  name: "connect4",
  description: "connect4 in discord!",
  run: async (client, message, args) => {
          new Connect4({
        message: message,
        opponent: message.mentions.users.first(),
        embed: {
          title: 'Connect 4',
          color: '#5865F2',
        },
        emojis: {
          player1: '🔵',
          player2: '🟡'
        },
        turnMessage: '{emoji} | Its now **{player}** turn!',
        winMessage: '{emoji} | **{winner}** won the game!',
        gameEndMessage: 'The game went unfinished :(',
        drawMessage: 'It was a draw!',
        askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Connect 4!',
        cancelMessage: 'Looks like they refused to have a game of Connect4. \:(',
        timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
      }).startGame();
  },
};
