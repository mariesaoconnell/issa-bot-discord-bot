require('dotenv/config');

const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

// CLIENT = BOT.. INITIALIZE CLIENT
const client = new Client({
	// INTENTS ARE PERMISSIONS
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

// EVENT LISTENERS

// bot on when ready will console log the bot's user name is online
client.on('ready', (c) => {
	console.log(`✅ ${c.user.username} is online! `);
});

client.on('interactionCreate', async (interaction) => {
	try {
		if (!interaction.isButton()) return;
		await interaction.deferReply({ ephemeral: true });

		const role = interaction.guild.roles.cache.get(interaction.customId);
		if (!role) {
			interaction.editReply({
				content: "I couldn't find that role",
			});
			return;
		}

		const hasRole = interaction.member.roles.cache.has(role.id);

		if (hasRole) {
			await interaction.member.roles.remove(role);
			await interaction.editReply(`The role ${role} has been removed.`);
			return;
		}

		await interaction.member.roles.add(role);
		await interaction.editReply(`The role ${role} has been added.`);
	} catch (error) {
		console.log(error);
	}
});


client.login(process.env.TOKEN);
