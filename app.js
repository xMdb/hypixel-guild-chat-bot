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
const readline = require('readline');
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});
const chalk = require('chalk');
const { Client, Intents, WebhookClient, MessageEmbed, Collection, Util } = require('discord.js');
const bot = new Client({
   allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
   intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});
const mineflayer = require('mineflayer');
const fetch = require('node-fetch');
const config = require('./config');
const regex = require('./handlers/regex');

// ██████ Discord Bot: Initialization ██████████████████████████████████████████

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
   const event = require(`./events/${file}`);
   if (event.runOnce) {
      bot.once(event.name, (...args) => event.execute(...args));
   } else {
      bot.on(event.name, (...args) => event.execute(...args));
   }
}

bot.commands = new Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
   const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
   for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);
      bot.commands.set(command.name, {
         name: command.name,
         category: folder,
         description: command.description,
         execute: command.execute,
      });
   }
}

async function toDiscordChat(msg) {
   return bot.guilds.cache.get(config.ids.server).channels.cache.get(config.ids.guildChannel).send({
      content: msg,
   });
}

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
      interval: 5000,
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
   });

   rl.on('line', async (input) => {
      minebot.chat(input);
   });

   // —— Bot reconnection message
   setTimeout(() => {
      minebot.chat('/g online');
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
   minebot.chatAddPattern(regex.questComplete, 'questComplete');
   minebot.chatAddPattern(regex.lobbyJoin, 'lobbyJoin');

   // —— Bot reconnection log
   minebot.on('getOnline', (numOfOnline) => {
      toDiscordChat(
         `:information_source: Bot has reconnected to Hypixel. There are **${numOfOnline - 1}** other members online.`
      );
   });

   // ██████ Minecraft -> Discord ███████████████████████████████████████████████

   const guildWebhook = new WebhookClient({
      url: process.env.GUILD_WEBHOOK,
   });

   minebot.on('lobbyJoin', () => {
      console.log(chalk.redBright('Lobby detected: Sending to Limbo.'));
      minebot.chat('/ac \u00a7');
   });

   minebot.on('guildChat', (rank, playername, grank, message) => {
      if (playername === minebot.username) return;
      toDiscordChat(`<a:MC:829592987616804867> **${rank ?? ''}${playername}: ${message}**`);
   });

   // —— Other types of messages -> Discord
   minebot.on('joinLeave', (playername, joinLeave) => {
      if (playername === minebot.username) return;
      toDiscordChat(`<:hypixel:829640659542867969> **${playername} ${joinLeave}.**`);
   });

   minebot.on('newMember', async (rank, playername) => {
      toDiscordChat(`<a:join:830746278680985620> ${rank ?? ''}${playername} joined the guild!`);
      const unix = Math.round(new Date() / 1000);
      const avatar = `https://cravatar.eu/avatar/${playername}/600.png`;
      const { links } = await fetch(`https://api.slothpixel.me/api/players/${playername}`)
         .then((response) => response.json())
         .catch((error) => console.error(error));
      const newMember = new MessageEmbed()
         .setColor(config.colours.success)
         .setAuthor(playername, avatar)
         .setFooter(`A new member joined the guild!`)
         .setTimestamp();
      if (links.DISCORD === null) {
         newMember.setDescription(`**Joined**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: Not Set`);
         return guildWebhook.send({ embeds: [newMember] });
      }
      const playerDiscord = bot.users.cache.find((user) => user.tag === links.DISCORD);
      console.log(`${links.DISCORD} and ${playerDiscord}`);
      newMember.setDescription(
         `**Joined**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: ${playerDiscord} / ${links.DISCORD}`
      );
      guildWebhook.send({ embeds: [newMember] });
   });

   minebot.on('memberLeave', async (rank, playername) => {
      toDiscordChat(`<a:leave:830746292186775592> ${rank ?? ''}${playername} left the guild.`);
      const unix = Math.round(new Date() / 1000);
      const avatar = `https://cravatar.eu/avatar/${playername}/600.png`;
      const { links } = await fetch(`https://api.slothpixel.me/api/players/${playername}`)
         .then((response) => response.json())
         .catch((error) => console.error(error));
      const memberLeave = new MessageEmbed()
         .setColor(config.colours.error)
         .setAuthor(playername, avatar)
         .setFooter(`A member has left the guild.`)
         .setTimestamp();
      if (links.DISCORD === null) {
         memberLeave.setDescription(`**Left At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: N/A`);
         return guildWebhook.send({ embeds: [memberLeave] });
      }
      const playerDiscord = bot.users.cache.find((user) => user.tag === links.DISCORD);
      memberLeave.setDescription(
         `**Left At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: ${playerDiscord} / ${links.DISCORD}`
      );
      guildWebhook.send({ embeds: [memberLeave] });
   });

   minebot.on('memberKicked', async (rank1, playername1, rank2, playername2) => {
      toDiscordChat(
         `<a:leave:830746292186775592> ${rank1 ?? ''}${playername1} was kicked by ${rank2 ?? ''}${playername2}! RIP!`
      );
      const unix = Math.round(new Date() / 1000);
      const avatar = `https://cravatar.eu/avatar/${playername1}/600.png`;
      const { links } = await fetch(`https://api.slothpixel.me/api/players/${playername1}`)
         .then((response) => response.json())
         .catch((error) => console.error(error));
      const memberKicked = new MessageEmbed()
         .setColor(config.colours.error)
         .setAuthor(playername1, avatar)
         .setFooter(`A member was kicked from the guild!`)
         .setTimestamp();
      if (links.DISCORD === null) {
         memberKicked.setDescription(
            `**Kicked At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: N/A\n**Kicked By**: ${playername2}`
         );
         return guildWebhook.send({ embeds: [memberKicked] });
      }
      const playerDiscord = bot.users.cache.find((user) => user.tag === links.DISCORD);
      memberKicked.setDescription(
         `**Left At**: <t:${unix}:F> (<t:${unix}:R>)\n**Discord**: ${playerDiscord} / ${links.DISCORD}\n**Kicked By**: ${playername2}`
      );
      guildWebhook.send({ embeds: [memberKicked] });
   });

   minebot.on('promotedDemoted', (rank, playername, grankChangeType, grank1, grank2) => {
      toDiscordChat(
         `<a:rankChange:837570909065314375> ${
            rank ?? ''
         }${playername} has been ${grankChangeType} from ${grank1} to ${grank2}.`
      );
   });

   minebot.on('guildLevelUp', (level) => {
      toDiscordChat(`<a:join:830746278680985620> **Yay!** The guild has leveled up to **Level ${level}**!`);
   });

   minebot.on('questTierComplete', (tier) => {
      toDiscordChat(
         `<a:join:830746278680985620> **Yay!** The guild has completed **Tier ${tier}** of **this week's Guild Quest**!`
      );
   });

   minebot.on('questComplete', () => {
      toDiscordChat(`<a:join:830746278680985620> **Yay!** The guild has completed **this week's Guild Quest**!`);
   });

   // ██████ Discord -> Minecraft ███████████████████████████████████████████████

   bot.on('messageCreate', async (message) => {
      try {
         if (
            message.author.id === bot.user.id ||
            message.channel.id !== config.ids.guildChannel ||
            message.author.bot ||
            message.content.startsWith(config.bot.prefix) ||
            !message.content.trim().length
         ) {
            return;
         }
         minebot.chat(`/gc ${message.author.username} > ${message.content}`);
         toDiscordChat(
            `<:discord:829596398822883368> **${message.author.username}: ${Util.escapeMarkdown(message.content)}**`
         );
         await message.delete();
      } catch (err) {
         console.log(err);
         message.channel.send({
            content: `**:warning: ${message.author}, there was an error while performing that task.**`,
         });
      }
      if (message.content.startsWith(`/`)) {
         toDiscordChat(`https://media.tenor.com/images/e6cd56fc29e429ff89fef2fd2bdfaae2/tenor.gif`);
      }
   });

   // ██████ Minecraft Bot: Error Handler ███████████████████████████████████████

   const webhook = new WebhookClient({
      url: process.env.ERROR_WEBHOOK,
   });

   minebot.on('error', (error) => {
      console.log(chalk.redBright('Error event fired.'));
      console.error(error);
      webhook.send(`**Minebot: Error** \`\`\`${error}\`\`\``);
      console.log(chalk.redBright('Restarting in 10 seconds.'));
      toDiscordChat(`<:nah:829640042334257202> The bot has encountered an unknown error and will restart shortly.`);
      setTimeout(() => {
         process.exit(1);
      }, 10 * 1000);
   });

   minebot.on('end', (error) => {
      console.log(chalk.redBright('End event fired.'));
      console.error(error);
      console.log(chalk.redBright('Restarting in 15 seconds.'));
      setTimeout(() => {
         process.exit(1);
      }, 15 * 1000);
   });

   minebot.on('kicked', (reason) => {
      console.log(chalk.redBright('The bot was kicked.'));
      console.error(reason);
      webhook.send(`**The bot was kicked. Reason:** \`\`\`${reason}\`\`\``);
      console.log(chalk.redBright('Restarting in 10 seconds.'));
      toDiscordChat(
         `<:nah:829640042334257202> The bot was kicked from the server and will reconnect shortly. Reason: \`\`\`${reason}\`\`\``
      );
      setTimeout(() => {
         process.exit(1);
      }, 10 * 1000);
   });
}

// —— Login the Minecraft bot
if (process.env.ENVIRONMENT === 'prod') {
   setTimeout(() => {
      spawnBot();
   }, 5000);
}

if (process.env.ENVIRONMENT === 'dev') {
   setTimeout(() => {
      console.log(
         chalk.yellowBright(
            'This is where the bot should login to Hypixel.\nYou are seeing this because you have the environment set to dev.'
         )
      );
   }, 5000);
}

if (process.env.ENVIRONMENT === undefined) {
   throw new Error(
      'Please set the ENVIRONMENT value in your .env file to either prod or dev to enable/disable the Minecraft bot.'
   );
}

// ██████ Discord Bot: Command Handler █████████████████████████████████████████

bot.on('interactionCreate', async (interaction) => {
   // —— Run command
   if (!bot.commands.has(interaction.commandName) || !interaction.isCommand()) return;
   try {
      await bot.commands.get(interaction.commandName).execute(interaction, bot);
   } catch (err) {
      const webhook = new WebhookClient({
         url: process.env.ERROR_WEBHOOK,
      });
      console.error(err);
      await interaction.reply({
         content: config.messages.errorDev,
         ephemeral: true,
      });
      webhook.send(`**General command error:** \`\`\`${err}\`\`\``);
   }
});

process.on('uncaughtException', (err) => console.error(err)).on('unhandledRejection', (err) => console.error(err));

// —— Login the bot
bot.login(process.env.BOT_TOKEN);
