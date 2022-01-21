const { Client, Intents } = require("discord.js")
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})

client.on("ready", () => {
    console.log("Ready!")
})

client.on("messageCreate", async (message) => {
    console.log(message.content)
})

client.login(process.env.token)