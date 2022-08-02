<br />
<p align="center">
  <a href="https://discord.gg/hk">
    <img src="https://raw.githubusercontent.com/xMdb/hypixel-guild-chat-bot/main/.github/assets/img/gc.png" alt="Hypixel Guild Chat Bot" width="80" height="40">
  </a>
</p>
  <h1 align="center">Hypixel Guild Chat Bot</h1>

  <p align="center">
    A Discord bot used to bridge between Hypixel guild chat to Discord and vice versa.
    <br />
    Open source, with love from xMdb 🤍
    <br />
<p align="center">
  <img alt="License" src="https://img.shields.io/github/license/xMdb/hypixel-guild-chat-bot?color=GREEN&style=for-the-badge">
  <img alt="Lines of Code" src="https://img.shields.io/tokei/lines/github/xMdb/hypixel-guild-chat-bot?color=GREEN&style=for-the-badge">
  <img alt="Stars" src="https://img.shields.io/github/stars/xMdb/hypixel-guild-chat-bot?color=GREEN&style=for-the-badge">
</p>

  <p align="center">
    <a href="https://github.com/xMdb/hypixel-guild-chat-bot/issues">Report a bug</a>
    ·
    <a href="https://github.com/xMdb/hypixel-guild-chat-bot/issues">Request a feature</a>
    ·
        <a href="https://discord.com/users/253699775377965056">Get in touch</a>
  </p>

> :warning: This application will login to Hypixel using Mineflayer which is not a normal Minecraft client, this could result in your Minecraft account getting banned from Hypixel, so use this application at your own risk. I am not liable for any damages and no warranty is provided as outlined in GPL-3.0 License.

-  [❌ Deprecation Notice!](#-deprecation-notice)
-  [Installation](#installation)
   -  [Prerequisites](#prerequisites)
   -  [Initial Setup](#initial-setup)
   -  [Running in the Background](#running-in-the-background)
-  [Acknowledgements](#acknowledgements)
-  [License](#license)

# ❌ Deprecation Notice!

**Please note that this application will not receive any more updates.** This is because of my current real life commitments. I have no time to develop anything. A suitable fork that is available for use is MiscGuild/Jejebecarte's bridge bot here: https://github.com/MiscGuild/bridge

MiscGuild's version is a rewrite of this bot in TypeScript. As a result, it is far superior. Please use it.

About Hychat: it was abandonded because of the reasons above. Its replacement is also MiscGuild.

:)

# Features

> <img src="https://raw.githubusercontent.com/xMdb/hypixel-guild-chat-bot/main/.github/assets/img/discord.png" alt="Hypixel Guild Chat Bot Discord Example">

-  Bridges a Discord channel to Hypixel guild chat.
-  Sends all guild related messages to the Discord channel (when I mean all, I mean **all**).
-  Logs guild joins and leaves through a webhook (/g leave, /g join).
-  Automatic restart and reconnections, making for zero down-time.
-  Contains commands that can be used to control the bot's state, such as powering on and off, and sending chat messages through Discord (bot owner only).
-  Slowmode and "say" commands (send messages as the Discord bot) for trusted users.
-  Log slowmode and "say" command usage through an additional logging webhook.

# How Does It Work?

The bot is a self-hosted application that runs both a Discord bot and a Minecraft bot, which interconnect with each other. This is done using [Discord.js](https://discord.js.org/) and [Mineflayer](https://github.com/PrismarineJS/mineflayer/), two awesome Node.js libraries.

# Who's it for?

This application is for people who are into self-hosting their own applications on server infrastructures or on their own PC. If you don't know how to, don't worry! In the [new version](https://github.com/hychat-mc/hychat), you will be able to host your own fully-featured guild chat bot in just a couple of clicks! Updates will be provided on the [Hychat Twitter](https://twitter.com/hychatmc).

# Installation

## Prerequisites

-  [Git](https://git-scm.com/downloads).
-  [NodeJS](https://nodejs.org/en/).
-  A full access premium Minecraft account that you can use to connect to Hypixel.

## Initial Setup

1. ⭐ Star this repo!
2. Clone the repo into your own directory.

```bash
$ git clone https://github.com/xMdb/hypixel-guild-chat-bot.git
```

3. Enter the new directory and install the NPM packages.

```bash
$ cd hypixel-guild-chat-bot
$ npm install
```

4. Make a new Discord bot account on the [Discord Developer Portal](https://discord.com/developers/applications) and get the bot token.
5. Grant the **Message Intent** for the bot.
6. Generate an OAuth2 URL by going to OAuth2 on the left side of the application dashboard and clicking the URL generator. Add the `bot` and `application.commands` scopes and open the link to invite it.
7. Re-name the `.env.example` file to `.env` and edit the values as instructed.
8. Edit the `config.js` file to your liking. Ensure you have valid IDs and such otherwise the bot will not work.
9. Test the bot.

```bash
$ node app.js
```

**If the bot logs into Hypixel, and you can send and receive messages through Discord, proceed to the next steps!**

## Running in the Background

1. Install PM2 using `npm`.

```bash
$ npm install -g pm2
```

2. Use the npm `start` script to start with PM2.

```bash
$ npm start
```

3. Verify that everything works as expected.

Refer to the [PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/) for more information about PM2.

# Acknowledgements

Parts of this project are forked from:

[mew/discord-hypixel-bridge](https://github.com/mew/discord-hypixel-bridge) under GPL-3.0 License.

[Myzumi/Guild-Bot](https://github.com/Myzumi/Guild-Bot) under Apache-2.0 License.

# License

Hypixel Guild Chat Bot is open-sourced software licensed under the [GPL-3.0 License](https://github.com/xMdb/hypixel-knights-gchat-bot/blob/main/LICENSE).
