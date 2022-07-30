const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Zobacz avatar użytkownika')
    .addUserOption(option => option.setName('użytkownik').setDescription('Wybierz którego użytkownika chcesz zobaczyć avatar')),
    timeout:5000,
    async execute(client, interaction) {

        const user = interaction.options.getUser('użytkownik') || interaction.user;

        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.obrazek']} Avatar użytkownika ${user.tag}`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Pobierz')
            .setEmoji(`${emoji['emotka.rakieta']}`)
            .setStyle('LINK')
            .setURL(user.displayAvatarURL({ size: 4096, dynamic: true }))
        )

        interaction.reply({ embeds: [embed], components: [row] })
    }
}