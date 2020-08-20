module.exports = {
    name: "hello",
    description: "nothing",
    run: async(message) => {
        message.channel.send("Hello");
    }
}