const { toDiscordChat } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'promotedDemoted',
   async execute(rank, playername, grankChangeType, grank1, grank2) {
      if (playername === 'Guild') return console.log('promotedDemoted debug: Success.');
      toDiscordChat(
         `${config.emotes.promotedDemoted} ${
            rank ?? ''
         }${playername} has been ${grankChangeType} from ${grank1} to ${grank2}.`
      );
   },
};
