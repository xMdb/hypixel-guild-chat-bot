const {
  MessageEmbed
} = require('discord.js');
const config = require('../../config');
const hastebin = require('hastebin');

module.exports = {
  name: 'eval',
  aliases: ['evaluate', 'run', 'e'],
  description: 'Evaluates JavaScript code',
  usage: '<code to evaluate>',
  cooldown: 10,
  perms: "Bot Owner",
    /**
   * @param {Message} message
   * @param {string[]} args
   * @param {Client} bot
   */
  execute(message, args, bot) {
    let start = Date.now();

    function clean(text) {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }
    const noperms = new MessageEmbed()
      .setColor(config.colours.error)
      .setDescription(config.messages.noPermissionDev)
      .setTimestamp()
      .setFooter(`Executed by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
    if (message.author.id !== config.ids.owner) return message.reply({
      embeds: [noperms]
    });

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

      const longRequestEmbed = new MessageEmbed()
        .setTitle('Evaluate - Result Too Long  📜')
        .setColor(config.colours.informational)
        .setDescription(`Generating Hastebin link!`)
        .setTimestamp()
        .setFooter(`Execution time: ${end - start}ms`, message.author.displayAvatarURL());
      if (evaled.length > 999) {
        message.channel.send({
          embeds: [longRequestEmbed]
        });
        hastebin.createPaste(clean(evaled), {
            raw: false,
            contentType: 'text/plain',
            server: 'https://haste.zneix.eu/'
          })
          .then(url => message.reply({
            content: `**Result:** ${url}`
          }))
          .catch(e => console.error(e));
        message.react('<a:discordload:830394342082347058>');
        return;
      }

      const evalEmbed = new MessageEmbed()
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
      message.reply({
        embeds: [evalEmbed]
      });
      message.react(`✅`);


    } catch (error) {
      const errorEmbed = new MessageEmbed()
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
      message.reply({
        content: `An error has occurred.`,
        embeds: [errorEmbed]
      })
      message.react(`❌`);
    }
  }
};