const {
  MessageEmbed
} = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'restart',
  aliases: ['reboot', 'rs'],
  description: 'Restarts the bot',
  usage: ' ',
  cooldown: 10,
  perms: "Bot Owner",
  /**
   * @param {Message} message
   */
  execute(message) {
    const noPerms = new MessageEmbed()
      .setColor(config.colours.error)
      .setDescription(config.messages.noPermissionDev)
      .setTimestamp()
      .setFooter(config.messages.footer);
    const success = new MessageEmbed()
      .setColor(config.colours.informational)
      .setDescription('Process ended. Restarting...')
      .setTimestamp()
      .setFooter(config.messages.footer);
    if (message.author.id !== config.ids.owner) return message.reply({
      embeds: [noPerms]
    });
    message.reply({
      embeds: [success]
    }).then(() => {
      process.exit(1);
    });
  }
};