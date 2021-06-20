const Discord = require('discord.js-light');
const config = require('../../config');

module.exports = {
  name: 'commands',
  aliases: ['cmds', 'cmd', 'cmdhelp'],
  description: 'Shows a list of commands',
  cooldown: 3,
  execute(message, args) {
    const cmdlist = new Discord.MessageEmbed()
      .setTitle('Current Command List')
      .setColor(config.colours.success)
      .setDescription(`**${config.bot.prefix}help** - Displays information about the bot\n**${config.bot.prefix}ping** - To ping or to pong?\n**${config.bot.prefix}uptime** - Displays the current uptime of the bot\n**${config.bot.prefix}say** - The bot will repeat whatever you input\n**${config.bot.prefix}slowmode** - Allows a custom slowmode value to be set\n\nTo chat in guild chat, you do not need a prefix. Just type in the <#${config.ids.guildChannel}> channel!`)
      .setTimestamp()
      .setFooter('DM xMdb#7897 for any bugs or suggestions.');
    message.channel.send(cmdlist);
  }
};