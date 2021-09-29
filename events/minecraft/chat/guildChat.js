const { Util } = require('discord.js');
const { minebot, toDiscordChat } = require('../../../app');

module.exports = {
   name: 'guildChat',
   async execute(rank, playername, grank, message) {
      if (playername === minebot.username) return;
      toDiscordChat(`<a:MC:829592987616804867> **${rank ?? ''}${playername}: ${Util.escapeMarkdown(message)}**`);
   },
};
