const Discord = module.require("discord.js");

module.exports = {
    name: "react",
    description: "React on the last Message sent in the channel",
    run: async(client, message, args) => {
    const { text } = args;
    const m = args.message;

    for (const m of text.toLowerCase()) {
        if (c in map) {
        try {
            await m.react(map[c])
        } catch (err) {}
    }
    }
    }
}

const map = {
    a: 'A',
    b: 'B',
    c: 'C',
    d: 'D',
    e: 'E',
    f: 'F',
    g: 'G',
    h: 'H',
    i: 'I',
    j: 'J',
    k: 'K',
    l: 'L',
    m: 'M',
    n: 'N',
    o: 'O',
    p: 'P',
    q: 'Q',
    r: 'R',
    s: 'S',
    t: 'T',
    u: 'U',
    v: 'V',
    w: 'W',
    x: 'X',
    y: 'Y',
    z: 'Z',
    0: '0⃣',
    1: '1⃣',
    2: '2⃣',
    3: '3⃣',
    4: '4⃣',
    5: '5⃣',
    6: '6⃣',
    7: '7⃣',
    8: '8⃣',
    9: '9⃣',
    '#': '#⃣',
    '*': '*⃣',
    '!': '❗',
    '?': '❓',

};