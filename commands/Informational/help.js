const { Message, Client, MessageEmbed } = require("discord.js-light");
require("discord-reply");
const config = require("../../config");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Displays information about the bot",
  cooldown: 3,
  /**
   *
   * @param {Message} message
   * @param {string[]} args
   * @param {Client} bot
   */
  async execute(message, args, bot) {
    if (args.length > 0) {
      const cmd = args[0].toLowerCase();
      const command = bot.commands.get(cmd);
      if (!command) {
        message.lineReply("Invalid Command!");
        return;
      }

      const embed = new MessageEmbed().setTitle(`Help - **${cmd} command**`).setDescription(command.description).setColor(config.colours.success).setFooter(`For a list of all the commands do ${config.bot.prefix}help`);
      message.lineReply(embed);
      return;
    }

    let uniqueCategories = [];

    bot.commands.forEach((command) => {
      if (!uniqueCategories.includes(command.category.toLowerCase())) uniqueCategories.push(command.category.toLowerCase());
    });
    uniqueCategories = uniqueCategories.map((ele) => normalizeString(ele));

    const embed = new MessageEmbed();
    uniqueCategories.forEach((category) => {
      const commands = bot.commands.filter((ele) => ele.category.toLowerCase() === category.toLowerCase());
      let commandsString = commands.map((ele) => `\`${ele.name}\`,`).join(" ");
      commandsString = commandsString.substring(0, commandsString.length - 1);
      embed.addField(category, commandsString);
    });

    // Mention xMdb in help embed (wont send notification cause embed) if possible
    let xMdbUser = "xMdb#7897";
    xMdbUser = await bot.users.fetch(config.ids.botOwner).catch((err) => console.error("Could not get owners user object"));

    embed
      .setTitle("Hello!")
      .setColor(config.colours.success)
      .setDescription(`I'm a chat bot that connects Minecraft chat to Discord and vice versa, poorly coded by ${xMdbUser} and [contributors](https://github.com/xMdb/hypixel-guild-chat-bot/graphs/contributors).`)
      .setFooter(`To get more info about a command run ${config.bot.prefix}help <command>`);
    message.lineReply(embed);
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

    if (i === 0) {
      newStr += char.toUpperCase();
    } else if (str.charAt(i - 1) === " ") {
      newStr += char.toUpperCase();
    } else {
      newStr += char.toLowerCase();
    }
  }
  return newStr;
}
