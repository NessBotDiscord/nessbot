const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Zadaj pytanie i otrzymaj odpowiedź')
    .addStringOption(option => option.setName('pytanie').setDescription('Zadaj pytanie.').setRequired(true)),
    timeout:5000,
    async execute(client, interaction) {

        const question = interaction.options.getString('pytanie');

        const answers = [
        'Tak',
        'Nie',
        'Oczywiście że tak',
        'Oczywiście że nie',
        'Nie mogę Ci udzielić odpowiedzi na to pytanie',
        'Na to pytanie nie da się odpowiedzieć',
        'Na to pytanie nigdy nie będzie odpowiedzi'
        ];

        const gen_num = answers[Math.floor(Math.random() * answers.length)];

        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`Zadano pytanie!`)
        .setDescription(`
            ${emoji['emotka.pytanie']} Pytanie:
            ${emoji['emotka.reply']} \`${question}\`

            ${emoji['emotka.rakieta']} Odpowiedź:
            ${emoji['emotka.reply']} \`${gen_num}\`
        `)

        interaction.reply({ embeds: [embed] })
    }
}