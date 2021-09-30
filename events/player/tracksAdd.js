module.exports = async(queue, tracks, client) => {

    return client.say.queueMessage(client, queue, `Tracks Enqueued ${tracks.length}\nSource: ${tracks.source}`);

};