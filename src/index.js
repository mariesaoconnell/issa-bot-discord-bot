require('dotenv/config');

const { Client, IntentsBitField, ActivityType } = require('discord.js');
const eventHandlers = require('./handlers/eventHandlers');

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


// CALLS TO /handlers/eventHandlers
eventHandlers(client);

client.login(process.env.TOKEN);
