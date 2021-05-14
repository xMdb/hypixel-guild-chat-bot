/*


    __    __  __    __         ______   __    __        ________   ______   _______  
   |  \  |  \|  \  /  \       /      \ |  \  |  \      |        \ /      \ |       \ 
   | $$  | $$| $$ /  $$      |  $$$$$$\| $$\ | $$       \$$$$$$$$|  $$$$$$\| $$$$$$$\
   | $$__| $$| $$/  $$       | $$  | $$| $$$\| $$         | $$   | $$  | $$| $$__/ $$
   | $$    $$| $$  $$        | $$  | $$| $$$$\ $$         | $$   | $$  | $$| $$    $$
   | $$$$$$$$| $$$$$\        | $$  | $$| $$\$$ $$         | $$   | $$  | $$| $$$$$$$ 
   | $$  | $$| $$ \$$\       | $$__/ $$| $$ \$$$$         | $$   | $$__/ $$| $$      
   | $$  | $$| $$  \$$\       \$$    $$| $$  \$$$         | $$    \$$    $$| $$      
    \$$   \$$ \$$   \$$        \$$$$$$  \$$   \$$          \$$     \$$$$$$  \$$      
                                                                                  
                                                                                  
                                                                                     
   - Discord bot used to connect Minecraft chat to Discord and vice versa by xMdb!

   - This is mainly for the Hypixel Knights Discord server, 
     but you can also easily adapt the code to work in your own server,
     or use it in your own project (mind the GPL-3.0 License).

   - Read more about this bot in the README.md!                                         */



// ██████ Integrations █████████████████████████████████████████████████████████

require('dotenv').config();
const fs = require('fs');
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const chalk = require('chalk');
const Discord = require('discord.js-light');
require('discord-reply');
const bot = new Discord.Client({
  disableMentions: 'everyone',
  cacheGuilds: true,
  cacheChannels: true,
  cacheOverwrites: false,
  cacheRoles: true,
  cacheEmojis: true,
  cachePresences: false
});
const mineflayer = require('mineflayer');

const config = require('./config.json');
const statusList = require("./status.json");
const regex = require('./handlers/regex');

// ██████ Discord Bot: Initialization ██████████████████████████████████████████

bot.cooldowns = new Discord.Collection();
bot.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    bot.commands.set(command.name, command);
  }
}

bot.on('ready', () => {
  console.log(chalk.greenBright('Success! Discord bot is now online.'));
  bot.user.setStatus('dnd');
  bot.user.setActivity('the console window... starting up', {
    type: 'WATCHING'
  });
  setInterval(() => {
    const statusIndex = Math.floor(Math.random() * (statusList.length - 1) + 1);
    bot.user.setActivity(statusList[statusIndex], {
      type: 'LISTENING'
    });
  }, 60000);
});

bot.on('guildCreate', guild => {
  console.log(chalk.greenBright(`New guild joined: \"${guild.name}\" (id: ${guild.id}). This guild has ${guild.memberCount} members!`));
});

bot.on('guildDelete', guild => {
  console.log(chalk.greenBright(`Bot removed from: \"${guild.name}\" (id: ${guild.id})`));
});

// ██████ Minecraft Bot: Initialization ████████████████████████████████████████

