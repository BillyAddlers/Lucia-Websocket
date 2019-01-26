const DBDev = require('dbdapi.js');

class Main extends DBDev {
    constructor(options = {}) {
        this.options = options;
        this.Promise = require('bluebird');

        super(options.token, options.clientID, options.ownerID)
    }
    fetchUser = async(id) => {
        var user = await DBD.fetchUser(id);
        return new this.Promise((resolve, reject) => {
            if(!user || user === undefined) { user = 'Unregistered-User#0000' };
            resolve(user);
        })        
    }
    getBot = async (id) => {
        var botData = await DBD.getBot(id);
        return new this.Promise((resolve, reject) => {
            if(!botData || botData === undefined) { botData = 'Unregistered-Bot#0000' };
            resolve(botData);
        })
    }
}

module.exports = Main;

// exports.fetchUser = async (id) => {
//     var user = await DBD.fetchUser(id);
//     return new Promise((resolve, reject) => {
//         if(!user || user === undefined) { user = 'Unregistered-User#0000' };
//         resolve(user);
//     })
// }

// exports.getBot = async (id) => {
//     var botData = await DBD.getBot(id);
//     return new Promise((resolve, reject) => {
//         if(!botData || botData === undefined) { botData = 'Unregistered-Bot#0000' };
//         resolve(botData);
//     })
// }
/*
owner: {
    id: owner.id,
    username: owner.username,
    discriminator: owner.discriminator,
    tag: owner.tag,
    avatar: owner.avatar,
    avatarURL: owner.avatarURL,
    displayAvatarURL: owner.displayAvatarURL,
    bot: owner.bot,
    createdAt: new Date(owner.createdTimestamp),
    createdTimestamp: owner.createdTimestamp,
    bots: owner.bots
},
bot: {
    id: botUser.id,
    username: botUser.username,
    discriminator: botUser.discriminator,
    tag: botUser.tag,
    avatar: botUser.avatar,
    avatarURL: botUser.avatarURL,
    displayAvatarURL: botUser.displayAvatarURL,
    bot: botUser.bot,
    createdAt: new Date(botUser.createdTimestamp),
    createdTimestamp: botUser.createdTimestamp,
    ownedBy: botUser.ownedBy
},
prefix: bodyRaw.prefix,
accepted: bodyRaw.accepted,
claimed: bodyRaw.claimed
*/

/* 
    user = {
    id: body.id,
    username: body.username,
    discriminator: body.discriminator,
    tag: body.tag,
    avatar: body.avatar,
    avatarURL: body.avatarURL,
    displayAvatarURL: body.displayAvatarURL,
    bot: body.bot,
    createdAt: new Date(body.createdTimestamp),
    createdTimestamp: body.createdTimestamp
};
*/