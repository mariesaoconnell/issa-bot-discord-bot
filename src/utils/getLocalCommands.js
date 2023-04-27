// GET ALL THE COMMANDS LOCALLY ...
const path = require('path');
const getAllFiles = require('./getAllFiles');

// WILL EXCLUDE SPECIFIC COMMANDS BASED ON CHOICE
module.exports = (exceptions = []) => {

	let localCommands = [];

	// GETS THE FOLDERS THAT LIE WITHIN COMMANDS FOLDER
	const commandCategories = getAllFiles(
		path.join(__dirname, '..', 'commands'),
		true
	);

	// ITERATE OVER EACH FOLDER WITHIN COMMANDS FOLDER
	for (const commandCategory of commandCategories) {

		// RETURNS AN ARRAY OF ALL FILES FOUND WITHIN THE CATEGORY
		const commandFiles = getAllFiles(commandCategory);

		// ITERATES OVER FILES FOUND WITHIN COMMANDFILES
		for (const commandFile of commandFiles) {

			// COMMANDOBJECT IS SET EQUAL TO THE COMMANDFILE'S PATH
			const commandObject = require(commandFile);

			// CHECK IF THE COMMAND NAME EXISTS
			if (exceptions.includes(commandObject.name)) continue;

			// IF COMMAND DOES NOT EXIST, PUSH COMMANDOBJECT INTO LOCALCOMMANDS ARRAY
			localCommands.push(commandObject);
		}
	}
	return localCommands;
};
