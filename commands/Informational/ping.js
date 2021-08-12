const { MessageEmbed } = require('discord.js');
const config = require('../../config');

module.exports = {
   name: 'ping',
   description: 'To ping or to pong? - Displays bot ping',
   async execute(interaction, bot) {
      const data = {
         name: this.name,
         description: this.description,
      };
      await bot.application?.commands.create(data);
      
      interaction.channel.send(':ping_pong:').then(async (msg) => {
         msg.delete();
         const pingCmd = new MessageEmbed()
            .setTitle('Pong!')
            .setColor(config.colours.success)
            .setDescription(`**Latency**: ${msg.createdTimestamp - interaction.createdTimestamp}ms`)
            .setTimestamp()
            .setFooter(config.messages.footer);
         interaction.reply({
            embeds: [pingCmd],
         });
      });
   },
};
