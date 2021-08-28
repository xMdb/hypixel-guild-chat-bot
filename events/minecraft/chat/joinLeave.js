const { minebot, toDiscordChat } = require('../../../app');

module.exports = {
   name: 'joinLeave',
   async execute(playername, joinLeave) {
      if (playername === minebot.username) return;
      toDiscordChat(`<:hypixel:829640659542867969> **${playername} ${joinLeave}.**`);
   },
};
