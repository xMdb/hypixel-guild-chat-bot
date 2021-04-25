const Discord = require('discord.js');
require('discord-reply');

module.exports = {
    name: 'slowmode',
    description: 'Sets slow mode',
    execute(message, args) {
        const slowmodeSec = args.join(' ');
        const slowmodeFailure = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription(`You need the **Manage Channel** permission to use this command.`)
            .setTimestamp()
            .setFooter('Bot by xMdb#7897');
        if (message.member.hasPermission('MANAGE_CHANNEL')) {
            message.lineReply(`Slowmode set to **${slowmodeSec} seconds.**`);
            message.channel.setRateLimitPerUser(slowmodeSec, `Executed by ${message.author.username}#${message.author.discriminator}`).catch(error => {
                if (error.code === 50035) {
                    message.channel.send(`${message.author}, value not accepted. Please input the slowmode amount in **seconds**.`);
                    return;
                }
                if (error.code === 50013) {
                    console.log(error)
                    message.channel.send(`${message.author}, I do not have the correct permissions to run this command. I require the **MANAGE_CHANNEL** permission.`);
                    return;
                }
            })
        } else {
            message.lineReply(slowmodeFailure)
        }
    }
};