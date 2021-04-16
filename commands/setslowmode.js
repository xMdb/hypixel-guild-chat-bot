// module.exports = {
//     name: 'setslowmode',
//     description: 'Sets slow mode',
//     execute(message, args) {
//     message.channel.setRateLimitPerUser(args, `Executed by ${message.author.username}#${message.author.discriminator}`)
//       message.channel.send(`Slow mode now set to **${args} seconds.**`).catch(error => {
//         if (error.code == 50006) {
//           message.channel.send(`${message.author}, please input the slowmode amount in **seconds**.`);
//         }
//         if (error.code == 50013) {
//           message.channel.send(`${message.author}, I do not have the correct permissions to run this command. I require the **MANAGE_CHANNEL** permission.`);
//         }
//       });
//     }
//   };