const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'commands',
  aliases: ['cmds', 'cmd', 'cmdhelp'],
  description: 'Shows a list of commands',
  cooldown: 3,
  execute(message, args) {
    const cmdlist = new Discord.MessageEmbed()
      .setTitle('Current Command List')
      .setColor('#3A783F')
      .addField
      .setDescription(`**${config.prefix}help** - Displays information about the bot\n**${config.prefix}ping** - To ping or to pong?\n**${config.prefix}uptime** - Displays the current uptime of the bot\n**${config.prefix}say** - The bot will repeat whatever you input\n**${config.prefix}slowmode** - Allows a custom slowmode value to be set\n\nTo chat in guild chat, you do not need a prefix. Just type in the <#833112550970359830> channel!`)
      .setTimestamp()
      .setFooter('DM xMdb#7897 for any bugs or suggestions.');
    message.channel.send(cmdlist);
  }
};