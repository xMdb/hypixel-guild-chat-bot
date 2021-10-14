const regexStrings = {};

// —— Guild chat pattern
regexStrings.guildChat = /^Guild > (\[.*]\s*)?([\w]{2,17}).*?(\[.{1,15}])?: (.*)$/;

// —— On guild member join/leave Hypixel
regexStrings.joinLeave = /^Guild > ([\w]{2,17}).*? (joined|left)\.$/;

// —— Get online guild members
regexStrings.getOnline = /^Online Members: (\d+)$/;

// —— On new guild member
regexStrings.newMember = /^(\[.*]\s*)?([\w]{2,17}).*? joined the guild!$/;

// —— On member leave guild
regexStrings.memberLeave = /^(\[.*]\s*)?(\w{2,17}).*? left the guild!$/;

// —— On member kicked
regexStrings.memberKicked = /^(\[.*]\s*)?(\w{2,17}).*? was kicked from the guild by (\[.*]\s*)?(\w{2,17}).*?!$/;

// —— On member rank change
regexStrings.promotedDemoted = /^(\[.*]\s*)?([\w]{2,17}).*? was (promoted|demoted) from (.*) to (.*)$/;

// —— On guild level up
regexStrings.guildLevelUp = /^\s{19}The Guild has reached Level (\d*)!$/;

// —— On guild quest tier complete
regexStrings.questTierComplete = /^\s{4}The guild has completed Tier (\d*) of this week's Guild Quest!$/;

// —— On guild quest complete
regexStrings.questComplete = /^\s{11}The guild has completed this week's Guild Quest!$/;

// On lobby join message
regexStrings.lobbyJoin = /^(?:\s>>>\s)?\[.*]\s[\w]{2,17} (?:joined the lobby!|spooked into the lobby!)(?:\s<<<)?$/;

module.exports = regexStrings;
