require('dotenv').config();
const chalk = require('chalk');
const { WebhookClient } = require('discord.js');
const webhook = new WebhookClient({
   url: process.env.ERROR_WEBHOOK,
});
const { toDiscordChat } = require('../../../app');

module.exports = {
   name: 'kicked',
   async execute(reason) {
      console.log(chalk.redBright('The bot was kicked.'));
      console.error(reason);
      webhook.send(`**The bot was kicked. Reason:** \`\`\`${reason}\`\`\``);
      console.log(chalk.redBright('Restarting in 10 seconds.'));
      toDiscordChat(
         `<:nah:829640042334257202> The bot was kicked from the server and will reconnect shortly. Reason: \`\`\`${reason}\`\`\``
      );
      setTimeout(() => {
         process.exit(1);
      }, 10 * 1000);
   },
};
