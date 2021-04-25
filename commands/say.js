const Discord = require('discord.js');
require('discord-reply');

module.exports = {
  name: 'say',
  description: 'Says stuff',
  execute(message, args) {
    const sayMessage = args.join(' ');
    const sayFailure = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`You need the <@&520950339013312522> role to use this command.`)
      .setTimestamp()
      .setFooter('Bot by xMdb#7897');
    if (message.member.roles.cache.has("520950339013312522")) {
      message.delete().catch(O_o => {});
      message.channel.send(sayMessage).catch(error => {
        if (error.code === 50006) {
          message.channel.send(`${message.author}, please input something for me to say.`);
          return;
        }
        if (error.code === 50001 || 50013) {
          console.log(error);
          message.channel.send(`${message.author}, I do not have the correct permissions to perform that task.`);
          return;
        }
      })
    } else {
      message.lineReply(sayFailure);
    }
  }
};