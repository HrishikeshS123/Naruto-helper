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

    const title = message?.embeds[0].title;

    if (title.includes("balance")) {
      message.react("🔢");
      const collector = message.createReactionCollector({
        filter: (r) => r.emoji.name === "🔢",
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
          .setDescription("**This is what you can do with your balance:**")
          .addField("Pulls", Math.floor(ryo / 300).toLocaleString(), true)
          .addField(
            "Special pulls",
            Math.floor(tix / 500).toLocaleString(),
            true
          );
      });
    }
  },
};
