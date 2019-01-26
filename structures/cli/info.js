var async = require('async');
var childProcess = require('child_process');

function info() {
	console.log('');
	async.waterfall([
		function (next) {
			var version = require('../../package.json').version;
			console.log('  version:  ' + version);

			console.log('  Node ver: ' + process.version);
			next();
		},
		function (next) {
			var hash = childProcess.execSync('git rev-parse HEAD');
			console.log('  git hash: ' + hash);
			next();
		},
		function (next) {
			var config = require('../../config.json');
			console.log('  database: ' + config.database);
			next();
		},
		function (info, next) {
			var config = require('../../config.json');

			switch (config.database) {
			case 'redis':
				console.log('        version: ' + info.redis_version);
				console.log('        disk sync:  ' + info.rdb_last_bgsave_status);
				break;

			case 'mongo':
				console.log('        version: ' + info.version);
				console.log('        engine:  ' + info.storageEngine);
				break;
			}

			next();
		},
	], function (err) {
		if (err) { throw err; }
		process.exit();
	});
}

exports.info = info;