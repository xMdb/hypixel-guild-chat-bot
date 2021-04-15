const nc = require('node-cmd');
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot',
    execute(message, args) {
        const shutdownsuccess = new Discord.MessageEmbed().setColor('#FF0000').setDescription('Process ended. Please restart the bot manually.').setTimestamp().setFooter('Bot by xMdb#7897');
        const shutdownfail = new Discord.MessageEmbed().setColor('#FF0000').setDescription(`${message.author}, you do not have the correct permissions to use this command.`).setTimestamp().setFooter('Bot by xMdb#7897');
        if (message.author.id !== config.ownerID) {
            message.channel.send(shutdownfail);
            return;
        }
        message.channel.send(shutdownsuccess).then(() => {
            nc.run(`pm2 delete 0`);
        });
    }
};