require('dotenv').config()
const { Collection } = require('discord.js');
const fs = Promise.promisifyAll(require('fs'));
const { join } = require('path');

const Commands = new Collection();
const Aliases = new Collection();

const modules = fs.readdirSync(join('./commands'));
console.startup(`${modules.length} modules detected, starting module circular startup...`);
console.startup(`Initializing modules, this might take a minute. Please wait...`);

for(const module of modules){
    console.startup(`${module} module loaded!`);
    const commandFile = fs.readdirSync(join('./commands', module));
    for(const file of commandFile){
        let plugin = inject(`./commands/${module}/${file}`);
        console.info(`Loading command ${plugin.info.name}`);
        plugin.info.category = module;
        Commands.set(plugin.info.name.toLowerCase(), plugin);
        for(const alias of plugin.info.aliases){
            Aliases.set(alias.toLowerCase(), plugin.info.name.toLowerCase());
        }
    }
}
(async function globalModules() {
    global.Commands = Commands;
    global.Aliases = Aliases;
})();