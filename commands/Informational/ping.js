const Discord = require('discord.js-light');
const config = require('../../config');

module.exports = {
  name: 'ping',
  aliases: ['p', 'pong', 'heartbeat', 'hb'],
  description: 'To ping or to pong? - Displays bot ping',
  usage: ' ',
  cooldown: 1,
  perms: "None",
  execute(message) {
    message.channel.send(':ping_pong:').then(async (msg) => {
      msg.delete();
      const pingcmd = new Discord.MessageEmbed()
        .setTitle('Pong!')
        .setColor(config.colours.success)
        .setDescription(`**Latency**: ${msg.createdTimestamp - message.createdTimestamp}ms`)
        .setTimestamp()
        .setFooter(config.messages.footer);
      message.channel.send(pingcmd);
    });
  }
};