require('dotenv').config();
const chalk = require('chalk');
const { WebhookClient } = require('discord.js');
const webhook = new WebhookClient({
   url: process.env.ERROR_WEBHOOK,
});
const { toDiscordChat } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'error',
   async execute(error) {
      console.log(chalk.redBright('Error event fired.'));
      console.error(error);
      await webhook.send(`**Minebot: Error** \`\`\`${error}\`\`\``);
      console.log(chalk.redBright('Restarting in 10 seconds.'));
      await toDiscordChat(`${config.emotes.error} The bot has encountered an unknown error and will restart shortly.`);
      setTimeout(() => {
         process.exit(1);
      }, 10 * 1000);
   },
};
