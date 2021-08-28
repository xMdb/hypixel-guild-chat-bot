const { toDiscordChat } = require('../../../app');

module.exports = {
   name: 'getOnline',
   async execute(numOfOnline) {
      // —— Bot reconnection log
      toDiscordChat(
         `:information_source: Bot has reconnected to Hypixel. There are **${numOfOnline - 1}** other members online.`
      );
   },
};
