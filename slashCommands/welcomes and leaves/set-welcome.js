const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const Schema = require('../../Schema/welcome-schema');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-welcome')
    .setDescription('Ustawia kanał z powitaniami nowych użytkowników.')
    .addStringOption(option => option.setName('wiadomość').setDescription('Ustaw wiadomość powitalną').setRequired(true))
    .addChannelOption(option => option.setName('kanał').setDescription('Ustaw na jaki kanał mają przychodzić powitania').setRequired(true)),
    async execute(client, interaction) {

        const msg = interaction.options.getString('wiadomość');
        const channel = interaction.options.getChannel('kanał');

        const pEmbed = new MessageEmbed()
        .setColor(embedconfig.cerror)
        .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
        .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`ADMINISTRATOR\``)
        .setFooter({ text: embedconfig.footer })
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ embeds: [pEmbed], ephemeral: true })
        }

        Schema.findOne({ wguildId: interaction.guild.id }, async (err, data) => {
            if(data) {
                data.wchannelId = channel.id;
                data.welcomeMsg = msg;
                data.save();
            } else {
                new Schema({
                    wguildId: interaction.guild.id,
                    wchannelId: channel.id,
                    welcomeMsg: msg,
                }).save();
            }
            interaction.reply({ content: `Nowy ustawiony kanał powitań to: ${channel}`, ephemeral: true })
        })
    }
}