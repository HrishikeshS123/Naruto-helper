const { Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    message.reply({
      embeds: [
        new MessageEmbed().setDescription(
          `\`\`\`xml\n<Ping: ${message.client.ws.ping}>\n\`\`\``
        ),
      ],
    });
  },
};
