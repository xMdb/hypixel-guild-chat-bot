const { toDiscordChat } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'guildLevelUp',
   async execute(level) {
      await toDiscordChat(`${config.emotes.guildLevelUp} **Yay!** The guild has leveled up to **Level ${level}**!`);
   },
};
