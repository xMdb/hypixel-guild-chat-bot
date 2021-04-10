const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'help',
  description: 'Displays useless information',
  execute(message, args) {
    const helpcmd = new Discord.MessageEmbed().setTitle('Hello!').setColor('#3A783F').setDescription("I'm a chat bot that connects Minecraft chat to Discord and vice versa, poorly coded by xMdb#7897. Use **" + config.prefix + 'commands** for a list of commands!').setTimestamp().setTimestamp().setFooter('DM xMdb#7897 for any bugs or suggestions.');
    message.channel.send(helpcmd);
  }
};