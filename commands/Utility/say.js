const Discord = require('discord.js-light');
require('discord-reply');
const config = require('../../config');

module.exports = {
  name: 'say',
  aliases: ['repeat', 'quote', 's'],
  description: 'The bot will repeat whatever you input',
  usage: '<message>',
  cooldown: 5,
  perms: "Trusted",
  async execute(message, args) {
    const noPermsUser = new Discord.MessageEmbed()
      .setColor(config.colours.error)
      .setDescription(`You need the <@&${config.ids.trustedRole}> role to use this command.`)
      .setTimestamp()
      .setFooter(config.messages.footer);
    const noPermsBot = new Discord.MessageEmbed()
      .setColor(config.colours.error)
      .setDescription(config.messages.selfNoPermissions)
      .setTimestamp()
      .setFooter(config.messages.footer);
    if (!message.member.roles.cache.has(config.ids.trustedRole) && message.author.id !== config.ids.owner) return message.lineReply(noPermsUser);
    if (!args.length || args.length > 1999) return message.channel.send(`${message.author}, please input something for me to say.\nUsage: **${config.bot.prefix}${module.exports.name} ${module.exports.usage}**`);
    try {
      await message.delete();
      message.channel.send(args.join(' '));
    } catch (error) {
      if (error.code === 50013) return message.lineReply(noPermsBot)
    }
  }
};