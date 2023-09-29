require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { CheckStatus } = require("./util/check-status.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on("ready", (c) => {
    console.log(`${c.user.tag} is online!`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content === "Hi") message.reply("Hello! :smile:");
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "status") {
        const username = interaction.options.get("username")?.value;

        (async () => {
            const response = await CheckStatus(username);
            await interaction.reply(`${response}`);
        })();
    }
});

client.login(process.env.TOKEN);
