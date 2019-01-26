require('dotenv').config()
const session  = require('express-session');
const passport = require('passport');
const Strategy = require('passport-discord');
const cookieParser = require('cookie-parser');

class Main {
    constructor(options = {}) {
        super()

        this.options = options;

        passport.serializeUser(function(user, done) {
            done(null, user);
        });
        passport.deserializeUser(function(obj, done) {
            done(null, obj);
        });

        passport.use(new Strategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${this.options.projectURL}/callback`,
            scope: this.options.scopes
        }, function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                return done(null, profile);
            })
        }))
    }

    main(app) {
        app.use(cookieParser());
        app.use(session({
            secret: this.options.sessionSecret,
            resave: this.options.sessionResave,
            saveUninitialized: this.options.sessionSaveUnit
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.get('/login', passport.authenticate('discord', { scope: this.options.scopes }), (req, res) => {});
        app.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => { res.redirect('/profile') });
        app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });
    }
    checkAuth(req, res, next) {
        if(req.isAuthenticated()) return next();
        res.send({ result: 'You\'re not logged in!'});
    }
}

module.exports = Main;