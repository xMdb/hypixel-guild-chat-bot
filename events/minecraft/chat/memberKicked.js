require('dotenv').config();
const { WebhookClient, MessageEmbed } = require('discord.js');
const { toDiscordChat, bot } = require('../../../app');
const getCurrentUnix = require('../../../func/getCurrentUnix');
const getAvatar = require('../../../func/getAvatar');
const getPlayerDiscord = require('../../../func/getPlayerDiscord');

module.exports = {
   name: 'memberKicked',
   async execute(rank1, playername1, rank2, playername2) {
      const guildWebhook = new WebhookClient({
         url: process.env.GUILD_WEBHOOK,
      });
      const unix = getCurrentUnix();
      const avatar = getAvatar(playername1);
      const discordTag = getPlayerDiscord(playername1);

      toDiscordChat(
         `<a:leave:830746292186775592> ${rank1 ?? ''}${playername1} was kicked by ${rank2 ?? ''}${playername2}! RIP!`
      );
      if (playername1 === 'Guild') return console.log('memberKicked debug: Success.');

      const discordObject = bot.users.cache.find((user) => user.tag === discordTag) ?? '';
      const memberKicked = new MessageEmbed()
         .setColor('#F18002')
         .setAuthor(playername1, avatar)
         .setFooter(`A member was kicked from the guild!`)
         .setDescription(
            `**Left At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: ${discordObject} (${discordTag})\n**Kicked By**: ${playername2}`
         )
         .setTimestamp();
      guildWebhook.send({ embeds: [memberKicked] });
   },
};
