const { Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    if (!message.author.bot) return;
    if (message.author.id !== "770100332998295572") return;
    if (!message.embeds[0] || !message.embeds[0].title) return;
    const title = message.embeds[0].title;

    if (title.includes("balance")) {
      await message.react("🔢");
      const collector = message.createReactionCollector({
        filter: (r, u) => r.emoji.name === "🔢" && !u.bot,
        max: 1,
      });

      collector.on("collect", async (reaction) => {
        const ryo = message.embeds[0].description
          .split("\n")
          .join(" ")
          .replaceAll("*", "")
          .split("S")
          .join(" ")
          .split(": ")[1]
          .split("  ")[0];
        const tix = message.embeds[0].description
          .split("\n")
          .join(" ")
          .replaceAll("*", "")
          .split("We")[0]
          .split("s: ")[1];

        const embed = new MessageEmbed()
          .setTitle("Balance")
          .setDescription("**This is what you can do \nwith your balance:**")
          .addField("Pulls", Math.floor(ryo / 300).toLocaleString(), true)
          .addField(
            "Special pulls",
            Math.floor(tix / 500).toLocaleString(),
            true
          )
          .setColor("GOLD")
          .setFooter({ text: message.embeds[0].title });

        await message.reply({
          embeds: [embed],
        });
      });
    }
  },
};
