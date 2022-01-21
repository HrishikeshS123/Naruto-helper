const { Message } = require("discord.js");
module.exports = {
  name: "ping",
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    message.reply(`Pong! ${message.client.ws.ping}ms`);
  },
};
