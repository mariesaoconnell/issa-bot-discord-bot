require('dotenv/config');

const { Client, IntentsBitField, ActivityType } = require('discord.js');

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

let status = [
	{
		name: 'God',
		type: ActivityType.Playing,
	},
	{
		name: 'My Minions',
		type: ActivityType.Watching,
	},
	{
		name: 'You',
		type: ActivityType.Watching,
	},
];

// EVENT LISTENERS

// bot on when ready will console log the bot's user name is online
client.on('ready', (c) => {
	console.log(`✅ ${c.user.username} is online! `);

	setInterval(() => {
		let random = Math.floor(Math.random() * status.length);
		client.user.setActivity(status[random]);
	}, 10000);
});

client.login(process.env.TOKEN);
