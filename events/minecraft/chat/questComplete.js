const { toDiscordChat } = require('../../../app');

module.exports = {
   name: 'questComplete',
   async execute() {
      toDiscordChat(`<a:join:830746278680985620> **Yay!** The guild has completed **this week's Guild Quest**!`);
   },
};
