const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../config');
const chalk = require('chalk');

module.exports = {
   name: 'register',
   description: 'Register a command with the bot (bot owner only)',
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
               description: 'The command to register',
               required: true,
            },
            {
               name: 'type',
               type: 'STRING',
               description: 'Register the command in this guild or globally',
               required: true,
               choices: [
                  {
                     name: 'As a guild command',
                     value: 'guild',
                  },
                  {
                     name: 'As a global command',
                     value: 'global',
                  },
               ],
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
      // —— Set buttons
      const confirmDenyButtons = new MessageActionRow().addComponents(
         new MessageButton().setCustomId('confirm').setLabel('Confirm').setStyle('SUCCESS'),
         new MessageButton().setCustomId('deny').setLabel('Deny').setStyle('DANGER')
      );
      const commandProd = await bot.guilds.cache.get(config.ids.server)?.commands.create(data);
      const commandDev = await bot.guilds.cache.get(config.ids.testingServer)?.commands.create(data);
      await commandProd.permissions.add({ permissions });
      await commandDev.permissions.add({ permissions });

      const commandToReg = interaction.options.getString('command');
      const commandType = interaction.options.get('type').value;
      const newData = {
         name: commandToReg,
         description: 'A newly registered command',
      };

      const confirmDenyEmbed = new MessageEmbed()
         .setTitle(':warning: Are you sure you want to proceed?')
         .setColor(config.colours.error)
         .setDescription(`You are going to register a new **${commandType}** command called **${commandToReg}**.`)
         .setTimestamp()
         .setFooter('Note: Global commands will be cached for up to one hour!');
      await interaction.reply({
         embeds: [confirmDenyEmbed],
         components: [confirmDenyButtons],
      });

      const filter = (buttonPressed) => buttonPressed.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
      const updated = new MessageEmbed()
         .setColor(config.colours.success)
         .setDescription(`Successfully registered new ${commandType} command **${commandToReg}**.`)
         .setTimestamp()
         .setFooter(
            `Executed by ${interaction.user.username}#${interaction.user.discriminator}`,
            interaction.user.displayAvatarURL({ dynamic: true })
         );
      const cancelled = new MessageEmbed()
         .setColor(config.colours.error)
         .setDescription(`**Cancelled!** No commands were registered!`)
         .setTimestamp()
         .setFooter(
            `Executed by ${interaction.user.username}#${interaction.user.discriminator}`,
            interaction.user.displayAvatarURL({ dynamic: true })
         );

      collector.on('collect', async (buttonPressed) => {
         if (buttonPressed.customId === 'confirm') {
            if (commandType === 'guild') {
               await bot.guilds.cache.get(interaction.guild.id)?.commands.create(newData);
               console.log(chalk.cyanBright(`Created new guild command called ${commandToReg} with default settings.`));
            }
            if (commandType === 'global') {
               await bot.application?.commands.create(newData);
               console.log(chalk.magentaBright(`Created global command called ${commandToReg} with default settings.`));
            }
            await buttonPressed.reply({ embeds: [updated], components: [] });
         }
         if (buttonPressed.customId === 'deny') {
            await buttonPressed.reply({ embeds: [cancelled], components: [] });
         }
      });
   },
};
