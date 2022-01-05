const { toDiscordChat } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'questTierComplete',
   async execute(tier) {
      await toDiscordChat(
         `${config.emotes.questTierComplete} **Yay!** The guild has completed **Tier ${tier}** of **this week's Guild Quest**!`
      );
   },
};
