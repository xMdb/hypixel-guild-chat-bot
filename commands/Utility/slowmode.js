const Discord = require('discord.js-light');
require('discord-reply');
const config = require('../../config');

module.exports = {
    name: 'slowmode',
    aliases: ['sm', 'setslowmode', 'delay', 'slow'],
    description: 'Allows a custom slowmode value to be set',
    usage: '<seconds>',
    cooldown: 5,
    perms: "Moderator",
    async execute(message, args) {
        const value = args.join(' ');
        const noPermsUser = new Discord.MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(config.messages.noPermissionNormal)
            .setTimestamp()
            .setFooter(config.messages.footer);
        const noPermsBot = new Discord.MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(config.messages.selfNoPermissions)
            .setTimestamp()
            .setFooter(config.messages.footer);
        const invalidArgs = new Discord.MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(`Please include a value in **seconds** that is below **6 hours**.`)
            .setTimestamp()
            .setFooter(config.messages.footer);
        const success = new Discord.MessageEmbed()
            .setColor(config.colours.success)
            .setDescription(`Success! The slowmode in this channel is now set to **${value}** seconds!`)
            .setTimestamp()
            .setFooter(config.messages.footer);
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(noPermsUser);
        if (!value.length || isNaN(value) || value > 21600) return message.lineReply(invalidArgs);
        try {
            await message.channel.setRateLimitPerUser(value, `Executed by ${message.author.username}#${message.author.discriminator}`)
        } catch (error) {
            if (error.code === 50013) return message.lineReply(noPermsBot);
        }
        message.lineReply(success);
    }
};