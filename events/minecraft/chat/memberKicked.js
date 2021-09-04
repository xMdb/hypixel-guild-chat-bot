require('dotenv').config();
const { WebhookClient, MessageEmbed } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // eslint-disable-line
const { toDiscordChat, bot } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'memberKicked',
   async execute(rank1, playername1, rank2, playername2) {
      const guildWebhook = new WebhookClient({
         url: process.env.GUILD_WEBHOOK,
      });
      toDiscordChat(
         `<a:leave:830746292186775592> ${rank1 ?? ''}${playername1} was kicked by ${rank2 ?? ''}${playername2}! RIP!`
      );
      const unix = Math.round(new Date() / 1000);
      const avatar = `https://cravatar.eu/avatar/${playername1}/600.png`;
      const { links } = await fetch(`https://api.slothpixel.me/api/players/${playername1}`)
         .then((response) => response.json())
         .catch((error) => console.error(error));
      const memberKicked = new MessageEmbed()
         .setColor(config.colours.error)
         .setAuthor(playername1, avatar)
         .setFooter(`A member was kicked from the guild!`)
         .setTimestamp();
      if (playername1 === 'Guild') return console.log('memberKicked debug: Success.');
      if (links.DISCORD === null) {
         memberKicked.setDescription(
            `**Kicked At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: N/A\n**Kicked By**: ${playername2}`
         );
         return guildWebhook.send({ embeds: [memberKicked] });
      }
      const playerDiscord = bot.users.cache.find((user) => user.tag === links.DISCORD);
      memberKicked.setDescription(
         `**Left At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: ${playerDiscord} / ${links.DISCORD}\n**Kicked By**: ${playername2}`
      );
      guildWebhook.send({ embeds: [memberKicked] });
   },
};
