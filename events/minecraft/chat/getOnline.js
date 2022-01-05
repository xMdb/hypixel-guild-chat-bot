const { toDiscordChat } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'getOnline',
   async execute(numOfOnline) {
      // —— Bot reconnection log
      await toDiscordChat(
         `${config.emotes.getOnline} Bot has reconnected to Hypixel. There are **${numOfOnline - 1}** other members online.`
      );
   },
};
