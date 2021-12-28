module.exports = {
   name: 'message',
   async execute(chatMsg) {
      console.log(chatMsg.toAnsi());
   },
};
