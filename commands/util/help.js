const { Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  /**
   * @param {Message} message
   */
  async execute(message) {
    const helpEmbed = new MessageEmbed()
      .setTitle("❓ Help")
      .setDescription("Type **`nh help <command>`** for further help!")
      .addField("Stats", `\`stats\` & \`botstats\``)
      .addField("⚙️ Utility", `\`help\` & \`ping\``, false)
      .setFooter({
        iconURL: message.author.displayAvatarURL(),
        text: message.author.tag,
      })
      .setColor("GREEN")
      .setThumbnail(message.client.user.displayAvatarURL());

    return message.reply({ embeds: [helpEmbed] });
  },
};
