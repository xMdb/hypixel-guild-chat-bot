const { toDiscordChat } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'questComplete',
   async execute() {
      await toDiscordChat(`${config.emotes.questComplete} **Yay!** The guild has completed **this week's Guild Quest**!`);
   },
};
