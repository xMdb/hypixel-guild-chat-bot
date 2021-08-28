const chalk = require('chalk');
const { minebot } = require('../../../app');

module.exports = {
   name: 'lobbyJoin',
   async execute() {
      console.log(chalk.redBright('Lobby detected: Sending to Limbo.'));
      minebot.chat('/ac \u00a7');
   },
};
