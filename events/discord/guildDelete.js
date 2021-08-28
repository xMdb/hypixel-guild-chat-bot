const chalk = require('chalk');

module.exports = {
   name: 'guildDelete',
   runOnce: false,
   async execute(guild) {
      console.log(chalk.greenBright(`Bot removed from: "${guild.name}" (id: ${guild.id})`));
   },
};
