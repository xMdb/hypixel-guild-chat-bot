const Discord = require('discord.js');
require('discord-reply');
const config = require('../../config.json');
const footer = ('Bot by xMdb#7897')

module.exports = {
    name: 'slowmode',
    aliases: ['sm', 'setslowmode'],
    description: 'Allows a custom slowmode value to be set',
    usage: '[seconds]',
    cooldown: 5,
    execute(message, args) {
        if (!args.length || isNaN(args)) {
            const noArgs = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Please include a value in **seconds** that is below **6 hours**.`)
                .setTimestamp()
                .setFooter(footer);
            return message.lineReply(noArgs);
        }
        if (args > 21600) {
            const largeArgs = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`Slowmode length must be under **6 hours**.`)
                .setTimestamp()
                .setFooter(footer);
            return message.lineReply(largeArgs);
        }
        const slowmodeSec = args.join(' ');
        const slowmodeFailure = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`You don't have permission to use this command.`)
            .setTimestamp()
            .setFooter(footer);
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            message.lineReply(slowmodeFailure);
        } else {
            const slowmodeSuccess = new Discord.MessageEmbed()
                .setColor('#3A783F')
                .setDescription(`Success! The slowmode in this channel is now set to **${slowmodeSec}** seconds!`)
                .setTimestamp()
                .setFooter(footer);
            message.lineReply(slowmodeSuccess);
            message.channel.setRateLimitPerUser(slowmodeSec, `Executed by ${message.author.username}#${message.author.discriminator}`).catch(error => {
                if (error.code === 50013) {
                    console.error(error);
                    message.channel.send(`${message.author}, I do not have the correct permissions to perform that task.`);
                    return;
                }
            });
        }
    }
};