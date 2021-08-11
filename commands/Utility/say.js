const { MessageEmbed, WebhookClient } = require('discord.js');
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
      const commandProd = await bot.guilds.cache.get(config.ids.server)?.commands.create(data);
      const commandDev = await bot.guilds.cache.get(config.ids.testingServer)?.commands.create(data);
      await commandProd.permissions.add({ permissions });
      await commandDev.permissions.add({ permissions });
      
      const message = interaction.options.getString('message');
      const destination = interaction.options.getChannel('destination');
      try {
         if (destination.type !== 'GUILD_TEXT') {
            return interaction.reply({ content: `The channel provided is not a text channel.`, ephemeral: true });
         }
         const sayMessage = await bot.channels.cache.get(destination.id).send({
            content: message,
         });
         const guildWebhook = new WebhookClient({
            url: process.env.LOG_WEBHOOK,
         });
         const log = new MessageEmbed()
            .setColor(config.colours.informational)
            .setAuthor(
               `${interaction.user.username}#${interaction.user.discriminator}`,
               interaction.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription(`**Say command in **<#${destination.id}> [Jump to Message](${sayMessage.url})`)
            .addField(`Message`, message)
            .setTimestamp()
            .setFooter(`User ID: ${interaction.user.id}`);
         guildWebhook.send({ embeds: [log] });
         interaction.reply({ content: 'Done!', ephemeral: true });
      } catch (error) {
         interaction.reply({
            content: `I cannot access that channel.`,
            ephemeral: true,
         });
         console.log(error);
      }
   },
};
