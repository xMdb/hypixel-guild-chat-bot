// /* eslint-env jest */

// const squid = require('flying-squid');
// const mineflayer = require('mineflayer');
// const regex = require('../func/regex');
// function once(emitter, event, options = {}) {
//    return new Promise(function(resolve, reject) {
//       if (options.array) {
//          emitter.once(event, function(...args) {
//             resolve(args);
//          });
//       } else {
//          emitter.once(event, resolve);
//       }
//       if (!options.ignoreErrors) {
//          emitter.once('error', reject);
//       }
//    });
// }

// (async () => {
//    const serv = squid.createMCServer({
//       motd: 'A Minecraft Server \nRunning flying-squid',
//       port: 0,
//       'max-players': 10,
//       'online-mode': false,
//       logging: false,
//       gameMode: 1,
//       difficulty: 1,
//       worldFolder: undefined,
//       generation: {
//          name: 'superflat',
//          options: {
//             worldHeight: 80,
//             seed: 2116746182,
//          },
//       },
//       kickTimeout: 10000,
//       plugins: {},
//       modpe: false,
//       'view-distance': 2,
//       'player-list-text': {
//          header: { text: 'aaaaaaaa' },
//          footer: { text: 'Test server' },
//       },
//       'everybody-op': true,
//       'max-entities': 100,
//       version: '1.16.4',
//    });

//    await once(serv, 'listening');

//    const minebot = mineflayer.createBot({
//       host: 'localhost',
//       port: serv.port,
//       username: 'animehoroos',
//       version: '1.16.4',
//    });

//    await minebot.chatAddPattern(regex.guildChat, 'guildChat');
//    await minebot.chatAddPattern(regex.joinLeave, 'joinLeave');
//    await minebot.chatAddPattern(regex.getOnline, 'getOnline');
//    await minebot.chatAddPattern(regex.newMember, 'newMember');
//    await minebot.chatAddPattern(regex.memberLeave, 'memberLeave');
//    await minebot.chatAddPattern(regex.memberKicked, 'memberKicked');
//    await minebot.chatAddPattern(regex.promotedDemoted, 'promotedDemoted');
//    await minebot.chatAddPattern(regex.guildLevelUp, 'guildLevelUp');
//    await minebot.chatAddPattern(regex.questTierComplete, 'questTierComplete');
//    await minebot.chatAddPattern(regex.questComplete, 'questComplete');

//    jest.useFakeTimers();

//    await once(minebot, 'login');

//    describe('chat events', () => {
//       it('gets online users', async () => {
//          await serv.broadcast(`Online Members: 24`);
//          await minebot.on('getOnline', async (numOfOnline) => {
//             minebot.chat(`people online: ${numOfOnline}`);
//             expect(numOfOnline).toEqual(24);
//          });
//       });
//       it('receives guild chat messages', async () => {
//          await serv.broadcast(`Guild > [MVP++] horus [M]: hello world`);
//          await serv.broadcast(`Guild > horus2 [M]: hello world`);
//          await minebot.on('guildChat', async (rank, playername, grank, message) => {
//             minebot.chat(`rank: ${rank}, ign: ${playername}, guild rank: ${grank}, and the message is: ${message}`);
//             expect(rank).toBeDefined();
//             expect(playername).toBeDefined();
//             expect(grank).toBeDefined();
//             expect(message).toEqual('hello world');
//          });
//       });
//       it('detects guild level up', async () => {
//          await serv.broadcast(`                   The Guild has reached Level 72!`);
//          await minebot.on('guildLevelUp', async (level) => {
//             minebot.chat(`guild level: ${level}`);
//             expect(level).toEqual(72);
//          });
//       });
//       it('detects members joining and leaving', async () => {
//          await serv.broadcast(`Guild > bruhMoment joined.`);
//          await serv.broadcast(`Guild > byeMoment left.`);
//          await minebot.on('joinLeave', async (playername, joinLeave) => {
//             minebot.chat(`guild member update: ${playername} ${joinLeave}`);
//             expect(playername).toBeDefined();
//             expect(joinLeave).toBeDefined();
//          });
//       });
//       it('detects if the bot is in a hypixel lobby or not', async () => {
//          await serv.broadcast(` >>> [MVP++] player1 joined the lobby! <<<`);
//          await serv.broadcast(`[MVP++] player2 joined the lobby!`);
//          await serv.broadcast(` >>> [MVP++] spookyPlayer1 spooked into the lobby! <<<`);
//          await serv.broadcast(`[MVP++] spookyPlayer2 spooked into the lobby!`);
//          await minebot.on('lobbyJoin', async () => {
//             minebot.chat(`lobby detected lol`);
//          });
//          await once(minebot, 'lobbyJoin');
//       });
//       it('detects member being kicked', async () => {
//          await serv.broadcast(`yesyes was kicked from the guild by officer!`);
//          await serv.broadcast(`yesyes was kicked from the guild by [MVP+] officer!`);
//          await serv.broadcast(`[MVP++] yesyes was kicked from the guild by officer!`);
//          await serv.broadcast(`[MVP++] yesyes was kicked from the guild by [MVP+] officer!`);
//          await minebot.on('joinLeave', async (rank1, playername1, rank2, playername2) => {
//             minebot.chat(`lmaooo ${rank1}${playername1} was kicked by ${rank2}${playername2}`);
//             expect(rank1).toBeDefined();
//             expect(rank2).toBeDefined();
//             expect(playername1).toBe('yesyes');
//             expect(playername2).toBe('officer');
//          });
//       });
//       afterAll(async () => {
//          serv.quit();
//       });
//    });
// })();
