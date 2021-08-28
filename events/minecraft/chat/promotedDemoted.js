const { toDiscordChat } = require('../../../app');

module.exports = {
   name: 'promotedDemoted',
   async execute(rank, playername, grankChangeType, grank1, grank2) {
      if (playername === 'Guild') return console.log('promotedDemoted debug: Success.');
      toDiscordChat(
         `<a:rankChange:837570909065314375> ${
            rank ?? ''
         }${playername} has been ${grankChangeType} from ${grank1} to ${grank2}.`
      );
   },
};
