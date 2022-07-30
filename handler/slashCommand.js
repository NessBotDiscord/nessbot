const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const chalk = require('chalk');

const { token } = require('../config.json'); //get the token in .env
const guild = '947221749865537536';
const application_id = '1002625965379305583'; //get the application ID in .env

module.exports = (client) => {

    const slashCommands = []; //make a variable

    fs.readdirSync('./slashCommands/').forEach(dir => {
        const slashCommandFiles = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

        for (const file of slashCommandFiles) {
            const slashCommand = require(`../slashCommands/${dir}/${file}`);
            slashCommands.push(slashCommand.data.toJSON());
            if(slashCommand.data.name) { //if the slash command file has a name
                client.slashCommands.set(slashCommand.data.name, slashCommand)
                console.log(file, '-' + chalk.green('Ok')) //check if the file load and log in console
            } else {
                console.log(file, '-' + chalk.red('Error!')) //if the file doesn't have command name, log it error in console
            }
        }
    });

    console.log(chalk.yellow('[SLASHCMDS]') + chalk.green(`Załadowano ${client.slashCommands.size} komend ukośnikowych`))
    
    const rest = new REST({ version: '9' }).setToken(token);

    (async () => {
        try{
            console.log(chalk.yellow('[SLASHCMDS] ') + chalk.yellowBright('Ładowanie komend ukośnikowych'))

            await rest.put(
                Routes.applicationCommands(application_id, guild),
                { body: slashCommands }
            )


            console.log(chalk.yellow('[SLASHCMDS] ') + chalk.green('Pomyślnie załadowano komendy ukośnikowe'))
        } catch (err) {
            console.log(err);
        }
    })();

};
