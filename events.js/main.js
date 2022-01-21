const { Message, Client } = require("discord.js");

module.exports = {
  name: "messageCreate",
  once: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    if (message.content.toLowerCase().startsWith("n m")) {
      await sleep(60000);
      message.reply("You can run the Mission command again!");
    }
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
