// const fs = require('fs');
// const Discord = require('discord.js');
// const bot = new Discord.Client();
// const mineflayer = require('mineflayer');
// const config = require('../config.json');

// module.exports = {
//     name: 'send',
//     description: 'Sends command to Hypixel',
//     execute(message, args) {
//         const footer = (`Command executed by ${message.author.username}#${message.author.discriminator} | Bot by xMdb#7897`);
//         const noperms = new Discord.MessageEmbed().setColor('#FF0000').setDescription(`${message.author}, you do not have the correct permissions to use this command.`).setTimestamp().setFooter(footer);

//         if (message.author.id !== config.ownerID) {
//             message.channel.send(noperms);
//             return
//         }

//         const messageToSend = args.join(" ");
//         message.delete().catch(O_o => {});
//         minebot.chat // wtf
//         const sendSuccess = new Discord.MessageEmbed().setTitle('Sent:').setColor('#3A783F').setDescription(`\`\`\`${messageToSend}\`\`\``).setTimestamp().setFooter(footer);
//         message.channel.send(sendSuccess);
//     }
// }