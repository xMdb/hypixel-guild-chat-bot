require('dotenv').config();
const { WebhookClient, MessageEmbed } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // eslint-disable-line
const { toDiscordChat, bot } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'memberLeave',
   async execute(rank, playername) {
      const guildWebhook = new WebhookClient({
         url: process.env.GUILD_WEBHOOK,
      });
      toDiscordChat(`<a:leave:830746292186775592> ${rank ?? ''}${playername} left the guild.`);
      const unix = Math.round(new Date() / 1000);
      const avatar = `https://cravatar.eu/avatar/${playername}/600.png`;
      const { links } = await fetch(`https://api.slothpixel.me/api/players/${playername}`)
         .then((response) => response.json())
         .catch((error) => console.error(error));
      const memberLeave = new MessageEmbed()
         .setColor(config.colours.error)
         .setAuthor(playername, avatar)
         .setFooter(`A member has left the guild.`)
         .setTimestamp();
      if (playername === 'Guild') return console.log('memberLeave debug: Success.');
      if (links.DISCORD === null) {
         memberLeave.setDescription(`**Left At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: N/A`);
         return guildWebhook.send({ embeds: [memberLeave] });
      }
      const playerDiscord = bot.users.cache.find((user) => user.tag === links.DISCORD);
      memberLeave.setDescription(
         `**Left At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: ${playerDiscord} / ${links.DISCORD}`
      );
      guildWebhook.send({ embeds: [memberLeave] });
   },
};
