const { MessageEmbed } = require('discord.js');
const config = require('../../config');

module.exports = {
   name: 'uptime',
   description: 'Displays the current uptime of the bot',
   async execute(interaction, bot) {
      const data = {
         name: this.name,
         description: this.description,
      };
      await bot.application?.commands.create(data);

      const days = Math.floor(process.uptime() / 86400);
      const hours = Math.floor(process.uptime() / 3600) % 24;
      const minutes = Math.floor(process.uptime() / 60) % 60;
      const seconds = Math.floor(process.uptime() % 60);

      const uptimeEmbed = new MessageEmbed()
         .setTitle('Bot Uptime')
         .setColor(config.colours.success)
         .setDescription(
            `Time since last restart:\n\n**${days}** day(s)\n**${hours}** hour(s)\n**${minutes}** minute(s)\n**${seconds}** second(s)`
         )
         .setTimestamp()
      interaction.reply({
         .setFooter({ text: config.messages.footer });
         embeds: [uptimeEmbed],
      });
   },
};
