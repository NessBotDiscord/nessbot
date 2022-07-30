const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const Schema = require('../../Schema/welcome-schema');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('delete-welcome')
    .setDescription('usuwa kanał z powitaniami nowych użytkowników.'),
    timeout:5000,
    async execute(client, interaction) {

        const pEmbed = new MessageEmbed()
        .setColor(embedconfig.cerror)
        .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
        .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`ADMINISTRATOR\``)
        .setFooter({ text: embedconfig.footer })
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ embeds: [pEmbed], ephemeral: true })
        }

        Schema.findOne({ wguildId: interaction.guild.id }, async (err, data) => {
            if(!data) return interaction.reply({ content: 'System powitań nie był włączony na tym serwerze!', ephemeral: true })

            if(data) {
                data.delete();
            }
            return interaction.reply({ content: 'Wyłączono system powitań!', ephemeral: true })
        })
    }
}