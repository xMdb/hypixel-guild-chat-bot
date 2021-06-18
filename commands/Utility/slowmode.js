const Discord = require('discord.js-light');
require('discord-reply');
const footer = ('Bot by xMdb#7897')

module.exports = {
    name: 'slowmode',
    aliases: ['sm', 'setslowmode', 'delay', 'slow'],
    description: 'Allows a custom slowmode value to be set',
    usage: '[seconds]',
    cooldown: 5,
    async execute(message, args) {
        const value = args.join(' ');
        const noPerms = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`You don't have permission to use this command.`)
            .setTimestamp()
            .setFooter(footer);
        const invalidArgs = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`Please include a value in **seconds** that is below **6 hours**.`)
            .setTimestamp()
            .setFooter(footer);
        const success = new Discord.MessageEmbed()
            .setColor('#3A783F')
            .setDescription(`Success! The slowmode in this channel is now set to **${value}** seconds!`)
            .setTimestamp()
            .setFooter(footer);
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(noPerms);
        if (!value.length || isNaN(value) || value > 21600) return message.lineReply(invalidArgs);
        try {
            await message.channel.setRateLimitPerUser(value, `Executed by ${message.author.username}#${message.author.discriminator}`)
        } catch (error) {
            if (error.code === 50013) {
                message.channel.send(`${message.author}, I do not have the correct permissions to perform that task.`);
                return;
            }
        }
        message.lineReply(success);
    }
};