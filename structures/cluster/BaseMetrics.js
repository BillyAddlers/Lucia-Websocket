const EventEmitter = require('events');

class Main extends EventEmitter {
    constructor(options = {}) {
        super()
        this.options = this.mergeDefault(options);
        
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

module.exports = Main;