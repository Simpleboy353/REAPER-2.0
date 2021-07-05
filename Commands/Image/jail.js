
const snek = require('snekfetch');
const fsn = require('fs-nextra');
module.exports = {
  name: "jail",
  description: "Image Manipulation Command",
  botPerms: ["ATTTACH_FILES"],
  run: async (client, message, args) => {
    var state = "enabled";
    if (state === "disabled") {
      return message.channel.send(
        "The Command has been disabled. Contact Bot Owner for More Info!"
      );
    }
    const { Canvas } = require("canvas-constructor");
    if (message.mentions.users.size < 1)
      return message.channel.send(
        "You didn't mention a user to put them behind bars"
      );
    const getSlapped = async (person) => {
      const plate = await fsn.readFile("./assets/plate_jail.png");
      const png = person.replace(".gif", ".png");
      const { body } = await snek.get(png);
      return new Canvas(250, 250)
        .resetTransformation()
        .addImage(body, 0, 0, 250, 250)
        .addImage(plate, 0, 0, 250, 250)
        .toBuffer();
    };
    try {
      const person = message.mentions.users.first().avatarURL;
      const result = await getSlapped(person);
      await message.channel.send({
        files: [{ attachment: result, name: "jailed.png" }],
      });
    } catch (error) {
      throw error;
    }
  },
};