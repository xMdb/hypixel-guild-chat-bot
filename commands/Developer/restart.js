const Discord = require('discord.js-light');
require('discord-reply');
const config = require('../../config.json');

module.exports = {
  name: 'restart',
  aliases: ['reboot', 'rs'],
  description: 'Restarts the bot',
  execute(message, args) {
    const restartsuccess = new Discord.MessageEmbed()
      .setColor('#3A783F')
      .setDescription('Process ended. Restarting...')
      .setTimestamp()
      .setFooter('Bot by xMdb#7897');
    const restartfail = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`${message.author}, you do not have the correct permissions to use this command.`)
      .setTimestamp()
      .setFooter('Bot by xMdb#7897');
    if (message.author.id !== config.ownerID) return message.lineReply(restartfail);
    message.lineReply(restartsuccess).then(() => {
      process.exit(1);
    });
  }
};