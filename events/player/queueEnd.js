
module.exports = async(queue, client) => {

      return client.say.queueMessage(client, queue, "No more songs to play. Left the voice channel.");
};