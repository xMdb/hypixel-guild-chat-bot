const fs = require('fs');
const Discord = require('discord.js');
require('discord-reply');
const config = require('../../config.json');
const chalk = require('chalk');
const footer = (`Bot by xMdb#7897`, message.author.displayAvatarURL())

module.exports = {
    name: 'reload',
    aliases: ['rc', 'reloadcmd'],
    description: 'Reloads a command',
    usage: '[command to reload]',
    slowmode: 100,
    execute(message, args) {
        // Handle user not being bot owner & if no arguments are present
        const noPerms = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`You do not have the correct permissions to use this command.`)
            .setTimestamp()
            .setFooter(footer);
        if (message.author.id !== config.ownerID) {
            return message.lineReply(noPerms);
        }
        const noArgs = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`Please input a command to reload.`)
            .setTimestamp()
            .setFooter(footer);
        if (!args.length) {
            return message.lineReply(noArgs);
        }

        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName);
        const noCmd = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`Sorry, the command **${commandName}** was not found.`)
            .setTimestamp()
            .setFooter(footer);
        if (!command) return message.lineReply(noCmd);
        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));
        delete require.cache[require.resolve(`../${folderName}/${commandName}.js`)];

        try {
            const newCommand = require(`../${folderName}/${commandName}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            const reloadSuccess = new Discord.MessageEmbed()
                .setColor('#3A783F')
                .setDescription(`The command **${commandName}** was successfully reloaded!`)
                .setTimestamp()
                .setFooter(footer);
            message.lineReply(reloadSuccess);
            console.log(chalk.yellowBright(`${commandName} was reloaded.`));
        } catch (error) {
            console.error(error);
            const reloadFailure = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`There was an error while reloading the command **${commandName}**.\n\`\`\`${error}\`\`\``)
                .setTimestamp()
                .setFooter(footer);
            console.error(error);
            message.lineReply(reloadFailure);
        }
    }
};