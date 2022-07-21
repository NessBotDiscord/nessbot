const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');
const link = require('../../config/links.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('opinia')
    .setDescription('Wystaw opinię o bocie')
    .addNumberOption(option => option.setName('ocena').setDescription('Wystaw ocenę numeryczną').setRequired(true))
    .addStringOption(option => option.setName('opinia').setDescription('Napisz opinię o bocie').setRequired(true)),
    async execute(client, interaction) {
        const chynyl = client.channels.cache.get('987995390479577138');

        const num = interaction.options.getNumber('ocena');
        const text = interaction.options.getString('opinia');

        if (num > 10) return interaction.reply({ content: 'Nie możesz wystawić większej oceny niż 10!', ephemeral: true })
        if (num < 1) return interaction.reply({ content: 'Nie możesz wystawić mniejszej oceny niż 1!', ephemeral: true })

        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle('Nowa opinia!')
        .setDescription(`
            Wystawione przez: \`${interaction.user.tag}\`
            
            Ocena: \`${num}\`

            Opinia: \`${text}\`
        `)
        .setFooter({ text: embedconfig.footer })

        chynyl.send({ embeds: [embed] }).then(m => {
            m.react('💙');
        })

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setEmoji(`${emoji['emotka.staff']}`)
            .setLabel('Serwer Wsparcia')
            .setStyle('LINK')
            .setURL(`${link['support.serwer']}`)
        )

        const embed1 = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.gwiazda']} Dziękujemy!`)
        .setDescription(`
            ${emoji['emotka.person']} ${interaction.user.tag}

            ${emoji['emotka.serce']} Dziękujemy za wystawienie nam opinii! opinia znajduje się na serwerze wsparcia.
            Możesz tam dołączyć klikając przycisk poniżej!
        `)

        interaction.reply({ embeds: [embed1], components: [row], ephemeral: true })
    }
}