const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');

module.exports = {
  name: 'ping',
  description: 'To ping or to pong?',
  execute(message, args) {
      const pingcmd = new Discord.MessageEmbed().setTitle('Pong!').setColor('#3A783F').setDescription(`**Latency**: ${Date.now() - message.createdTimestamp}ms`).setTimestamp().setFooter("Bot by xMdb#7897");
      message.channel.send(pingcmd);
  }
}