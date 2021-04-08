const fs = require('fs')
const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('./config.json')
const auth = require('./auth.json')
const mineflayer = require('mineflayer')
const minebot = mineflayer.createBot({
  host: auth.serverIP,
  username: auth.mcEmail,
  password: auth.mcPass,
  version: '1.8.9'
})

bot.on('ready', () => {
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`)
  bot.user.setStatus('online')
  bot.user.setActivity('Horus Goes Shopping on Spotify', { type: 'LISTENING' })
  channel = bot.channels.cache.get(config.channelID)
})

bot.on('guildCreate', guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
})

bot.on('guildDelete', guild => {
  console.log(`Bot removed from: ${guild.name} (id: ${guild.id})`)
})

minebot.on('kicked', console.log)
minebot.on('error', console.log)

// Guild chat pattern
minebot.chatAddPattern(
  /^Guild > (\[.*?\])*.*? ([\w\d]{2,17}).*?( \[.*?\])*.*?: (\w*[A-z0-9_ \.\,;:\-_\/]{1,10000})*$/i, 'guild_chat', 'Guild chat event'
)

// In-game to Discord
minebot.on('guild_chat', (rank, username, grank, message) => {
  bot.guilds.cache.get(config.HKID).channels.cache.get(config.gchatID).send(`<a:MC:829592987616804867> **${rank} ${username}: ${message}**`)
})

// Discord to in-game
bot.on('message', message => {
  if (message.author.id === bot.user.id) return
  minebot.chat(`/gc [DISCORD] ${message.author.username}: ${message.content}`)
  if (username === bot.username) return
  message.channel.send(`<:discord:829596398822883368> **${message.author.username}: ${message.content}**`)
  message.delete()
})

bot.on('message', async message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()
  if (message.author.bot) return
  if (!message.content.startsWith(auth.prefix)) return
  if (message.content.includes(auth.token)) {
    message.replace(bot.token, 'undefined')
  }

  if (!bot.commands.has(command)) return
  try {
    bot.commands.get(command).execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error trying to execute that command! Check the console log for more details.')
  }
})

bot.login(auth.token)
