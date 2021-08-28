require('dotenv').config();
const chalk = require('chalk');
const { WebhookClient } = require('discord.js');
const webhook = new WebhookClient({
   url: process.env.ERROR_WEBHOOK,
});
const { toDiscordChat } = require('../../../app');

module.exports = {
   name: 'error',
   async execute(error) {
      console.log(chalk.redBright('Error event fired.'));
      console.error(error);
      webhook.send(`**Minebot: Error** \`\`\`${error}\`\`\``);
      console.log(chalk.redBright('Restarting in 10 seconds.'));
      toDiscordChat(`<:nah:829640042334257202> The bot has encountered an unknown error and will restart shortly.`);
      setTimeout(() => {
         process.exit(1);
      }, 10 * 1000);
   },
};
