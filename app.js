const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client({
  disableMentions: 'everyone'
});
const config = require('./config.json');
const auth = require('./auth.json');
const mineflayer = require('mineflayer');

// Startup of Discord bot
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
};

bot.on('ready', () => {
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  bot.user.setStatus('online');
  bot.user.setActivity('Horus Goes Shopping on Spotify', {
    type: 'LISTENING'
  });
  channel = bot.channels.cache.get(config.channelID);
});

bot.on('guildCreate', guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

bot.on('guildDelete', guild => {
  console.log(`Bot removed from: ${guild.name} (id: ${guild.id})`);
});

// Startup of Minecraft bot
function createBot() {
  const minebot = mineflayer.createBot({
    host: config.serverIP,
    username: auth.mcEmail,
    password: auth.mcPass,
    version: '1.16.4',
    checkTimeoutInterval: 30 * 1000,
    interval: 5000
  });

  // Send to Limbo on login
  minebot.on('login', () => {
    setTimeout(() => {
      console.log('Logged in.');
      minebot.chat('/ac \u00a7c<3');
    }, 3000)
    console.log('Success!');
  });

  // Display chat in console and send to Limbo again if kicked or something
  minebot.on('message', (chatMsg) => {
    console.log(chatMsg.toAnsi());
    const msg = chatMsg.toString();
    if (msg.endsWith(' joined the lobby!') && msg.includes('[MVP+')) {
      console.log('Sending to Limbo.');
      minebot.chat('/ac \u00a7ca');
    };
  });

  // Guild chat pattern
  minebot.chatAddPattern(
    /^Guild > (\[.*?\])*.*? ([\w\d]{2,17}).*?( \[.*?\])*.*?: (\w*.*.{1,10000})*$/i, 'guild_chat', 'Guild chat event'
  );

  // In-game to Discord
  minebot.on('guild_chat', (rank, playername, grank, message) => {
    if (playername === minebot.username) return;
    bot.guilds.cache.get(config.HKID).channels.cache.get(config.gchatID).send(`<a:MC:829592987616804867> **${rank} ${playername}: ${message}**`);
  });

  // Discord to in-game
  bot.on('message', message => {
    if (message.author.id === bot.user.id) return;
    if (message.channel.id !== config.gchatID || message.author.bot || message.content.startsWith(config.prefix)) return;
    minebot.chat(`/gc ${message.author.username} > ${message.content}`);
    bot.guilds.cache.get(config.HKID).channels.cache.get(config.gchatID).send(`<:discord:829596398822883368> **${message.author.username}: ${message.content}**`);
    message.delete();
  });

  // On guild member join/leave
  minebot.chatAddPattern(
    /^Guild > ([\w\d]{2,17}).*? (\w*[A-z0-9_ \.\,;:\-_\/]{1,10000})*$/i, 'join_leave', 'Join leave event'
  );
  minebot.on('join_leave', (playername, joinleave) => {
    bot.guilds.cache.get(config.HKID).channels.cache.get(config.gchatID).send(`<:hypixel:829640659542867969> **${playername} ${joinleave}**`);
  });

  // Minebot error logging
  minebot.on('error', (error) => console.log(error));
  minebot.on('end', (error) => console.log(error));
  minebot.on('kicked', (error) => {
    setTimeout(() => {
      createBot();
      console.log(error);
      bot.guilds.cache.get(config.errorLogGuildID).channels.cache.get(config.errorLogChannelID).send(`**The bot was kicked!** \`\`\`${error}\`\`\``);
    }, 5000)
  });
}

// Login the bots (duh)
setTimeout(() => {
  createBot();
}, 5000);

// Discord bot stuff
bot.on('message', async message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  if (message.content.includes(auth.token)) {
    message.replace(bot.token, 'undefined');
  };

  if (!bot.commands.has(command)) return;
  try {
    bot.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command! Check the console log for more details.');
    bot.guilds.cache.get(config.errorLogGuildID).channels.cache.get(config.errorLogChannelID).send(`**General command error:** \`\`\`${error}\`\`\``);
  };
});

bot.login(auth.token);