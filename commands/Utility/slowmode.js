const { MessageEmbed, WebhookClient } = require('discord.js');
const config = require('../../config');

module.exports = {
   name: 'slowmode',
   description: 'Allows a custom slowmode value to be set',
   async execute(interaction, bot) {
      // —— Set command options
      const data = {
         name: this.name,
         description: this.description,
         defaultPermission: false,
         options: [
            {
               name: 'duration',
               type: 'INTEGER',
               description: 'The amount of time in seconds to set the slowmode to',
               required: true,
            },
            {
               name: 'hide',
               type: 'BOOLEAN',
               description: 'Set slowdown silently',
               required: false,
            },
         ],
      };
      // —— Limit command to moderators
      const permissions = [
         {
            id: config.ids.moderatorRole,
            type: 'ROLE',
            permission: true,
         },
      ];
      // —— Set guild commands
      const commandProd = await bot.guilds.cache.get(config.ids.server)?.commands.create(data);
      const commandDev = await bot.guilds.cache.get(config.ids.testingServer)?.commands.create(data);
      await commandProd.permissions.add({ permissions });
      await commandDev.permissions.add({ permissions });

      const duration = interaction.options.getInteger('duration');
      const hide = interaction.options.getBoolean('hide');

      // —— Set embeds
      const invalidArgs = new MessageEmbed()
         .setColor(config.colours.error)
         .setDescription(`Please include a value in **seconds** that is below **6 hours**.`)
         .setTimestamp()
         .setFooter(config.messages.footer);
      const noPermsBot = new MessageEmbed()
         .setColor(config.colours.error)
         .setDescription(config.messages.selfNoPermissions)
         .setTimestamp()
         .setFooter(config.messages.footer);
      const success = new MessageEmbed()
         .setColor(config.colours.success)
         .setDescription(`Success! The slowmode in this channel is now set to **${duration}** seconds!`)
         .setTimestamp()
         .setFooter(config.messages.footer);

      try {
         // —— Invalid args and hide
         if (duration > 21600 && hide) {
            return interaction.reply({
               embeds: [invalidArgs],
               ephemeral: true,
            });
         }
         if (duration > 21600 && !hide) {
            return interaction.reply({
               embeds: [invalidArgs],
            });
         }
         // —— Set slowmode
         await interaction.channel.setRateLimitPerUser(
            duration,
            `Executed by ${interaction.user.username}#${interaction.user.discriminator}`
         );
         if (hide) {
            interaction.reply({
               embeds: [success],
               ephemeral: true,
            });
         }
         interaction.reply({
            embeds: [success],
         });
         // —— Log
         // const guildWebhook = new WebhookClient({
         //    url: process.env.LOG_WEBHOOK,
         // });
         // const log = new MessageEmbed()
         //    .setColor(config.colours.informational)
         //    .setAuthor(
         //       `${interaction.user.username}#${interaction.user.discriminator}`,
         //       interaction.user.displayAvatarURL({ dynamic: true })
         //    )
         //    .setDescription(`**Slowmode command in **<#${interaction.channel.id}> [Jump to Message](${sayMessage.url})`)
         //    .addField(`Message`, message)
         //    .setTimestamp()
         //    .setFooter(`User ID: ${interaction.user.id}`);
         // guildWebhook.send({ embeds: [log] });
      } catch (error) {
         // —— Error and hide
         if (hide) {
            return interaction.reply({
               embeds: [noPermsBot],
               ephemeral: true,
            });
         }
         // —— Error
         return interaction.reply({
            embeds: [noPermsBot],
         });
      }
   },
};
