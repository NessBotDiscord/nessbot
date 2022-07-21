const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const Schema = require('../../Schema/suggests-schema');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-suggests')
    .setDescription('Ustawia kanał z propozycjami')
    .addChannelOption(option => option.setName('kanał').setDescription('Ustaw kanał na jaki mają przychodzić propozycje').setRequired(true)),
    async execute(client, interaction) {

        const channel = interaction.options.getChannel('kanał');

        const pEmbed = new MessageEmbed()
        .setColor(embedconfig.cerror)
        .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
        .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`ADMINISTRATOR\``)
        .setFooter({ text: embedconfig.footer })
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ embeds: [pEmbed], ephemeral: true })
        }

        Schema.findOne({ guildId: interaction.guild.id }, async (err, data) => {
            if(data) {
                data.channelId = channel.id;
                data.save();
            } else {
                new Schema({
                    guildId: interaction.guild.id,
                    channelId: channel.id,
                }).save();
            }
            interaction.reply({ content: `Nowy ustawiony kanał propozycji to ${channel}`, ephemeral: true })
        })
    }
}