module.exports.model = async => {
    require('./src/modelHandler');
}
module.exports.module = async => {
    require('./src/moduleHandler');
}
module.exports.getHeader = () => {
    require('./src/getHeader');
}