function spawnBot() {
  const minebot = mineflayer.createBot({
    username: process.env.MC_USER,
    password: process.env.MC_PASS,
    host: 'hypixel.net',
    version: '1.16.4',
    auth: 'microsoft',
    logErrors: 'true',
    hideErrors: 'false',
    checkTimeoutInterval: 30000,
    interval: 5000
  });

  // ██████ Minecraft Bot: Handler ██████████████████████████████████████████████
  // —— Send to Limbo on login (source: https://github.com/mew/discord-hypixel-bridge)
  minebot.on('login', async () => {
    setTimeout(() => {
      console.log(chalk.greenBright('Logged in.'));
      minebot.chat('/ac \u00a7');
    }, 5000);
    console.log(chalk.greenBright('Successfully joined Hypixel.'));
  });


  // ██████ Console -> Minecraft ███████████████████████████████████████████████
  // —— (source: https://github.com/mew/discord-hypixel-bridge)
  minebot.on('message', async (chatMsg) => {
    console.log(chatMsg.toAnsi());
    const msg = chatMsg.toString();
    if (msg.endsWith(' joined the lobby!') && msg.includes('[MVP+')) {
      console.log(chalk.redBright('Lobby detected: Sending to Limbo.'));
      minebot.chat('/ac \u00a7');
    }
  });

  rl.on('line', async (input) => {
    minebot.chat(input);
  });

  async function toDiscordChat(msg) {
    return bot.guilds.cache.get(config.serverID).channels.cache.get(config.gchatID).send(msg);
  }

  // —— Bot reconnection message
  setTimeout(() => {
    minebot.chat('/g online');
    toDiscordChat(`<:yes:829640052531134464> Bot has reconnected to Discord.`);
  }, 10000);

  // ██████ Minecraft Bot: Chat Patterns ███████████████████████████████████████

  minebot.chatAddPattern(regex.guildChat, 'guildChat');
  minebot.chatAddPattern(regex.joinLeave, 'joinLeave');
  minebot.chatAddPattern(regex.getOnline, 'getOnline');
  minebot.chatAddPattern(regex.newMember, 'newMember');
  minebot.chatAddPattern(regex.memberLeave, 'memberLeave');
  minebot.chatAddPattern(regex.memberKicked, 'memberKicked');
  minebot.chatAddPattern(regex.promotedDemoted, 'promotedDemoted');
  minebot.chatAddPattern(regex.guildLevelUp, 'guildLevelUp');
  minebot.chatAddPattern(regex.questTierComplete, 'questTierComplete');
  // minebot.chatAddPattern(regex.questComplete, 'questComplete');

  // —— Bot reconnection log to Discord (source: https://github.com/Myzumi/Guild-Bot)
  minebot.on('getOnline', (numOfOnline) => {
    let numOfTrueOnline = numOfOnline - 1;
    toDiscordChat(`:information_source: Bot has reconnected to Hypixel. There are **${numOfTrueOnline}** other members online.`);
  });

  // ██████ Minecraft -> Discord ███████████████████████████████████████████████

  minebot.on('guildChat', (rank, playername, grank, message) => {
    if (playername === minebot.username) return;
    if (rank == undefined) {
      return toDiscordChat(`<a:MC:829592987616804867> **${playername}: ${message}**`);
    }
    toDiscordChat(`<a:MC:829592987616804867> **${rank}${playername}: ${message}**`);
  });

  // —— Other types of messages -> Discord
  minebot.on('joinLeave', (playername, joinleave) => {
    if (playername === minebot.username) return;
    toDiscordChat(`<:hypixel:829640659542867969> **${playername} ${joinleave}**`);
  });

  minebot.on('newMember', (rank, playername) => {
    if (rank == undefined) {
      return toDiscordChat(`<a:join:830746278680985620> ${playername} joined the guild!`);
    }
    toDiscordChat(`<a:join:830746278680985620> ${rank}${playername} joined the guild!`);
  });

  minebot.on('memberLeave', (rank, playername) => {
    if (rank == undefined) {
      return toDiscordChat(`<a:leave:830746292186775592> ${playername} left the guild.`);
    }
    toDiscordChat(`<a:leave:830746292186775592> ${rank}${playername} left the guild.`);
  });

  minebot.on('memberKicked', (rank1, playername1, rank2, playername2) => {
    if (rank1 == undefined) {
      return toDiscordChat(`<a:leave:830746292186775592> ${playername1} was kicked by ${rank2}${playername2}! RIP!`);
    }
    toDiscordChat(`<a:leave:830746292186775592> ${rank1}${playername1} was kicked by ${rank2}${playername2}! RIP!`);
  });

  minebot.on('promotedDemoted', (rank, playername, grankChangeType, grank1, grank2) => {
    if (rank == undefined) {
      return toDiscordChat(`<a:rankChange:837570909065314375> ${playername} has been ${grankChangeType} from ${grank1} to ${grank2}.`);
    }
    toDiscordChat(`<a:rankChange:837570909065314375> ${rank}${playername} has been ${grankChangeType} from ${grank1} to ${grank2}.`);
  });

  minebot.on('guildLevelUp', (level) => {
    toDiscordChat(`<a:join:830746278680985620> **Yay!** The guild has leveled up to **Level ${level}**!`);
  });

  minebot.on('questTierComplete', (tier) => {
    toDiscordChat(`<a:join:830746278680985620> **Yay!** The guild has completed **Tier ${tier}** of **this week's Guild Quest**!`);
  });

  // minebot.on('questComplete', (tier) => {
  //   toDiscordChat(`<a:join:830746278680985620> **Yay!** The guild has completed **this week's Guild Quest**!`);
  // });

  // ██████ Discord -> Minecraft ███████████████████████████████████████████████

  bot.on('message', async message => {
    if (message.author.id === bot.user.id ||
      message.channel.id !== config.gchatID ||
      message.author.bot ||
      message.content.startsWith(config.prefix) ||
      message.content === '' ||
      message.content === ' ')
      return;
    minebot.chat(`/gc ${message.author.username} > ${message.content}`);
    toDiscordChat(`<:discord:829596398822883368> **${message.author.username}: ${message.content}**`);
    message.delete().catch(error => {
      if (error.code == 10008) {
        console.log(error);
        message.channel.send(`**:warning: ${message.author}, there was an error while performing that task.**`);
      }
      if (error.code == 50001 || 50013) {
        console.log(error);
        message.channel.send(`**:warning: ${message.author}, I need MANAGE_MESSAGES to perform that task.**`);
      }
    });
  });

  // ██████ Minecraft Bot: Error Handler ███████████████████████████████████████

  const webhook = new Discord.WebhookClient(process.env.ERROR_WEBHOOK_ID, process.env.ERROR_WEBHOOK_TOKEN);

  minebot.on('error', (error) => {
    console.log(chalk.redBright("Error event fired."));
    console.error(error);
    webhook.send(`**Minebot: Error** \`\`\`${error}\`\`\``);
    console.log(chalk.redBright("Restarting in 5 seconds."));
    setTimeout(() => {
      process.exit(1);
    }, 5000);
  });

  minebot.on('end', (error) => {
    console.log(chalk.redBright("End event fired."));
    console.error(error);
    console.log(chalk.redBright("Restarting in 10 seconds."));
    setTimeout(() => {
      process.exit(1);
    }, 10000);
  });

  minebot.on('kicked', (reason) => {
    console.log(chalk.redBright("The bot was kicked."));
    console.error(reason);
    webhook.send(`**The bot was kicked. Reason:** \`\`\`${reason}\`\`\``);
    console.log(chalk.redBright("Restarting in 5 seconds."));
    setTimeout(() => {
      process.exit(1);
    }, 5000);
  });
}

