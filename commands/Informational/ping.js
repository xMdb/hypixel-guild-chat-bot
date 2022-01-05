const { MessageEmbed } = require('discord.js');
const config = require('../../config');

module.exports = {
   name: 'ping',
   description: 'Displays bot ping',
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
            .setDescription(
               `:heartbeat: **Websocket Heartbeat**: ${bot.ws.ping}ms\n:bullettrain_front: **Roundtrip Latency**: ${
                  msg.createdTimestamp - interaction.createdTimestamp
               }ms`
            )
            .setTimestamp()
         interaction.reply({
            embeds: [pingCmd],
         });
         .setFooter({ text: config.messages.footer });
      });
   },
};
