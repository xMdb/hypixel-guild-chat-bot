const Discord = require('discord.js-light');
require('discord-reply');
const config = require('../../config');

module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Displays information about the bot',
  cooldown: 3,
  execute(message, args) {
    const helpcmd = new Discord.MessageEmbed()
      .setTitle('Hello!')
      .setColor(config.colours.success)
      .setDescription(`I'm a chat bot that connects Minecraft chat to Discord and vice versa, poorly coded by xMdb#7897. Use **${config.bot.prefix}commands** for a list of commands!`)
      .setTimestamp()
      .setFooter('DM xMdb#7897 for any bugs or suggestions.');
    message.lineReply(helpcmd);
  }
};