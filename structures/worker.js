const Lucia = require('./cluster/Discord');
const Websocket = require('./cluster/Websocket');
process.on('unhandledRejection', err => {
	if(err.message && err.message.startsWith('Request timed out')) return;
	try {
		let resp = JSON.parse(err.response);
		if(~[0, 10003, 10008, 40005, 50001, 50013].indexOf(resp.code)) return;
		else throw err;
	} catch(err2) {
		console.error(err.stack);
	}
});
process.on('error', err => console.error(err));
process.on('uncaughtException', err => console.error(err));

(async function init() {    
    global.websocket = new Websocket({
        useURLEncoded: 'extended',
        debug: true,
        useJSON: true,
        port: process.env.PORT,
        projectURL: process.env.PROJECT_URL
    });
    global.lucia = new Lucia({
        disableEveryone: true,
        fetchAllMembers: true
    });

    lucia.on('warn', console.warn);
    lucia.on('error', (err) => {
	console.error('Can\'t input script into memory! Error log :' + err.stack);
	    return;
    });
    lucia.prefix = config.get('prefix');
    global.Userbase = require('./cluster/DBDCluster');

    websocket.passport({
        scopes: 'identify',
        sessionSecret: 'lucia kawaii',
        sessionResave: false,
        sessionSaveUnit: false
    });

    var app = websocket.app;
    app.get('/', (req, res) => {
        res.render('index', { title: `Lucia | Lolization Webgate`, header: require('./libs/util').getHeader() });
    });

    lucia.login(process.env.TOKEN)
	.then(console.startup('Constructing additional pylons...'))
	.then(console.startup('Loading core system..'))
    .then(console.startup('This might take a minutes, please wait...'));
    websocket.main();
})();