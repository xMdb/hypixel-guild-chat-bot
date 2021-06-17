const Discord = require('discord.js-light');
require('discord-reply');
const footer = ('Bot by xMdb#7897')

module.exports = {
    name: 'slowmode',
    aliases: ['sm', 'setslowmode', 'delay', 'slow'],
    description: 'Allows a custom slowmode value to be set',
    usage: '[seconds]',
    cooldown: 5,
    execute(message, args) {
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
            .setDescription(`Success! The slowmode in this channel is now set to **${args}** seconds!`)
            .setTimestamp()
            .setFooter(footer);
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(noPerms);
        if (!args.length || isNaN(args) || args > 21600) return message.lineReply(invalidArgs);
        message.channel.setRateLimitPerUser(args, `Executed by ${message.author.username}#${message.author.discriminator}`)
            .then(message.lineReply(success))
            .catch(error => {
                if (error.code === 50013) return message.channel.send(`${message.author}, I do not have the correct permissions to perform that task.`);
            });
    }
};