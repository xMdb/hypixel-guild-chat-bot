const fs = require('fs')
const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('../config.json')

module.exports = {
  name: 'realping',
  description: 'NEGATIVE LATENCY!',
  execute(message, args) {
    const pingcmd = new Discord.MessageEmbed().setTitle('No scam here.').setColor('#3A783F').setDescription(`**Latency**: ${Date.now() - message.createdTimestamp}ms`).setTimestamp().setFooter('Bot by xMdb#7897')
    message.channel.send(pingcmd)
  }
}