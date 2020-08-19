// this is here for nice requires in nodejs
// all you need to do is require this ("var x = require('discord-emoji')") and then you have x.food.pizza

module.exports = {
    activity: require('./activity.json'),
    emoji: require('./emoji.json'),
    flags: require('./flags.json'),
    food: require('./food.json'),
    nature: require('./nature.json'),
    objects: require('./objects.json'),
    people: require('./people.json'),
    symbols: require('./symbols.json'),
    travel: require('./travel.json')
}
