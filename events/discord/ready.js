const config = require('../../config');
const chalk = require('chalk');

module.exports = {
   name: 'ready',
   runOnce: true,
   async execute(bot) {
      console.log(chalk.greenBright('Success! Discord bot is now online.'));
      bot.user.setActivity('the console window', {
         type: 'WATCHING',
      });
      setInterval(() => {
         const statusIndex = Math.floor(Math.random() * (config.messages.statuses.length - 1) + 1);
         bot.user.setActivity(config.messages.statuses[statusIndex], {
            type: 'LISTENING',
         });
      }, 60 * 1000);
      await bot.guilds.cache.get(config.ids.server).channels.cache.get(config.ids.guildChannel).send({
         content: `<:yes:829640052531134464> Bot has reconnected to Discord.`,
      });

      // register register command

      const data = {
         name: 'register',
         description: 'Register command',
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

      const commandProd = await bot.guilds.cache.get(config.ids.server)?.commands.create(data);
      const commandDev = await bot.guilds.cache.get(config.ids.testingServer)?.commands.create(data);
      await commandProd.permissions.add({ permissions });
      await commandDev.permissions.add({ permissions });
   },
};
