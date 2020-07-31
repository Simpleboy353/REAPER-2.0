const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "piratespeak",
    description: "Fun Command",
    run: async(client, message, args) => {
        if (!args.length) {
            return message.reply("Command Usage: `piratespeak <Text>`")
          }
      
          const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("__**Pirate Speak**__")
            .setDescription(translate(args.join(' ')))
          await message.channel.send({ embed });
        },
      
        translate(text) {
          let translatedText = '';
          let word = '';
          for (let i = 0; i < text.length; i += 1) {
            let character = text[i];
            if (isLetter(character)) {
              word += character;
            } else {
              if (word !== '') {
                let pirateWord = translateWord(word);
                translatedText += pirateWord;
                word = '';
              }
              translatedText += character; 
            }
          }
          if (word !== '') translatedText += translateWord(word);
          return translatedText;
        },
        
        isLetter(character) {
          if (character.search(/[a-zA-Z'-]/) === -1) return false;
          return true;
        },
        
        translateWord(word) {
          let pirateWord = dictionary[word.toLowerCase()];
          if (pirateWord === undefined) return word;
          return applyCase(word, pirateWord);
        },
        
        applyCase(wordA, wordB) {
          if (wordA.length === 1 && wordB.length !== 1) return wordB;
          if (wordA === wordA.toUpperCase()) return wordB.toUpperCase();
          if (wordA === wordA.toLowerCase()) return wordB.toLowerCase();
        
          let firstChar = wordA.slice(0, 1);
          let otherChars = wordA.slice(1);
          if (firstChar === firstChar.toUpperCase() && otherChars === otherChars.toLowerCase()) {
            return wordB.slice(0, 1).toUpperCase() + wordB.slice(1).toLowerCase();
          }
        
          return wordB;
    }
}