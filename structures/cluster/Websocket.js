require('dotenv').config()
const EventEmitter = require('events');
const express = require('express');
const http = require('http');
const { urlencoded, json } = require('body-parser');
const hbs = require('express-handlebars');
const { join } = require('path');

class Web extends EventEmitter {
    constructor(options = {}) {
        super();

        this.conf = global.config;
        this.db = global.db;
        this.options = this.mergeDefault(options);
        this.Promise = require('bluebird');
        this.app = express()

        if(this.options.useURLEncoded === 'true') {
            this.app.use(urlencoded({ extended: false }))
        } else if(this.options.useURLEncoded === 'extended') {
            this.app.use(urlencoded({ extended: true }))
        } if(this.options.useURLEncoded === 'false') {
            // do nothing
        } if(!this.options.useURLEncoded) {
            this.app.use(urlencoded({ extended: false }))
        }

        if(this.options.debug === true) {
            console.info('Your app is running on DEBUG MODE, some process will dump more information');
        } else {
            console.info('Your app is running on PRODUCTION MODE');
        }

        if(this.options.useJSON === true) {
            this.app.use(json())
        } else {
            // do nothing
        }
        
        var rootpath = require('app-root-path');
        this.app.use(express.static(join('../../public')))
        this.app.use(function(err, req, res, next) {
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};
			console.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
			res.status(err.status || 500);
			res.render('error');
        })

        this.app.engine('hbs', hbs({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: rootpath + 'src/layout'
        }))

        this.server = this.app.listen(this.options.port, () => {
            console.startup(`${this.conf.nickname} Websocket is listening on port ${this.server.address().port}`);
        })

        (async function processHandler() {
            process.on('unhandledRejection', error => {
                console.error(`Unhandled Rejection Found!:`, error);
            });
        })();

        (async function ping() {
            setInterval(() => {
                http.get(`http://${this.options.projectURL}/ping`);
            }, 200000);
        })
    }

    main() {
        this.app.get('/ping', (req, res) => {
            console.info(Date.now() + "Ping has been received!");
            res.sendStatus(200);
        })
        setInterval(() => {
            http.get(`http://${this.options.projectURL}/ping`);
        }, 280000);
    }

    passport(variableRaw = {}) {
        var Frontend = require('./Passport')
        var variable = this.mergeDefault(variableRaw);
        var ppsession = new Frontend({
            scopes: variable.scopes,
            sessionSecret: variable.sessionSecret,
            sessionResave: variable.sessionResave,
            sessionSaveUnit: variable.sessionSaveUnit,
        })
        ppsession.main(this.app);
    }

    static mergeDefault(given) {
        for (const key in def) {
            if(!has(given, key) || given[key] === undefined) {
                given[key] = def[key];
            } else if(given[key] === Object(given[key])) {
                given[key] = this.mergeDefault(given[key]);
            }
        }
        return given;
    }
}

module.exports = Web;