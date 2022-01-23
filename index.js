const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});
const fs = require("fs");
const mongoose = require("mongoose");
require("http").createServer().listen();
mongoose.connect(process.env.mongo_path);
client.commands = {
  prefix: "nh ",
  commands: new Collection(),
  cooldowns: new Collection(),
};

// Command Handling

const { cooldowns } = client.commands;
const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandFile = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFile) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.commands.set(command.name, command);
  }
}

// Command Handling

// Event Handling

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Event Handling

client.on("ready", () => {
  console.log("Ready!");
  client.user.setActivity({
    name: `nh help`,
    type: "LISTENING",
  });
});

client.on("messageCreate", async (message) => {
  if (!message.content.toLowerCase().startsWith(client.commands.prefix)) return;
  if (message.author.bot) return;

  const args = message.content
    .slice(client.commands.prefix.length)
    .trim()
    .split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.commands.get(commandName) ||
    client.commands.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 0) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply({
        embed: new MessageEmbed()
          .setDescription(
            `:x: You have to wait for **${Math.ceil(
              timeLeft
            )} seconds** before running this command again!`
          )
          .setColor("RED"),
      });
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  if (command.args && !args.length) {
    let reply = "You did not provide any arguments!";

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${client.commands.prefix}${command.name} ${command.usage}\``;
    }
    return message.reply({
      content: reply,
    });
  }

  try {
    command.execute(message, args, client);
  } catch (e) {
    console.log(e);

    message.reply("There was an error while executing this command!");
  }
});

client.login(process.env.token);
