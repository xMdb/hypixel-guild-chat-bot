const fs = require('fs')
const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('../config.json')

module.exports = {
  name: 'shutdown',
  description: 'Shuts down the bot',
  execute(message, args) {
    const shutdownsuccess = new Discord.MessageEmbed().setColor('#3A783F').setDescription('Process ended. Please restart the bot.').setTimestamp().setFooter('Bot by xMdb#7897')
    const shutdownfail = new Discord.MessageEmbed().setColor('#FF0000').setDescription(`${message.author}, you do not have the correct permissions to use this command.`).setTimestamp().setFooter('Bot by xMdb#7897')
    if (message.author.id !== config.ownerID) {
      message.channel.send(shutdownfail)
      return
    };
    message.channel.send(shutdownsuccess).then(() => {
      process.exit(1)
    })
  }
}