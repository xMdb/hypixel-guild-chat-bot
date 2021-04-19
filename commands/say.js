module.exports = {
  name: 'say',
  description: 'Says stuff',
  execute(message, args) {
    const sayMessage = args.join(' ');
    message.delete().catch(O_o => {});
    message.channel.send(sayMessage).catch(error => {
      if (error.code == 50006) {
        message.channel.send(`${message.author}, please input something for me to say.`);
      }
      if (error.code == 50001 || 50013) {
        console.log(error);
        message.channel.send(`${message.author}, I do not have the correct permissions to delete that message. I require the **MANAGE_MESSAGES** permission.`);
      }
    });
  }
};