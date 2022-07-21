const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Stwórz wiadomość embed')
    .addChannelOption(option => option.setName('kanał').setDescription('Wybierz kanał na który ma zostać wysłana wiadomość').setRequired(true))
    .addStringOption(option => option.setName('tytuł').setDescription('Podaj tytuł wiadomości').setRequired(true))
    .addStringOption(option => option.setName('opis').setDescription('Podaj opis wiadomości').setRequired(true))
    .addStringOption(option => option.setName('footer').setDescription('Podaj footer wiadomości').setRequired(true)),
    async execute(client, interaction) {

        const channel = interaction.options.getChannel('kanał');
        const title = interaction.options.getString('tytuł');
        const description = interaction.options.getString('opis');
        const footer = interaction.options.getString('footer');

        const permEmbed = new MessageEmbed()
        .setColor(embedconfig.cerror)
        .setTitle('Wystąpił błąd!')
        .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`MANAGE_MESSAGES\``)
        .setFooter({ text: embedconfig.footer })
        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ embeds: [permEmbed], ephemeral: true })

        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(title)
        .setDescription(description)
        .setFooter({ text: footer })

        const embed2 = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle('Udało się!')
        .setDescription(`Pomyślnie wysłano wiadomość embed na kanale ${channel}`)
        .setFooter({ text: embedconfig.footer })

        interaction.reply({ embeds: [embed2], ephemeral: true})

        channel.send({ embeds: [embed] })
    }
}