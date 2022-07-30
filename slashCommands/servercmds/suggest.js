const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Schema = require('../../Schema/suggests-schema');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('propozycja')
    .setDescription('Wyślij swoją propozycję!')
    .addStringOption(option => option.setName('tekst').setDescription('Napisz propozycję').setRequired(true)),
    timeout:5000,
    async execute(client, interaction) {

        const msg = interaction.options.getString('tekst');

        Schema.findOne({ guildId: interaction.guild.id }, async (err, data) => {
            if(!data) return interaction.reply({ content: 'Na tym serwerze nie zostały ustawione propozycje!', ephemeral: true });

            const channel = interaction.guild.channels.cache.get(data.channelId);

            const embed = new MessageEmbed()
            .setColor(embedconfig.cdefault)
            .setTitle(`${emoji['emotka.rakieta']} Nowa propozycja!`)
            .setDescription(`
                Została napisana nowa propozycja!

                ${emoji['emotka.kropka']} Osoba pisząca propozycję:
                ${emoji['emotka.reply']} \`${interaction.user.tag}\`

                Propozycja:
                > \`${msg}\`
            `)

            channel.send({ embeds: [embed] }).then(m => {
                m.react('✅');
                m.react('❌');
            })
        })

        const scsEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setDescription('Twoja propozycja została wysłana!')
        interaction.reply({ embeds: [scsEmbed], ephemeral: true })
    }
}