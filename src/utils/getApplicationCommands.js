module.exports = async (client, guildId) => {
	let applicationCommands;

	// CHECK IF GUILDID EXISTS
	if (guildId) {
		// GET THE GUILD ID
		const guild = await client.guilds.fetch(guildId);

		// SET APPLICATION COMMANDS = TO THE GUILD COMMANDS
		applicationCommands = guild.commands;
	} else {
		// GET GLOBAL COMMANDS
		applicationCommands = await client.application.commands;
	}
	await applicationCommands.fetch();
	return applicationCommands;
};
