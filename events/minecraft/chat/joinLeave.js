const { minebot, toDiscordChat } = require('../../../app');
const config = require('../../../config');
const { Util } = require('discord.js');

module.exports = {
   name: 'joinLeave',
   async execute(playername, joinLeave) {
      if (playername === minebot.username) return;
      await toDiscordChat(`${config.emotes.joinLeave} **${Util.escapeMarkdown(playername)} ${joinLeave}.**`);
   },
};
