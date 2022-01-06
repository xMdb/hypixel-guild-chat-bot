const { toDiscordChat } = require('../../../app');
const config = require('../../../config');
const { Util } = require('discord.js');

module.exports = {
   name: 'promotedDemoted',
   async execute(rank, playername, grankChangeType, grank1, grank2) {
      if (playername === 'Guild') return console.log('promotedDemoted debug: Success.');
      await toDiscordChat(
         `${config.emotes.promotedDemoted} ${
            rank ?? ''
         }${Util.escapeMarkdown(playername)} has been ${grankChangeType} from ${grank1} to ${grank2}.`
      );
   },
};
