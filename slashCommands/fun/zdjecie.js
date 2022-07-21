const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const embedconfig = require('../../config/embeds.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('zdjęcie')
        .setDescription('Wyświetla zdjęcia zwierząt')
        .addStringOption(option =>
            option.setName('zdjęcie')
                .setDescription('Wybierz zdjęcie')
                .setRequired(true)
                .addChoices(
                    { name: 'shiba', value: 'shibaimg' },
                )),
    async execute(client, interaction) {

        if (interaction.options.getString('zdjęcie') === 'shibaimg') {
            let res = await fetch(
                "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true"
            );
            let img = (await res.json())[0];

            const shibaEmbed = new MessageEmbed()
                .setColor(embedconfig.cdefault)
                .setTitle('Zdjęcie shiby')
                .setImage(img)

            interaction.reply({ embeds: [shibaEmbed] })
        }
    }
}