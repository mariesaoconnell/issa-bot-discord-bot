require('dotenv/config');

const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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

const roles = [
	{
		id: '1100904460202557440',
		label: 'Pink',
	},
	{
		id: '1100904605371609098',
		label: 'Blue',
	},
	{
		id: '1100904710787047475',
		label: 'Green',
	},
];

// EVENT LISTENERS

// bot on when ready will console log the bot's user name is online
client.on('ready', async (c) => {
	// console.log(`✅ ${c.user.username} is online! `);

	try {
		const channel = await client.channels.cache.get('1100870328827248700');
		if (!channel) return;

		const row = new ActionRowBuilder();
		roles.forEach((role) => {
			row.components.push(
				new ButtonBuilder()
					.setCustomId(role.id)
					.setLabel(role.label)
					.setStyle(ButtonStyle.Primary)
			);
		});
		await channel.send({
			content: 'Claim or Remove Role',
			components: [row],
		});
		process.exit();
	} catch (error) {
		console.log(error);
	}
});

client.login(process.env.TOKEN);
