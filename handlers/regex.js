const regexStrings = {};

// —— Guild chat pattern
regexStrings.guildChat = /^Guild > (\[.*\]\s*)?([\w\d]{2,17}).*?(\[.{1,15}\])?: (.*)$/i;

// —— On guild member join/leave Hypixel
regexStrings.joinLeave = /^Guild > ([\w\d]{2,17}).*? (joined.|left.)*$/i;

// —— Get online guild members
regexStrings.getOnline = /^Online Members: (.+)$/i;

// —— On new guild member
regexStrings.newMember = /^(\[.*\]\s*)?([\w\d]{2,17}).*? joined the guild!$/i;

// —— On member leave guild
regexStrings.memberLeave = /^(\[.*\]\s*)?([\w\d]{2,17}).*? left the guild!$/i;

// —— On member kicked
regexStrings.memberKicked = /^(\[.*\]\s*)?([\w\d]{2,17}).*? was kicked from the guild by (\[.*\]\s*)?([\w\d]{2,17}).*?!$/i;

// —— On member rank change
regexStrings.promotedDemoted = /^(\[.*\]\s*)?([\w\d]{2,17}).*? was (promoted|demoted)* from (.*) to (.*)$/i;

// —— On guild level up
regexStrings.guildLevelUp = /^                   The Guild has reached Level (\d*)!$/i;

// —— On guild quest tier complete
regexStrings.questTierComplete = /^    The guild has completed Tier (\d*) of this week's Guild Quest!$/i;

// —— On guild quest complete
regexStrings.questComplete = {};

module.exports = regexStrings;