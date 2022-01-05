const { minebot, toDiscordChat } = require('../../../app');
const config = require('../../../config');

module.exports = {
   name: 'joinLeave',
   async execute(playername, joinLeave) {
      if (playername === minebot.username) return;
      await toDiscordChat(`${config.emotes.joinLeave} **${playername} ${joinLeave}.**`);
   },
};
