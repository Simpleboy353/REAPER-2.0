module.exports = async(queue, error, client) => {

    client.say.queueMessage(client, queue, "An error occurred while playing. Sorry for the inconveniences.", "RED");

    return client.utils.sendErrorLog(client, { stack: `${error.message}`, name: "PLAYER_CONNECTION_ERROR", code: `${queue.id}` }, "error");
  }