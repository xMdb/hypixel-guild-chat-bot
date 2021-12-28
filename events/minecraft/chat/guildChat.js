const { Util } = require('discord.js');
const { minebot, toDiscordChat } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'guildChat',
   async execute(rank, playername, grank, message) {
      if (playername === minebot.username) return;
      toDiscordChat(`${config.emotes.guildChat} **${rank ?? ''}${playername}: ${Util.escapeMarkdown(message)}**`);
   },
};
