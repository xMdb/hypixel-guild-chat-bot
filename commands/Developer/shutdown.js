const nc = require('node-cmd');
const Discord = require('discord.js-light');
require('discord-reply');
const config = require('../../config.json');

module.exports = {
    name: 'shutdown',
    aliases: ['kys', 'kill'],
    description: 'Shuts down the bot',
    execute(message, args) {
        const shutdownsuccess = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription('Process ended. Please restart the bot manually.')
            .setTimestamp()
            .setFooter('Bot by xMdb#7897');
        const shutdownfail = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`You do not have the correct permissions to use this command.`)
            .setTimestamp()
            .setFooter('Bot by xMdb#7897');
        if (message.author.id !== config.ownerID) return message.lineReply(shutdownfail);
        message.lineReply(shutdownsuccess).then(() => {
            nc.run(`pm2 stop app`);
        });
    }
};