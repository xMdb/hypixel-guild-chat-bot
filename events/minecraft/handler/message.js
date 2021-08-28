module.exports = {
   name: 'message',
   async execute(chatMsg) {
      // ██████ Console -> Minecraft ███████████████████████████████████████████████
      // —— (source: https://github.com/mew/discord-hypixel-bridge)
      console.log(chatMsg.toAnsi());
   },
};
