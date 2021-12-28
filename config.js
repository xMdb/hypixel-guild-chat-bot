module.exports = {
   bot: {
      prefix: 'h!', // Deprecated. It can still be used in a guild channel to prevent the message from being sent.
      owner: 'xMdb#7897', // Set this to your Discord username
   },

   ids: {
      owner: '253699775377965056', // Bot owner (to enable dev commands)
      testingServer: '558901518808383488', // Server to test slash commands in (registers in both prod and testing server by default)
      server: '520948670758387722', // Prod server (has guildChannel and trustedRole)
      guildChannel: '833112550970359830', // Server to send and receive Minecraft messages
      trustedRole: '520952297694560276', // Role to access certain restricted commands (currently only "say" command at the moment)
      moderatorRole: '762473575277133824', // Role used for access to moderator commands
   },

   // These messages are pre-set messages for when things go wrong.
   messages: {
      errorDev: 'There was an error while trying to execute that command! Check the console log for more details.',
      errorUserFriendly: 'There was an error while trying to perform that task!',
      noPermissionNormal: 'You do not have the correct permissions to use this command.',
      noPermissionDev: "You shouldn't be using this command.",
      selfNoPermissions: 'Sorry, I do not have the correct permissions to perform that task.',
      // The footer which will be at the bottom of every embed sent by the bot.
      footer: 'Bot by xMdb#7897',
      // An array of all the possible statuses that might be used. It cycles through these at random.
      statuses: [
         'Horus Goes Shopping on Spotify',
         'Hypixel Knights Talent Show Album on repeat',
         'Hypixel Knights Talent Show Album',
         'What Makes You Beautiful Cover on Soundcloud',
         'Demons (Imagine Dragons Cover) on Soundcloud',
         'hitches and iro dying of laughter on Soundcloud',
         '505 (Arctic Monkeys Cover) on Soundcloud',
         "Isabella's Lullaby on Soundcloud",
         'Hotel Yorba (White Stripes Cover) on Soundcloud',
         'Mine Diamonds (MCAP Cover) on Soundcloud',
         'I Miss The Old Meanie on Soundcloud',
         'Payphone (Maroon 5 Cover) on Soundcloud',
      ],
   },

   // These emotes will be used for each corresponding message. These emotes are currently set to custom emotes, and you can get the ID and name of your own by adding a \ before it and sending it. Then, copy and paste the result below.
   emotes: {
      fromDiscord: '<:discord:829596398822883368>',
      getOnline: ':information_source:',
      guildChat: '<a:MC:829592987616804867>',
      guildLevelUp: '<a:join:830746278680985620>',
      joinLeave: '<:hypixel:829640659542867969>',
      memberKicked: '<a:leave:830746292186775592>',
      memberLeave: '<a:leave:830746292186775592>',
      newMember: '<a:join:830746278680985620>',
      promotedDemoted: '<a:rankChange:837570909065314375>',
      questComplete: '<a:join:830746278680985620>',
      questTierComplete: '<a:join:830746278680985620>',
      error: '<:nah:829640042334257202>',
      kicked: '<:nah:829640042334257202>',
   },

   // These are the colours used in embeds.
   colours: {
      error: '#E74C3C',
      success: '#3A783F',
      informational: '#3F51B5',
   },
};
