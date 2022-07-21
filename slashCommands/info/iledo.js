const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('iledo')
    .setDescription('Sprawdź ile zostało do świąt'),
    async execute(client, interaction) {

        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.pytanie']} Ile zostało do...?`)
        .setDescription(`
            **2022**
            ${emoji['emotka.kropka']} Wniebowzięcie Najświętszej Maryi Panny: \`15.08\`
            ${emoji['emotka.kropka']} Wszystkich Świętych: \`01.11\`
            ${emoji['emotka.kropka']} Święto Niepodległości: \`11.11\`
            ${emoji['emotka.kropka']} Wigilia: \`24.12\`
            ${emoji['emotka.kropka']} Sylwester: \`31.12\`
            **2023**
            ${emoji['emotka.kropka']} Nowy Rok: \`01.01\`
            ${emoji['emotka.kropka']} Trzech Króli: \`06.01\`
            ${emoji['emotka.kropka']} Walentynki: \`14.02\`
            ${emoji['emotka.kropka']} Dzień Kobiet: \`08.03\`
            ${emoji['emotka.kropka']} Dzień Mężczyzn: \`10.03\`
            ${emoji['emotka.kropka']} Prima Aprilis: \`01.04\`
            ${emoji['emotka.kropka']} Niedziela Palmowa: \`02.04\`
            ${emoji['emotka.kropka']} Wielkanoc: \`09.04\`
            ${emoji['emotka.kropka']} Święto Pracy: \`01.05\`
            ${emoji['emotka.kropka']} Dzień Flagi: \`02.05\`
            ${emoji['emotka.kropka']} Święto Konstytucji: \`03.05\`
            ${emoji['emotka.kropka']} Dzień Matki: \`26.05\`
            ${emoji['emotka.kropka']} Dzień Dziecka: \`01.06\`
            ${emoji['emotka.kropka']} Boże Ciało: \`08.06\`
            ${emoji['emotka.kropka']} Dzień Ojca: \`23.06\`
            ${emoji['emotka.nesslogo']} Urodziny bota: \`23.06\`
            ${emoji['emotka.kropka']} Wniebowzięcie Najświętszej Maryi Panny: \`15.08\`
            ${emoji['emotka.kropka']} Dzień Chłopaka: \`30.09\`
            ${emoji['emotka.kropka']} Dzień Nauczyciela: \`14.10\`
            ${emoji['emotka.kropka']} Wszystkich Świętych: \`1.11\`
            ${emoji['emotka.kropka']} Święto Niepodległości: \`11.11\`
            ${emoji['emotka.kropka']} Wigilia: \`24.12\`
            ${emoji['emotka.kropka']} Sylwester: \`31.12\`
        `)

        interaction.reply({ embeds: [embed] })
    }
}