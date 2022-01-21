const { Message, Client } = require("discord.js");

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
