const { MessageEmbed } = require('discord.js');
const config = require('../../config');
const hastebin = require('hastebin');

module.exports = {
   name: 'Evaluate Content',
   description: 'Evaluates JavaScript code (bot owner only)',
   async execute(interaction, bot) {
      // —— Context menu
      const context = {
         name: 'Evaluate Content',
         defaultPermission: false,
         type: 'MESSAGE',
      };
      // —— Set command permissions
      const permissions = [
         {
            id: config.ids.owner,
            type: 'USER',
            permission: true,
         },
      ];
      const contextProd = await bot.guilds.cache.get(config.ids.server)?.commands.create(context);
      const contextDev = await bot.guilds.cache.get(config.ids.testingServer)?.commands.create(context);
      await contextProd.permissions.add({ permissions });
      await contextDev.permissions.add({ permissions });

      const getMessage = interaction.options.getMessage('message');
      let code = getMessage.content;
      for (let i = 0; i < 5; i++) {
         code = code.replace('```', '');
      }
      await interaction.deferReply();
      try {
         const start = Date.now();
         let evaled = eval(code);
         if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
         // Prevent all token leaking
         if (evaled.includes(bot.token)) {
            evaled = evaled.replace(bot.token, 'undefined');
         }
         if (evaled.includes(process.env.BOT_TOKEN)) {
            evaled = evaled.replace(process.env.BOT_TOKEN, 'undefined');
         }
         const end = Date.now();

         // —— Long req
         const longRequestEmbed = new MessageEmbed()
            .setTitle('Evaluate - Result Too Long  📜')
            .setColor(config.colours.informational)
            .setDescription(`Generating Hastebin link. Please wait... :hourglass:`)
            .setTimestamp()
            .setFooter(`Execution time: ${end - start}ms`, interaction.user.displayAvatarURL({ dynamic: true }));

         if (evaled.length > 999) {
            interaction.editReply({
               embeds: [longRequestEmbed],
            });
            hastebin
               .createPaste(evaled, {
                  raw: false,
                  contentType: 'text/plain',
                  server: 'https://haste.zneix.eu/',
               })
               .then((url) => {
                  const resultEmbed = new MessageEmbed()
                     .setTitle('Evaluate - Result Too Long  📜')
                     .setColor(config.colours.informational)
                     .addFields({
                        name: `Input`,
                        value: `\`\`\`js\n${code}\`\`\``,
                     })
                     .addFields({
                        name: `Output`,
                        value: `[Click to view result!](${url})`,
                     })
                     .setTimestamp()
                     .setFooter(`Execution time: ${end - start}ms`, interaction.user.displayAvatarURL({ dynamic: true }));
                  return interaction.editReply({
                     embeds: [resultEmbed],
                  });
               })
               .catch((e) => console.error(e));
            return;
         }

         // —— Successful eval
         const evalEmbed = new MessageEmbed()
            .setTitle('Evaluate - Completed  ✅')
            .setColor(config.colours.success)
            .addFields({
               name: `Input`,
               value: `\`\`\`js\n${code}\`\`\``,
            })
            .addFields({
               name: `Output`,
               value: `\`\`\`yaml\n${evaled}\`\`\``,
            })
            .setTimestamp()
            .setFooter(`Execution time: ${end - start}ms`, interaction.user.displayAvatarURL({ dynamic: true }));
         return interaction.editReply({
            embeds: [evalEmbed],
         });

         // —— Unsuccessful eval
      } catch (error) {
         const errorEmbed = new MessageEmbed()
            .setTitle('Evaluate - Error  ❌')
            .setColor(config.colours.error)
            .addFields({
               name: `Input  📥`,
               value: `\`\`\`js\n${code}\`\`\``,
            })
            .addFields({
               name: `Output  📤`,
               value: `\`\`\`fix\n${error}\`\`\``,
            })
            .setTimestamp()
            .setFooter(
               `Executed by ${interaction.user.username}#${interaction.user.discriminator}`,
               interaction.user.displayAvatarURL({ dynamic: true })
            );
         return interaction.editReply({
            content: `An error has occurred.`,
            embeds: [errorEmbed],
         });
      }
   },
};
