module.exports = async(queue, client) => {
    return client.say.queueMessage(client, queue, "Music stopped as I had been disconnected from the voice channel.", "RED");
  };