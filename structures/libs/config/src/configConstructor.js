require('dotenv').config()
global.inject = require('app-root-path').require;
const Fs = require('fs-extra');
const _ = require('lodash');
const extendify = require('extendify');
const Cache = require('memory-cache');

class Config {
    constructor() {
        if(_.isNull(Cache.get('config'))) {
            Cache.put('config', this.raw());
        }
    }

    raw() {
        try {
            return inject('./structures/core.json');
        } catch (err) {
            if (err.code === 'MODULE_NOT_FOUND') {
                console.error('Configuration file is not detected!');
                console.error('Cancelling startup process!');
                process.exit(1);
            }
            throw err;
        }
    }

    get(key, defaultResponse) {
        let getObject;
        try {
            getObject = _.reduce(_.split(key, '.'), (o, i) => o[i], Cache.get('config'));
        } catch (ex) { _.noop(); }

        if (!_.isUndefined(getObject)) {
            return getObject;
        }

        return (!_.isUndefined(defaultResponse)) ? defaultResponse : undefined;
    }

    save(json, next) {
        if (!json || !_.isObject(json) || _.isNull(json) || !_.keys(json).length) {
            console.error('Invalid JSON was passed to Builder.');
            throw new Error('Invalid JSON was passed to Builder.');
        }

        Fs.writeJson('./structures/core.json', json, { spaces: 2 }, err => {
            if (!err) Cache.put('config', json);
            return next(err);
        });
    }

    modify(object, next) {
        if (!_.isObject(object)) return next(new Error('Function expects an object to be passed.'));

        const deepExtend = extendify({
            inPlace: false,
            arrays: 'replace',
        });
        const modifiedJson = deepExtend(Cache.get('config'), object);

        Fs.writeJson('./structures/core.json', modifiedJson, { spaces: 2 }, err => {
            if (err) return next(err);

            Cache.put('config', modifiedJson);
            return next();
        });
    }
}

module.exports = Config;
