const { canModifyQueue } = module.require("../util/EvobotUtil");

module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  run: async(message) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`Paused the music.`).catch(console.error);
    }
  }
};
