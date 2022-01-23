const { Message, Client } = require("discord.js");
const database = require("../models/user");
let alreadyBeingReminded = [];
module.exports = {
  name: "messageCreate",
  once: false,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    if (
      message.content.toLowerCase().startsWith("n m") &&
      !alreadyBeingReminded.includes(`${message.author.id}.m`)
    ) {
      alreadyBeingReminded.push(`${message.author.id}.m`);
      addStat(message.author.id, "m");
      await sleep(60000);
      message.reply("You can run the **Mission** command again!");
      alreadyBeingReminded = alreadyBeingReminded.filter(
        (value) => value !== `${message.author.id}.m`
      );
    } else if (
      message.content.toLocaleLowerCase().startsWith("n r") &&
      !alreadyBeingReminded.includes(`${message.author.id}.r`)
    ) {
      alreadyBeingReminded.push(`${message.author.id}.r`);
      addStat(message.author.id, "r");
      await sleep(600000);
      message.reply("You can run the **Report** command again!");
      alreadyBeingReminded = alreadyBeingReminded.filter(
        (val) => val !== `${message.author.id}.r`
      );
    }
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const addStat = async (userId, where) => {
  let dbUser = await database.findOne({
    userId,
  });

  if (!dbUser) {
    dbUser = new database({
      userId,
    });
  }

  if (where === "m") {
    dbUser.stats.reminders.mission++;
  } else if (where === "r") {
    dbUser.stats.reminders.report++;
  }

  dbUser.save();
};
