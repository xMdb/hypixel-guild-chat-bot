const { MessageEmbed } = require('discord.js');
const config = require('../../config');
const wait = require('util').promisify(setTimeout);

module.exports = {
   name: 'restart',
   description: 'Restarts the bot (bot owner only)',
   async execute(interaction, bot) {
      // —— Set the command itself
      const data = {
         name: this.name,
         description: this.description,
         defaultPermission: false,
      };
      // —— Set command permissions
      const permissions = [
         {
            id: config.ids.owner,
            type: 'USER',
            permission: true,
         },
      ];
      const commandProd = await bot.guilds.cache.get(config.ids.server)?.commands.create(data);
      const commandDev = await bot.guilds.cache.get(config.ids.testingServer)?.commands.create(data);
      await commandProd.permissions.add({ permissions });
      await commandDev.permissions.add({ permissions });

      const success = new MessageEmbed()
         .setColor(config.colours.informational)
         .setDescription('Process ended. Restarting...')
         .setTimestamp()
         .setFooter(config.messages.footer);
      await interaction.deferReply();
      await wait(1000);
      interaction
         .editReply({
            embeds: [success],
         })
         .then(() => {
            process.exit(1);
         });
   },
};
