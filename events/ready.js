const chalk = require('chalk');
const config = require('../config');

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
      bot.guilds.cache.get(config.ids.server).channels.cache.get(config.ids.guildChannel).send({
          content: `<:yes:829640052531134464> Bot has reconnected to Discord.`
      });
   },
};
