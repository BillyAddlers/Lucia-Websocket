const { Client } = require('discord.js');

class LuciaClient extends Client {
    constructor(...args) {
        super(...args);

        this.prefix = process.env.PREFIX;
    }
}

module.exports = LuciaClient;