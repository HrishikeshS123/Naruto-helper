const { Message, MessageEmbed } = require("discord.js");
const Database = require("../../models/user");
module.exports = {
  name: "stats",
  /**
   * @param {Message} message
   */
  async execute(message) {
    const user = await Database.findOne({
      userId: message.author.id,
    });

    if (!user)
      return message.reply({
        embeds: [
          {
            description: "There are no stats about you to show.",
            color: "RED",
          },
        ],
      });

    const stats = {
      mission: user.stats.reminders.mission,
      report: user.stats.reminders.report,
      challenge: user.stats.reminders.challenge,
    };

    const statBed = new MessageEmbed()
      .setTitle("STATS")
      .setColor("ORANGE")
      .addField("Mission", stats.mission.toLocaleString(), true)
      .addField("Report", stats.report.toLocaleString(), true)
      .setFooter({
        iconURL: message.author.displayAvatarURL(),
        text: `${message.author.tag}`,
      })
      .setDescription("This command shows your stats!");

    return message.reply({
      embeds: [statBed],
    });
  },
};
