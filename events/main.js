const {
  Message,
  Client,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require("discord.js");
const database = require("../models/user");
const remindDatabase = require("../models/remind");
const ms = require("ms");
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
    } else if (message.content.toLocaleLowerCase().startsWith("n to")) {
      const collector = message.channel.createMessageCollector({
        filter: (msg) => msg.author.id === "770100332998295572",
        time: 1000 * 60 * 3,
      });

      collector.on("collect", async (msg) => {
        if (msg.content.includes("for your next tower challenge")) {
          collector.stop();
          return;
        }

        if (msg.content.includes("Rewards")) {
          const confirm = await message.channel.send({
            content: `${message.author.toString()} do you want me to remind you when you can run the **Tower** command again?\n\nUse the buttons.`,
            components: [
              new MessageActionRow().addComponents([
                new MessageButton()
                  .setLabel("Sure")
                  .setStyle("SUCCESS")
                  .setCustomId("yes-tower"),
                new MessageButton()
                  .setLabel("Nope")
                  .setStyle("DANGER")
                  .setCustomId("no-tower"),
              ]),
            ],
          });

          const confColl = confirm.createMessageComponentCollector({
            filter: (b) => {
              if (b.user.id !== message.author.id) {
                b.reply({
                  content: "Not for you.",
                  ephemeral: true,
                });
                return false;
              } else return true;
            },
            time: 30 * 1000,
          });

          confColl.on("collect", async (btn) => {
            const id = btn.customId;

            if (id == "yes-tower") {
              confirm.edit({
                content: `${message.author.toString()} do you want me to remind you when you can run the **Tower** command again?\n\nUse the buttons.`,
                components: [
                  new MessageActionRow().addComponents([
                    new MessageButton()
                      .setLabel("Sure")
                      .setStyle("SUCCESS")
                      .setCustomId("yes-tower")
                      .setDisabled(),
                    new MessageButton()
                      .setLabel("Nope")
                      .setStyle("DANGER")
                      .setCustomId("no-tower")
                      .setDisabled(),
                  ]),
                ],
              });

              btn.reply({
                embesd: [
                  new MessageEmbed()
                    .setTitle("CONFIRMED")
                    .setColor("GREEN")
                    .setDescription(
                      `Noted, you will reminded <t:${(
                        (new Date().getTime() + require("ms")("6h")) /
                        1000
                      ).toFixed(0)}:R>!`
                    )
                    .setTimestamp()
                    .setFooter({
                      iconURL: message.author.displayAvatarURL(),
                      text: message.author.tag,
                    }),
                ],
              });
              let dbUser = await remindDatabase.findOne({
                userId: message.author.id,
              });
              if (!dbUser) {
                dbUser = new remindDatabase({
                  userId: message.author.id,
                });
              }

              dbUser.tower = new Date().getTime() + ms("6h");
              dbUser.save();
            } else {
            }
          });
        }
      });
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
