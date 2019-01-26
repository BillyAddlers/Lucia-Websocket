require('dotenv').config()
const { Collection } = require('discord.js');
const fs = Promise.promisifyAll(require('fs'));

const ModelsCollection = new Collection();
const models = fs.readdirSync('./assets/models/');
for(const model of models){
	const name = model.split('.')[0];
	const file = inject(`./assets/models/${model}`);
	ModelsCollection.set(name.toLowerCase(), file);
	console.info(name + 'model loaded!');
}
(async function globalModels() {
    global.Models = ModelsCollection;
})();