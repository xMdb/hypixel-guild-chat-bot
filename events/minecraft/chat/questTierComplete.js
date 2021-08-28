const { toDiscordChat } = require('../../../app');

module.exports = {
   name: 'questTierComplete',
   async execute(tier) {
      toDiscordChat(
         `<a:join:830746278680985620> **Yay!** The guild has completed **Tier ${tier}** of **this week's Guild Quest**!`
      );
   },
};
