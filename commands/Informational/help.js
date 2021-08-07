const {
  Message,
  Client,
  MessageEmbed
} = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "help",
  aliases: ["h", "cmds", "cmd", "cmdhelp"],
  description: "Displays information about the bot",
  usage: "[command]",
  cooldown: 3,
  perms: "None",
  /**
   * @param {Message} message
   * @param {string[]} args
   * @param {Client} bot
   */
  async execute(message, args, bot) {
    if (args.length > 0) {
      const cmd = args[0].toLowerCase();
      const command = bot.commands.get(cmd);
      if (!command) {
        const noCmd = new MessageEmbed()
          .setDescription(`Sorry, the command **${cmd}** was not found.`)
          .setColor(config.colours.error)
          .setFooter(`For a list of all the commands run ${config.bot.prefix}help`);
        message.reply({
          embeds: [noCmd]
        });
        return;
      }
      const helpEmbed = new MessageEmbed()
        .setTitle(`${bot.user.username} Help | ${normalizeString(command.category)} | ${normalizeString(cmd)}`)
        .setColor(config.colours.informational)
        .setDescription(`\n\nCommand Arguments:\n - \`[]\` is optional\n - \`<>\` is required\n - \`|\` means \"OR\"\n\n**Do not actually include [], <>, | symbols when using the command!**\n\n`)
        .addField("Usage", `\`\`\`${config.bot.prefix}${cmd} ${command.usage}\`\`\``)
        .addField("Description", `\`\`\`${command.description}\`\`\``)
        .addField("Aliases", `\`${command.aliases.join(", ")}\``, true)
        .addField("Category", `\`${normalizeString(command.category)}\``, true)
        .addField("Permissions Required", `\`${command.perms}\``, true)
        .setFooter(`For a list of all other commands run ${config.bot.prefix}help`);
      message.reply({
        embeds: [helpEmbed]
      });
      return;
    }

    let uniqueCategories = [];

    bot.commands.forEach((command) => {
      if (!uniqueCategories.includes(command.category.toLowerCase())) uniqueCategories.push(command.category.toLowerCase());
    });
    uniqueCategories = uniqueCategories.map((ele) => normalizeString(ele));

    const helpEmbed = new MessageEmbed();
    uniqueCategories.forEach((category) => {
      const commands = bot.commands.filter((ele) => ele.category.toLowerCase() === category.toLowerCase());
      let commandsString = commands.map((ele) => `\`${ele.name}\`,`).join(" ");
      commandsString = commandsString.substring(0, commandsString.length - 1);
      helpEmbed.addField(category, commandsString);
    });

    let dev = config.bot.owner;
    dev = await bot.users.fetch(config.ids.owner).catch((err) => console.error(err));

    helpEmbed
      .setTitle(`Hello! I'm ${bot.user.username}!`)
      .setColor(config.colours.informational)
      .setDescription(`I'm a chat bot that connects Minecraft chat to Discord and vice versa, poorly coded by ${dev} and the [contributors](https://github.com/xMdb/hypixel-guild-chat-bot/graphs/contributors "Click to view contributors on GitHub") on GitHub.\n\nCommand Arguments:\n - \`[]\` is optional\n - \`<>\` is required\n - \`|\` means \"OR\"\n\n**Do not actually include [], <>, | symbols when using the command!**\n\n`)
      .setFooter(`To get more info about a command run ${config.bot.prefix}help <command>`);
    message.reply({
      embeds: [helpEmbed]
    });
  },
};

// something like this --> Something Like This
/**
 * @param {String} str
 */
function normalizeString(str) {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    if (i === 0 || str.charAt(i - 1) === " ") {
      newStr += char.toUpperCase();
    } else {
      newStr += char.toLowerCase();
    }
  }
  return newStr;
}