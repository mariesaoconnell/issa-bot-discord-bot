const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');

module.exports = {
  deleted: true, 
	name: 'ban',
	description: 'bans a member!!!',
	// devOnly: Boolean
	// testOnly: Boolean
	options: Object[
    {
      name: 'target-user',
      description: 'The user to ban.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable
    },
    {
      name: 'reason',
      description: 'The reason for banning.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],

  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],


	callback: (client, interaction) => {
		interaction.reply("Ban..");
	},
};
