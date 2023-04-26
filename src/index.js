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


client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'hey') {
		interaction.reply(`Hey ${interaction.member}!`);
	}

	if (interaction.commandName === 'embed') {
		const embed = new EmbedBuilder()
			.setTitle('Embed Title')
			.setDescription('This is an embed description.')
			.setColor('Random')
			.addFields({
				name: 'Field Title',
				value: 'Some random value',
				inline: true,
			});
		interaction.reply({ embeds: [embed] });
	}
});

client.on('messageCreate', (msg) => {
	if (msg.content === 'embed') {
		const embed = new EmbedBuilder()
			.setTitle('Embed Title')
			.setDescription('This is an embed description.')
			.setColor('Random')
			.addFields(
				{
					name: 'Field Title',
					value: 'Some random value',
					inline: true,
				},
				{
					name: 'Field Title',
					value: 'Some random value',
					inline: true,
				}
			);

		msg.channel.send({ embeds: [embed]})
	}
});

client.login(process.env.TOKEN);
