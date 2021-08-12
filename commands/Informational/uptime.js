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

      let days = Math.floor(process.uptime() / 86400);
      let hours = Math.floor(process.uptime() / 3600) % 24;
      let minutes = Math.floor(process.uptime() / 60) % 60;
      let seconds = Math.floor(process.uptime() % 60);

      const uptimeEmbed = new MessageEmbed()
         .setTitle('Bot Uptime')
         .setColor(config.colours.success)
         .setDescription(
            `Time since last restart:\n\n**${days}** day(s)\n**${hours}** hour(s)\n**${minutes}** minute(s)\n**${seconds}** second(s)`
         )
         .setTimestamp()
         .setFooter(config.messages.footer);
      interaction.reply({
         embeds: [uptimeEmbed],
      });
   },
};
