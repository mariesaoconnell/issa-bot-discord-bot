const { testServer, devs } = require('../../../config.json');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

module.exports = async (client) => {
	try {
		// GET BOTH LOCAL AND APPLICATION COMMANDS
		const localCommands = getLocalCommands();
		const applicationCommands = await getApplicationCommands(
			client,
			testServer
		);

		// ITERATE THROUGH LOCAL COMMANDS
		for (const localCommand of localCommands) {
			const { name, description, options } = localCommand;

			// CHECK IF COMMANDS EXIST ON THE BOT
			const existingCommand = await applicationCommands.cache.find(
				(cmd) => cmd.name === name
			);

			// IF COMMAND DOES EXIST, WE COMPARE THEM
			if (existingCommand) {
				// CHECKS IF LOCAL COMMAND WAS DELETED
				if (localCommand.deleted) {
					await applicationCommands.delete(existingCommand.id);
					console.log(`🗑️ Deleted command "${name}.`);
					continue;
				}

				// CHECKS IF LOCAL COMMAND IS DIFFERENT FROM LOCAL COMMAND
				if (areCommandsDifferent(existingCommand, localCommand)) {
					// EDIT COMMAND WITH LOCAL COMMAND VERSION
					await applicationCommands.edit(existingCommand.id, {
						description,
						options,
					});
					console.log(`🔁 Edited command "${name}".`);
				}
			} else {
				// CHECK IF LOCAL COMMAND IS SET TO DELETE
				if (localCommand.deleted) {
					console.log(
						`⏩ Skipping registering command "${name} as it's set to delete.`
					);
					continue;
				}

				// WILL ONLY RUN IF THE COMMAND DOES NOT EXIST AND IS NOT SET TO BE DELETED
				await applicationCommands.create({
					name,
					description,
					options,
				});
				console.log(`👍🏻 Registered Command "${name}".`);
			}
		}
	} catch (error) {
		console.log(`There was an error: ${error}`);
	}
};
