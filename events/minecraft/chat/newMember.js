require('dotenv').config();
const { WebhookClient, MessageEmbed } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // eslint-disable-line
const { toDiscordChat, bot } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'newMember',
   async execute(rank, playername) {
      const guildWebhook = new WebhookClient({
         url: process.env.GUILD_WEBHOOK,
      });
      toDiscordChat(`<a:join:830746278680985620> ${rank ?? ''}${playername} joined the guild!`);
      const unix = Math.round(new Date() / 1000);
      const avatar = `https://cravatar.eu/avatar/${playername}/600.png`;
      const { links } = await fetch(`https://api.slothpixel.me/api/players/${playername}`)
         .then((response) => response.json())
         .catch((error) => console.error(error));
      const newMember = new MessageEmbed()
         .setColor(config.colours.success)
         .setAuthor(playername, avatar)
         .setFooter(`A new member joined the guild!`)
         .setTimestamp();
      if (playername === 'Guild') return console.log('newMember debug: Success.');
      if (links.DISCORD === null) {
         newMember.setDescription(`**Joined**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: N/A`);
         return guildWebhook.send({ embeds: [newMember] });
      }
      const playerDiscord = bot.users.cache.find((user) => user.tag === links.DISCORD);
      console.log(`${links.DISCORD} and ${playerDiscord}`);
      newMember.setDescription(
         `**Joined**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: ${playerDiscord} / ${links.DISCORD}`
      );
      guildWebhook.send({ embeds: [newMember] });
   },
};
