const nc = require('node-cmd');
const Discord = require('discord.js-light');
require('discord-reply');
const config = require('../../config');

module.exports = {
    name: 'shutdown',
    aliases: ['kys', 'kill', 'sd', 'end'],
    description: 'Shuts down the bot (bot owner only)',
    usage: ' ',
    cooldown: 10,
    perms: "Bot Owner",
    execute(message) {
        const noPerms = new Discord.MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(config.messages.noPermissionDev)
            .setTimestamp()
            .setFooter(config.messages.footer);
        const success = new Discord.MessageEmbed()
            .setColor(config.colours.informational)
            .setDescription('Process ended. Please restart the bot manually.')
            .setTimestamp()
            .setFooter(config.messages.footer);
        if (message.author.id !== config.ids.owner) return message.lineReply(noPerms);
        message.lineReply(success).then(() => {
            nc.run(`pm2 delete app`);
        });
    }
};