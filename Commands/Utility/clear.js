module.exports = {
  name: "clear",
  description: "delete the given number of messages",
  userPerms: ["MANAGE_MESSAGES"],
  botPerms: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
   
    const fetched = message.channel || message.mentions.members.first();
    let messageArray = message.content.split(" ");
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.channel.send(
        `${message.author.username}, you can only clear messages from 1-99`
      );
    } else if (amount <= 1 || amount > 100) {
      return message.channel.send(
        `${message.author.username}, you can only clear messages from 1-99`
      );
    }

    fetched.bulkDelete(amount, true);
    fetched.bulkDelete(amount);
  },
};
