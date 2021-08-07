const {
    MessageEmbed,
    Permissions
} = require('discord.js');
const config = require('../../config');

module.exports = {
    name: 'slowmode',
    aliases: ['sm', 'setslowmode', 'delay', 'slow'],
    description: 'Allows a custom slowmode value to be set',
    usage: '<seconds>',
    cooldown: 5,
    perms: "Moderator",
    /**
     * @param {Message} message
     * @param {string[]} args
     */
    async execute(message, args) {
        const value = args.join(' ');
        const noPermsUser = new MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(config.messages.noPermissionNormal)
            .setTimestamp()
            .setFooter(config.messages.footer);
        const noPermsBot = new MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(config.messages.selfNoPermissions)
            .setTimestamp()
            .setFooter(config.messages.footer);
        const invalidArgs = new MessageEmbed()
            .setColor(config.colours.error)
            .setDescription(`Please include a value in **seconds** that is below **6 hours**.`)
            .setTimestamp()
            .setFooter(config.messages.footer);
        const success = new MessageEmbed()
            .setColor(config.colours.success)
            .setDescription(`Success! The slowmode in this channel is now set to **${value}** seconds!`)
            .setTimestamp()
            .setFooter(config.messages.footer);
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply({
            embeds: [noPermsUser]
        });
        if (!value.length || isNaN(value) || value > 21600) return message.reply({
            embeds: [invalidArgs]
        });
        try {
            await message.channel.setRateLimitPerUser(value, `Executed by ${message.author.username}#${message.author.discriminator}`)
        } catch (error) {
            if (error.code === 50013) return message.reply({
                embeds: [noPermsBot]
            });
        }
        message.reply({
            embeds: [success]
        });
    }
};