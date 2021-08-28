const chalk = require('chalk');

module.exports = {
   name: 'guildCreate',
   runOnce: false,
   async execute(guild) {
      console.log(
         chalk.greenBright(
            `New guild joined: "${guild.name}" (id: ${guild.id}). This guild has ${guild.memberCount} members!`
         )
      );
   },
};
