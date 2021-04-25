# Hypixel Knights Chat Bot
Discord bot used to connect Minecraft chat to Discord and vice versa by xMdb!

## How to Use
This is mainly for the Hypixel Knights Discord server, but you can also easily adapt the code to work in your own server, or use it in your own project (mind the [GPL-3.0 License](https://github.com/xMdb/hypixel-knights-gchat-bot/blob/main/LICENSE)).

1. Fork and star this repo
2. Clone it into your own directory
3. Install the latest version of node.js and the required packages using `npm install`
4. Make a new Discord bot account on the [Discord Developer Portal](https://discord.com/developers/applications)
5. Make a .env file in the directory and include the following values:
```
BOT_TOKEN=token goes here
MC_USER=minecraft email goes here
MC_PASS=minecraft password goes here
```
6. Edit the [config.json](https://github.com/xMdb/hypixel-knights-gchat-bot/blob/main/config.json) file and edit all values to your own
7. (REQUIRED) Install pm2 by using `npm install pm2 -g`
8. Start the bot by using `pm2 start app.js`

## Requirements
[Node.js v16](https://nodejs.org/en/)

[discordjs/discord.js](https://github.com/discordjs/discord.js)

[angelo2007/discord-reply](https://www.npmjs.com/package/discord-reply)

[motdotla/dotenv](https://github.com/motdotla/dotenv)

[rahatarmanahmed/hastebin](https://github.com/rahatarmanahmed/hastebin)

[PrismarineJS/mineflayer](https://github.com/PrismarineJS/mineflayer)

[RIAEvangelist/node-cmd](https://github.com/RIAEvangelist/node-cmd)

## Acknowledgements
Parts of this project are forked from:

[mew/discord-hypixel-bridge](https://github.com/mew/discord-hypixel-bridge) under GPL-3.0 License.

[Myzumi/Guild-Bot](https://github.com/Myzumi/Guild-Bot) under Apache-2.0 License.
