const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = "1194887492944535593"; // Replace with your actual client ID
const guildId = "1194894867361452072"; // Replace with your actual guild ID
const token = process.env.DISCORD_TOKEN; // Replace with your actual bot token

const commands = [
    {
        name: 'status',
        description: 'Change the bot\'s status',
        options: [
            {
                name: 'activity',
                type: 3, // STRING type
                description: 'Type of activity (e.g., Playing, Listening, Watching)',
                required: true,
            },
            {
                name: 'status-text',
                type: 3, // STRING type
                description: 'Status text',
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options, member, guild } = interaction;

    if (commandName === 'status') {
        // Check if the user has the necessary role (e.g., Bot Manager)
        const botManagerRole = guild.roles.cache.find(role => role.name === 'Bot Manager');

        if (!botManagerRole || !member.roles.cache.has(botManagerRole.id)) {
            // Unauthorized user, send message to mod log
            const modLogChannel = guild.channels.cache.find(channel => channel.name === 'mod-log');

            if (modLogChannel && modLogChannel.type === 'text') {
                modLogChannel.send(`Unauthorized user ${member.user.tag} attempted to change bot status.`);
            }

            await interaction.reply('You do not have the necessary role to use this command.');
            return;
        }

        const activity = options.getString('activity');
        const statusText = options.getString('status-text');

        client.user.setActivity(statusText, { type: activity.toUpperCase() });
        await interaction.reply(`Status set to: ${activity} ${statusText}`);
    }
});

client.login(token);
