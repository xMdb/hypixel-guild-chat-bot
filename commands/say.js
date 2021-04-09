const fs = require('fs')
const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('../config.json')

module.exports = {
  name: 'say',
  description: 'Says stuff',
  execute(message, args) {
    const sayMessage = args.join(' ')
    message.delete().catch(O_o => {})
    message.channel.send(sayMessage).catch(error => {
      if (error.code !== 50006) {
        message.channel.send(`${message.author}, please input something for me to say.`);
      }
    });
  }
};