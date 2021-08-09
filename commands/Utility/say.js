const config = require('../../config');
const chalk = require('chalk');

module.exports = {
   name: 'say',
   description: 'The bot will repeat whatever you input',
   cooldown: 5,
   async execute(interaction, bot) {
      const data = {
         name: this.name,
         description: this.description,
         defaultPermission: false,
         options: [
            {
               name: 'message',
               type: 'STRING',
               description: 'The message to send',
               required: true,
            },
            {
               name: 'destination',
               type: 'CHANNEL',
               description: 'Channel to send a message to',
               required: true,
            },
         ],
      };
      const permissions = [
         {
            id: config.ids.trustedRole,
            type: 'ROLE',
            permission: true,
         },
      ];
      const command = await bot.guilds.cache.get(config.ids.server)?.commands.create(data);
      await command.permissions.add({ permissions });
      const message = interaction.options.getString('message');
      const destination = interaction.options.getChannel('destination');
      try {
         if (destination.type !== 'GUILD_TEXT') {
            return interaction.reply({ content: `The channel provided is not a text channel.`, ephemeral: true });
         }
         bot.channels.cache.get(destination.id).send({
            content: message,
         });
         console.log(chalk.grey(`[SAY] ${interaction.user.username} #${destination.name}: ${message}`));
         interaction.reply({ content: 'Done.', ephemeral: true });
      } catch (error) {
         interaction.reply({
            content: `I cannot access that channel.`,
            ephemeral: true,
         });
         console.log(error);
      }
   },
};
