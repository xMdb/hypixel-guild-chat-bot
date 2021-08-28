const { toDiscordChat } = require('../../../app');

module.exports = {
   name: 'guildLevelUp',
   async execute(level) {
      toDiscordChat(`<a:join:830746278680985620> **Yay!** The guild has leveled up to **Level ${level}**!`);
   },
};
