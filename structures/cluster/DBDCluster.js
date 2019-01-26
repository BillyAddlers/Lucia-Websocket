const DBD = require('./DBDBase');

const Session = new DBD({
    token: process.env.DBDToken,
    clientID: process.env.CLIENT_ID,
    ownerID: '337028800929857536'
});

module.exports = Session;