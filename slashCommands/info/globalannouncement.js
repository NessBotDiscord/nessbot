const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');
const botconfig = require('../../config/bot.json');
const link = require('../../config/links.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('globalne-ogloszenie')
    .setDescription('Pokazuje globalne ogłoszenie napisane przez programistów'),
    timeout:5000,
    async execute(client, interaction) {

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Serwer Wsparcia')
            .setURL(link['support.serwer'])
            .setStyle('LINK')
            .setEmoji(`${emoji['emotka.staff']}`)
        )

        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setDescription(`
            ${emoji['emotka.edytowane']} Ostatnia edycja: \`18.07.2022\`
            ${emoji['emotka.developer']} Edytowane przez: \`${botconfig.dev1}\`

            ${emoji['emotka.ogloszenie']} 
            No cześć!
            Prosimy was o napisanie opinii o bocie \`/opinia\`
            Jeżeli macie zamiar wystawić ocenę to napiszcie dlaczego tak oceniacie.
            Nie chcemy mieć dobrych lub złych opinii bez większego uzasadnienia.
        `)

        interaction.reply({ embeds: [embed], components: [row] })
    }
}