const Discord = require('discord.js');
require('discord-reply');
const config = require('../../config.json');

module.exports = {
    name: 'slowmode',
    aliases: ['sm', 'setslowmode'],
    description: 'Allows a custom slowmode value to be set',
    usage: '[seconds]',
    cooldown: 5,
    execute(message, args) {
        if (!args.length || isNaN(args)) {
            return message.channel.send(`${message.author}, value not accepted.\nUsage: **${config.prefix}slowmode <seconds>**`);
        }
        if (args > 21600) {
            return message.channel.send(`${message.author}, value not accepted.\nSlowmode length must be **under 6 hours.**`);
        }
        const slowmodeSec = args.join(' ');
        const slowmodeFailure = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`You don't have permission to use this command.`)
            .setTimestamp()
            .setFooter('Bot by xMdb#7897');
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            message.lineReply(slowmodeFailure);
        } else {
            message.lineReply(`Slowmode set to **${slowmodeSec} seconds.**`);
            message.channel.setRateLimitPerUser(slowmodeSec, `Executed by ${message.author.username}#${message.author.discriminator}`).catch(error => {
                if (error.code === 50013) {
                    console.error(error);
                    message.channel.send(`${message.author}, I do not have permission to set the slowmode in this channel.`);
                    return;
                }
            });
        }
    }
};