const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'To ping or to pong?',
  cooldown: 1,
  execute(message, args) {
    message.channel.send(':ping_pong:').then(async (msg) => {
      msg.delete();
      const pingcmd = new Discord.MessageEmbed()
        .setTitle('Pong!')
        .setColor('#3A783F')
        .setDescription(`**Latency**: ${msg.createdTimestamp - message.createdTimestamp}ms`)
        .setTimestamp()
        .setFooter('Bot by xMdb#7897');
      message.channel.send(pingcmd);
    });
  }
};