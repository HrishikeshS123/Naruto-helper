const { Client } = require("discord.js");
const RDB = require("../models/remind");
let rcounter = 0;
module.exports = {
  name: "tick",
  /**
   * @param {Client} client
   */
  async execute(client) {
    // Incrementing values
    rcounter++;
    // Incrementing values

    //Tower and Adventure
    if (rcounter == 30) {
      rcounter = 0;
      const towerQ = await RDB.find({
        tower: {
          $lt: new Date().getTime(),
        },
        "reminded.tower": false,
      });

      if (towerQ.length) {
        for (const reminder of towerQ) {
          const user = await client.users.fetch(reminder.userId);

          await user.send(
            `Hey ${user.toString()}, you can run the **Tower** command again!`
          );
          reminder.reminded.tower = true;
          reminder.save();
        }
      }
    }
    //Tower and Adventure

    setTimeout(() => {
      client.emit("tick");
    }, 1000);
  },
};
