require('dotenv').config();
const { WebhookClient, MessageEmbed } = require('discord.js');
const { toDiscordChat, bot } = require('../../../app');
const getCurrentUnix = require('../../../func/getCurrentUnix');
const getAvatar = require('../../../func/getAvatar');
const getPlayerDiscord = require('../../../func/getPlayerDiscord');
const config = require('../../../config');

module.exports = {
   name: 'memberKicked',
   async execute(rank1, playername1, rank2, playername2) {
      const guildWebhook = new WebhookClient({
         url: process.env.GUILD_WEBHOOK,
      });
      const unix = getCurrentUnix();
      const avatar = getAvatar(playername1);
      const discordTag = await getPlayerDiscord(playername1);

      await toDiscordChat(
         `${config.emotes.memberKicked} ${rank1 ?? ''}${playername1} was kicked by ${rank2 ?? ''}${playername2}! RIP!`
      );
      if (playername1 === 'Guild') return console.log('memberKicked debug: Success.');

      const discordObject = bot.users.cache.find((user) => user.tag === discordTag) ?? 'Not Found';
      const memberKicked = new MessageEmbed()
         .setColor('#F18002')
         .setAuthor({ name: playername1, iconURL: avatar })
         .setFooter({ text: `A member was kicked from the guild!` })
         .setDescription(
            `**Left At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: ${discordObject} (${discordTag})\n**Kicked By**: ${playername2}`
         )
         .setTimestamp();
      await guildWebhook.send({ embeds: [memberKicked] });
   },
};
