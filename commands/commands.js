const fs = require('fs')
const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('../config.json')

module.exports = {
  name: 'commands',
  description: 'Displays useful information',
  execute (message, args) {
    const cmdlist = new Discord.MessageEmbed().setTitle('Current Command List').setColor('#3A783F').setDescription('**' + config.prefix + 'help** - Help me pls\n**' + config.prefix + 'ping** - Displays bot ping\n**' + config.prefix + 'realping** - Displays real ping (not fake)\n**' + config.prefix + 'say** - Says whatever you want').setTimestamp().setTimestamp().setFooter('DM xMdb#7897 for any bugs or suggestions.')
    message.channel.send(cmdlist)
  }
}
