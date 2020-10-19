const discordEmoji = require('discord-emoji');
const emoji = {};
const cooldown = new Set();
Object.values(discordEmoji).forEach(value => {
    Object.keys(value).forEach(key => {
        emoji[key] = value[key];
    });
});

const mappings = {
    'a': [':regional_indicator_a:', ':a:'],
    'b': [':regional_indicator_b:', ':b:'],
    'c': [':regional_indicator_c:'],
    'd': [':regional_indicator_d:'],
    'e': [':regional_indicator_e:'],
    'f': [':regional_indicator_f:'],
    'g': [':regional_indicator_g:', ':compression:'],
    'h': [':regional_indicator_h:'],
    'i': [':regional_indicator_i:', ':information_source:'],
    'j': [':regional_indicator_j:'],
    'k': [':regional_indicator_k:'],
    'l': [':regional_indicator_l:'],
    'm': [':regional_indicator_m:', ':m:'],
    'n': [':regional_indicator_n:'],
    'o': [':regional_indicator_o:', ':o2:', ':o:'],
    'p': [':regional_indicator_p:', ':parking:'],
    'q': [':regional_indicator_q:'],
    'r': [':regional_indicator_r:'],
    's': [':regional_indicator_s:'],
    't': [':regional_indicator_t:', ':cross:'],
    'u': [':regional_indicator_u:'],
    'v': [':regional_indicator_v:'],
    'w': [':regional_indicator_w:'],
    'x': [':regional_indicator_x:', ':heavy_multiplication_x:', ':x:', ':negative_squared_cross_mark:'],
    'y': [':regional_indicator_y:'],
    'z': [':regional_indicator_z:'],
    '0': [':zero:'],
    '1': [':one:'],
    '2': [':two:'],
    '3': [':three:'],
    '4': [':four:'],
    '5': [':five:'],
    '6': [':six:'],
    '7': [':seven:'],
    '8': [':eight:'],
    '9': [':nine:'],
    '!': [':exclamation:', ':grey_exclamation:'],
    '?': [':question:', ':grey_question:'],
    '*': [':asterisk:', ':eight_spoked_asterisk:'],
    '#': [':hash:'],
    '$': [':heavy_dollar_sign:']
};

function clone(object) {
    const newObject = {};

    Object.keys(object).forEach(key => {
        if (object[key] instanceof Array) {
            newObject[key] = new Array(...object[key]);
        } else {
            newObject[key] = object[key];
        }
    });

    return newObject;
}

function emojiToUnicode(input) {
    if (/^:regional_indicator_[a-z]:$/.test(input)) {
        return String.fromCharCode(55356) + String.fromCharCode(56806 + input.substr(20, 1).charCodeAt(0) - 97);
    }
    return emoji[input.slice(1, -1)];
}

function react(message, remaining, allowedMappings) {
    if (remaining.length < 1) {
        // We're out of stuff
        return;
    }

    const char = remaining.shift().toLowerCase();

    if (!char) {
        return;
    }

    if (!allowedMappings[char]) {
        // Not a usable char
        return;
    }

    const next = allowedMappings[char].shift();
    if (!next) {
        // We have no more mappings available
        return;
    }

    message.react(emojiToUnicode(next)).then(() => {
        react(message, remaining, allowedMappings);
    });
}
module.exports = {
    name: "react",
    description: "React to messages",
    run: async (client, message, args) => {
    try {
        var Discord = require('discord.js')
        if (cooldown.has(message.author.id)) {
            let cooldownemb = new Discord.RichEmbed()
                .setAuthor(`${message.author.username} Cooldown..`, message.author.displayAvatarURL)
                .setDescription(`You need to wait 10 seconds!`)
                .setColor(`RED`)
                .setFooter(`This message will be deleted in 10 seconds..`)
            return message.channel.send(cooldownemb).then(message => {
                message.delete(10000)
            })

        }
        cooldown.add(message.author.id);

        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 10000);

        if (args.length < 1) {
            throw 'You must provide some text to react with.';
        }

        const fetchOptions = { limit: 1 };
        if (args[1]) {
            if (!/\d{18}/.test(args[1])) {
                throw `${args[1]} is not a valid message ID!`;
            }

            fetchOptions.around = args[1];
        } else {
            fetchOptions.before = message.id;
        }

        message.channel.messages.fetch(fetchOptions).then(messages => {
            if (messages.length < 1) {
                return message.error('Failed to find the message.');
            }

            const target = messages.first();
            const allowedMappings = clone(mappings);

            // Remove current reactions from allowed emojis
            Array.from(target.reactions).forEach(reaction => {
                const emoji = reaction.toString();
                for (const key in allowedMappings) {
                    const index = allowedMappings[key].indexOf(emoji);
                    if (index > -1) {
                        allowedMappings[key].splice(index, 1);
                    }
                }
            });

            message.delete();

            react(target, args[0].split(''), allowedMappings);
        }).catch(message.error);
    } catch (err) {
        const errorlogs = client.channels.cache.get('747750993583669258')
        message.channel.send(`${err}`)
        errorlogs.send(`Error on react commands!\n\nError:\n\n ${err}`)
    }
}
};
