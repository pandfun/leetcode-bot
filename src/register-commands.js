require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        name: "status",
        description: "Check if user has solved the daily problem",
        options: [
            {
                name: "username",
                description: "Username of the person to check on",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log(`Slash commands have been registered!`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();
