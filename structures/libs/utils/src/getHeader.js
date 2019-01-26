const path = require('path');
const headerList = require(path.join(require('app-root-path'), './public/assets/static/header.json'));

function getHeader() {
    let result = headerList[Math.floor(Math.random()*headerList.length)%headerList.length]
    return result;
}

module.exports = { getHeader };