const Discord = require('discord.js-light');
require('discord-reply');
const bot = new Discord.Client();
const config = require('../../config');
const hastebin = require('hastebin');

module.exports = {
  name: 'eval',
  aliases: ['evaluate', 'run', 'e'],
  description: 'Evaluates JavaScript code (bot owner only)',
  usage: '<code to evaluate>',
  cooldown: 10,
  perms: "Bot Owner",
  execute(message, args, bot) {
    let start = Date.now();

    function clean(text) {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }
    const noperms = new Discord.MessageEmbed()
      .setColor(config.colours.error)
      .setDescription(config.messages.noPermissionDev)
      .setTimestamp()
      .setFooter(`Executed by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
    if (message.author.id !== config.ids.owner) return message.lineReply(noperms);

    const code = args.join(" ");

    try {
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      // Prevent all token leaking
      if (evaled.includes(bot.token)) {
        evaled = evaled.replace(bot.token, "undefined");
      }
      if (evaled.includes(process.env.BOT_TOKEN)) {
        evaled = evaled.replace(process.env.BOT_TOKEN, "undefined");
      }

      let end = Date.now();

      const longRequestEmbed = new Discord.MessageEmbed()
        .setTitle('Evaluate - Result Too Long  📜')
        .setColor(config.colours.informational)
        .setDescription(`Generating Hastebin link!`)
        .setTimestamp()
        .setFooter(`Execution time: ${end - start}ms`, message.author.displayAvatarURL());
      if (evaled.length > 1500) {
        message.channel.send(longRequestEmbed);
        hastebin.createPaste(clean(evaled), {
            raw: false,
            contentType: 'text/plain',
            server: 'https://haste.mgrif.xyz'
          })
          .then(url => message.lineReply(`**Result:** ${url}`))
          .catch(e => console.error(e));
        message.react('<a:discordload:830394342082347058>');
        return;
      }

      const evalEmbed = new Discord.MessageEmbed()
        .setTitle('Evaluate - Completed  ✅')
        .setColor(config.colours.success)
        .addFields({
          name: `Input`,
          value: `\`\`\`js\n${code}\`\`\``
        })
        .addFields({
          name: `Output`,
          value: `\`\`\`yaml\n${clean(evaled)}\`\`\``
        })
        .setTimestamp()
        .setFooter(`Execution time: ${end - start}ms`, message.author.displayAvatarURL());
      message.lineReply(evalEmbed);
      message.react(`✅`);


    } catch (error) {
      message.lineReply(`An error has occured.`);
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Evaluate - Error  ❌')
        .setColor(config.colours.error)
        .addFields({
          name: `Input  📥`,
          value: `\`\`\`js\n${code}\`\`\``
        })
        .addFields({
          name: `Output  📤`,
          value: `\`\`\`fix\n${clean(error)}\`\`\``
        })
        .setTimestamp()
        .setFooter(`Executed by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
      message.channel.send(errorEmbed);
      message.react(`❌`);
    }
  }
};