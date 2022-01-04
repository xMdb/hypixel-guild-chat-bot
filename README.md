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
  <img alt="Commit Activity" src="https://img.shields.io/github/commit-activity/w/xMdb/hypixel-guild-chat-bot?color=GREEN&style=for-the-badge">
</p>

  <p align="center">
    <a href="https://github.com/xMdb/hypixel-guild-chat-bot/issues">Report a bug</a>
    ·
    <a href="https://github.com/xMdb/hypixel-guild-chat-bot/issues">Request a feature</a>
    ·
        <a href="https://discord.com/users/253699775377965056">Get in touch</a>
  </p>

> :warning: This application will login to Hypixel using Mineflayer which is not a normal Minecraft client, this could result in your Minecraft account getting banned from Hypixel, so use this application at your own risk. I am not liable for any damages and no warranty is provided as outlined in GPL-3.0 License.

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Initial Setup](#initial-setup)
  - [Running in the Background](#running-in-the-background)
- [Acknowledgements](#acknowledgements)
- [License](#license)

# Features

> <img src="https://raw.githubusercontent.com/xMdb/hypixel-guild-chat-bot/main/.github/assets/img/discord.png" alt="Hypixel Guild Chat Bot Discord Example">

- Bridges a Discord channel to Hypixel guild chat.
- Sends all guild related messages to the Discord channel (when I mean all, I mean **all**).
- Logs guild joins and leaves through a webhook (/g leave, /g join).
- Automatic restart and reconnections, making for zero down-time.
- Contains commands that can be used to control the bot's state, such as powering on and off, and sending chat messages through Discord (bot owner only).
- Slowmode and "say" commands (send messages as the Discord bot) for trusted users.
- Log slowmode and "say" command usage through an additional logging webhook.

# How Does It Work?

The bot is a self-hosted application that runs both a Discord bot and a Minecraft bot, which interconnect with each other. This is done using [Discord.js](https://discord.js.org/) and [Mineflayer](https://github.com/PrismarineJS/mineflayer/), two awesome Node.js libraries.

# Who's it for?

This application is for people who are into self-hosting their own applications on server infrastructures or on their own PC. Please note that a very [user friendly version is currently in development](https://github.com/xMdb/hypixel-guild-chat-ts). It will only take a couple clicks to start running your own guild chat bot. If you are not comfortable about setting up something like this, then please wait until it is finished. For updates, [follow me on Twitter](https://twitter.com/xMdbMatt) :)

# Installation

## Prerequisites

- [Git](https://git-scm.com/downloads).
- [NodeJS](https://nodejs.org/en/).
- A full access premium Minecraft account that you can use to connect to Hypixel.

## Initial Setup

1. Fork and star this repo.
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
5. Re-name the `.env.example` file to `.env` and edit the values as instructed.
6. Edit the `config.js` file to your liking. Ensure you have valid IDs and such otherwise the bot will not work.
7. Test the bot.
```bash
$ node .
```

**If the bot logs into Hypixel, and you can send and receive messages through Discord, proceed to the next steps!** If you are having trouble getting it working, [open an issue](https://github.com/xMdb/hypixel-guild-chat-bot/issues) or [contact me through Discord](https://discord.com/users/253699775377965056).

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
