const { Client, Intents } = require("discord.js")
const client = new Client({
    intents: ['GUILD_MESSAGES', 'GUILD_MEMBERS']
})

client.on("ready", () => {
    console.log("Ready!")
})

client.on("messageCreate", async (message) => {
    console.log(message.content)
})

client.login(process.env.token)