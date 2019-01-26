require('dotenv').config()
require('./libs/log');
global.Promise = require('bluebird');

const config = new (require('./libs/config'))();
const db = new (require('./libs/database'))({
    url: process.env.DB_URL
});
const path = require('path');
global.config = config;
global.rootpath = require('app-root-path');
global.inject = rootpath.require;
global.db = db;
global.PackageMeta = require(path.join(rootpath, './package.json'));

require('./worker');
require('./libs/utils').model;
require('./libs/utils').module;