// —— Login the Minecraft bot
setTimeout(() => {
  spawnBot();
}, 5000);

// ██████ Discord Bot: Command Handler █████████████████████████████████████████

bot.on('message', async message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;
  // —— Another token leak prevention method
  if (message.content.includes(process.env.BOT_TOKEN)) {
    message.replace(bot.token, 'undefined');
  }
  // —— Deny command execution in commands
  if (message.channel.type === 'dm') {
    return message.reply('I can\'t execute that command inside DMs!');
  }
  const command = bot.commands.get(commandName) ||
    bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  // —— Discord command cooldowns
  if (!command) return;
  const {
    cooldowns
  } = bot;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime && message.author.id !== config.ownerID) {
      const timeLeft = (expirationTime - now) / 1000;
      const cooldownEmbed = new Discord.MessageEmbed()
        .setTitle(`Woah! Slow down!`)
        .setColor(`#3f51b5`)
        .setDescription(`You\'ll be able to use this command again in **${timeLeft.toFixed(1)} second(s)**`);
      return message.channel.send(cooldownEmbed);
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // —— Execute command and throw an error if anything breaks
  try {
    await command.execute(message, args);
  } catch (err) {
    const webhook = new Discord.WebhookClient(process.env.ERROR_WEBHOOK_ID, process.env.ERROR_WEBHOOK_TOKEN);
    console.error(err);
    message.lineReply('There was an error while trying to execute that command! Check the console log for more details.');
    webhook.send(`**General command error:** \`\`\`${err}\`\`\``);
  }
});

// —— Login the bot
bot.login(process.env.BOT_TOKEN);