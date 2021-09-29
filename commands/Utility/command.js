const { MessageEmbed } = require('discord.js');
const { minebot } = require('../../app');
const minecraftifyText = require('../../func/minecraftifyText');
const config = require('../../config');

module.exports = {
   name: 'send',
   description: 'Send a command to Hypixel using the bot (bot owner only)',
   async execute(interaction, bot) {
      // —— Set the command itself
      const data = {
         name: this.name,
         description: this.description,
         defaultPermission: false,
         options: [
            {
               name: 'command',
               type: 'STRING',
               description: 'What command would you like to send to Hypixel?',
               required: true,
            },
         ],
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
      const msg = interaction.options.getString('command');
      const image = minecraftifyText(msg);

      const success = new MessageEmbed()
         .setColor(config.colours.informational)
         .setDescription('Command sent.')
         .setImage(image)
         .setTimestamp()
         .setFooter(config.messages.footer);
      minebot.chat(`/${msg}`);
      await interaction.reply({
         embeds: [success],
      });
   },
};
