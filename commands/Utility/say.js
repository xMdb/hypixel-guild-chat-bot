const {
  MessageEmbed
} = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'say',
  aliases: ['repeat', 'quote', 's'],
  description: 'The bot will repeat whatever you input',
  usage: '<message>',
  cooldown: 5,
  perms: "Trusted",
  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async execute(message, args) {
    const noPermsUser = new MessageEmbed()
      .setColor(config.colours.error)
      .setDescription(`You need the <@&${config.ids.trustedRole}> role to use this command.`)
      .setTimestamp()
      .setFooter(config.messages.footer);
    const noPermsBot = new MessageEmbed()
      .setColor(config.colours.error)
      .setDescription(config.messages.selfNoPermissions)
      .setTimestamp()
      .setFooter(config.messages.footer);
    if (!message.member.roles.cache.has(config.ids.trustedRole) && message.author.id !== config.ids.owner) return message.reply({
      embeds: [noPermsUser]
    });
    if (!args.length || args.length > 1999) return message.channel.send({
      content: `${message.author}, please input something for me to say.\nUsage: **${config.bot.prefix}${module.exports.name} ${module.exports.usage}**`
    });
    try {
      await message.delete();
      message.channel.send({
        content: args.join(' ')
      });
    } catch (error) {
      if (error.code === 50013) return message.reply({
        embeds: [noPermsBot]
      })
    }
  }
};