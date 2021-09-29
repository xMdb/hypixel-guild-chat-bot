require('dotenv').config();
const { WebhookClient, MessageEmbed } = require('discord.js');
const { toDiscordChat, bot } = require('../../../app');
const getCurrentUnix = require('../../../func/getCurrentUnix');
const getAvatar = require('../../../func/getAvatar');
const getPlayerDiscord = require('../../../func/getPlayerDiscord');
const config = require('../../../config');

module.exports = {
   name: 'memberLeave',
   async execute(rank, playername) {
      const guildWebhook = new WebhookClient({
         url: process.env.GUILD_WEBHOOK,
      });
      const unix = getCurrentUnix();
      const avatar = getAvatar(playername);
      const discordTag = getPlayerDiscord(playername);

      toDiscordChat(`<a:leave:830746292186775592> ${rank ?? ''}${playername} left the guild.`);
      if (playername === 'Guild') return console.log('memberLeave debug: Success.');

      const discordObject = bot.users.cache.find((user) => user.tag === discordTag) ?? '';
      const memberLeave = new MessageEmbed()
         .setColor(config.colours.error)
         .setAuthor(playername, avatar)
         .setFooter(`A member has left the guild.`)
         .setDescription(`**Left At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: ${discordObject} / ${discordTag}`)
         .setTimestamp();
      guildWebhook.send({ embeds: [memberLeave] });
   },
};
