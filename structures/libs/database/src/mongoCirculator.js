const mongoose = require('mongoose');

class database {
	constructor(options = {}) {
		this.options = this.mergeDefault(options)

		if(!this.options.url) throw ReferenceError('You need to invoke MongoDB Database Circulator with "url" option!');
		(async function dbInit() {
			mongoose.connect(this.options.url , {
				useNewUrlParser: true
			}).then(() => {
				console.info('MongoDB Open Source Driver connected, succesfully synchronized with database...');   
			}).catch(err => {
				console.error('Could not connect to the database. Exiting now...', err);
				process.exit(1);
			});
			(async function bluebirdfy(mongoose) {
				mongoose.Promise = require('bluebird');
			})(mongoose);
		})();
	}
	static mergeDefault(given) {
        for (const key in def) {
            if(!has(given, key) || given[key] === undefined) {
                given[key] = def[key];
            } else if(given[key] === Object(given[key])) {
                given[key] = Util.mergeDefault(given[key]);
            }
        }
        return given;
    }
}

module.exports = database;