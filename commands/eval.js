const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');
const auth = require('../auth.json');
const hastebin = require('hastebin');

module.exports = {
  name: 'eval',
  description: 'Evaluates JS code',
  execute(message, args) {
    function clean(text) {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    }
    const footer = (`Command executed by ${message.author.username}#${message.author.discriminator} | Bot by xMdb#7897`);
    const noperms = new Discord.MessageEmbed().setColor('#FF0000').setDescription(`${message.author}, you do not have the correct permissions to use this command.`).setTimestamp().setFooter(footer);
    if (message.author.id !== config.ownerID) {
      message.channel.send(noperms);
      return;
    }
    const code = args.join(" ");
    let evaled = eval(code);
    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

      // Prevent all token leaking
    if (evaled.includes(bot.token)) {
      evaled = evaled.replace(bot.token, "undefined");
      if (evaled.includes(bot.token)) {
        evaled = evaled.replace(bot.token, "undefined");
      }
    }
    if (evaled.includes(auth.token)) {
      evaled = evaled.replace(auth.token, "undefined");

      if (evaled.includes(auth.token)) {
        evaled = evaled.replace(auth.token, "undefined");
      }
    }
    if (evaled.includes('auth.token')) {
      evaled = evaled.replace('auth.token', "undefined");

      if (evaled.includes('auth.token')) {
        evaled = evaled.replace('auth.token', "undefined");
      }
    }

    message.react(`<:yes:829640052531134464>`)
    const evalEmbed = new Discord.MessageEmbed().setTitle('Evaluate - Completed').setColor('#3A783F').setDescription(`\`\`\`${clean(evaled)}\`\`\``).setTimestamp().setFooter(footer);
    message.channel.send(evalEmbed);

    process.on('unhandledRejection', newerror => {
      // // Upload to HasteBin or something (WIP)
      // if (newerror(`DiscordAPIError: Invalid Form Body`)) {
      //   hastebin.createPaste(clean(evaled), {
      //       raw: true,
      //       contentType: 'text/plain',
      //       server: 'https://hastebin.com'
      //     })
      //     // .then(url => message.replace(clean(evaled), url))
      //     .then(url => console.log(url))
      //     .catch(e => console.log(e));
      // }
      message.channel.send(`${message.author}, an error has occured.`);
      message.react(`<:nah:829640042334257202>`);
      const errorEmbed = new Discord.MessageEmbed().setTitle('Evaluate - Error').setColor('#ff0000').setDescription(`\`\`\`${clean(newerror)}\`\`\``).setTimestamp().setFooter(footer);
      message.channel.send(errorEmbed);
    });
  }
};