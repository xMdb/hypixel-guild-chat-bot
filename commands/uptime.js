const Discord = require('discord.js');

module.exports = {
    name: 'restart',
    description: 'Restarts the bot',
    execute(message, args) {
        let days = Math.floor(process.uptime() / 86400);
        let hours = Math.floor(process.uptime() / 3600) % 24;
        let minutes = Math.floor(process.uptime() / 60) % 60;
        let seconds = Math.floor(process.uptime() % 60);

        const uptimeEmbed = new Discord.MessageEmbed()
            .setTitle('Bot Uptime')
            .setColor('#3A783F')
            .setDescription(`Time since last restart:\n\n**${days}** day(s)\n**${hours}** hour(s)\n**${minutes}** minute(s)\n**${seconds}** second(s)`)
            .setTimestamp()
            .setFooter('Bot by xMdb#7897');
        message.channel.send(uptimeEmbed);
    }
};