require('dotenv/config');

const { Client, IntentsBitField } = require('discord.js');

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

// listens for a message to be sent
client.on('messageCreate', (msg) => {
  if(msg.author.bot) return;

	msg.reply(`Hello ${msg.author}, how are you?`);
});

client.login(process.env.TOKEN);
