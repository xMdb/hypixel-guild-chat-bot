const Discord = require('discord.js');
require('discord-reply');
const config = require('../../config.json');

module.exports = {
  name: 'say',
  aliases: ['repeat', 'quote'],
  description: 'Makes the bot say the message inputted',
  usage: '[message]',
  cooldown: 3,
  execute(message, args) {
    const sayMessage = args.join(' ');
    const sayFailure = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`You need the <@&520950339013312522> role to use this command.`)
      .setTimestamp()
      .setFooter('Bot by xMdb#7897');
    if (message.member.roles.cache.has("520950339013312522") || message.author.id === config.ownerID) {
      if (!args.length) {
        return message.channel.send(`${message.author}, please input something for me to say.\nUsage: **${config.prefix}${module.exports.name} ${module.exports.usage}**`);
      }
      message.delete();
      message.channel.send(sayMessage).catch(error => {
        if (error.code === 50001 || 50013) {
          console.log(error);
          message.channel.send(`${message.author}, I do not have the correct permissions to perform that task.`);
          return;
        }
      });
    } else {
      message.lineReply(sayFailure);
    }
  }
};