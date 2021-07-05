const Discord = require('discord.js-light');
require('discord-reply');
const config = require('../../config');

module.exports = {
  name: 'restart',
  aliases: ['reboot', 'rs'],
  description: 'Restarts the bot (bot owner only)',
  usage: ' ',
  cooldown: 10,
  perms: "Bot Owner",
  execute(message) {
    const noPerms = new Discord.MessageEmbed()
      .setColor(config.colours.error)
      .setDescription(config.messages.noPermissionDev)
      .setTimestamp()
      .setFooter(config.messages.footer);
    const success = new Discord.MessageEmbed()
      .setColor(config.colours.informational)
      .setDescription('Process ended. Restarting...')
      .setTimestamp()
      .setFooter(config.messages.footer);
    if (message.author.id !== config.ids.owner) return message.lineReply(noPerms);
    message.lineReply(success).then(() => {
      process.exit(1);
    });
  }
};