const fs = require('fs');
const Discord = require('discord.js-light');
require('discord-reply');
const config = require('../../config');
const chalk = require('chalk');

module.exports = {
    name: 'reload',
    aliases: ['rc', 'reloadcmd'],
    description: 'Reloads the provided command file (bot owner only)',
    usage: '<command to reload>',
    cooldown: 10,
    perms: "Bot Owner",
    execute(message, args) {
        // Handle user not being bot owner & if no arguments are present
        const noPerms = new Discord.MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(config.messages.noPermissionDev)
            .setTimestamp()
            .setFooter(`Executed by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
        const noArgs = new Discord.MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(`Please input a command to reload.`)
            .setTimestamp()
            .setFooter(`Executed by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
        if (message.author.id !== config.ids.owner) return message.lineReply(noPerms);
        if (!args.length) return message.lineReply(noArgs);

        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName);

        const noCmd = new Discord.MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(`Sorry, the command **${commandName}** was not found.`)
            .setTimestamp()
            .setFooter(`Executed by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
        if (!command) return message.lineReply(noCmd);

        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));
        delete require.cache[require.resolve(`../${folderName}/${commandName}.js`)];

        try {
            const newCommand = require(`../${folderName}/${commandName}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            const reloadSuccess = new Discord.MessageEmbed()
                .setColor(config.colours.informational)
                .setDescription(`The command **${commandName}** was successfully reloaded.`)
                .setTimestamp()
                .setFooter(`Executed by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
            message.lineReply(reloadSuccess);
            console.log(chalk.yellowBright(`${commandName} was reloaded.`));
        } catch (error) {
            console.error(error);
            const reloadFailure = new Discord.MessageEmbed()
                .setColor(config.colours.error)
                .setDescription(`There was an error while reloading the command **${commandName}**.\n\`\`\`${error}\`\`\``)
                .setTimestamp()
                .setFooter(`Executed by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
            console.error(error);
            message.lineReply(reloadFailure);
        }
    }
};