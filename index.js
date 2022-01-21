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

client.login("OTMzNzU0MDk1NzcxMTkzMzk0.YemIRA.5cdJ3mDG1fb6RRfLdQ8pcqNcVT0")