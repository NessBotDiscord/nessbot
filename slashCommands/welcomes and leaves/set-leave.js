const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const Schema = require('../../Schema/leaves-schema');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-leave')
    .setDescription('Ustawia kanał z pożegnaniami')
    .addStringOption(option => option.setName('wiadomość').setDescription('Ustaw wiadomość pożegnalną').setRequired(true))
    .addChannelOption(option => option.setName('kanał').setDescription('Ustaw kanał na jaki mają przychodzić pożegnania').setRequired(true)),
    timeout:5000,
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

        Schema.findOne({ lguildId: interaction.guild.id }, async (err, data) => {
            if(data) {
                data.lchannelId = channel.id;
                data.leaveMsg = msg;
                data.save();
            } else {
                new Schema({
                    lguildId: interaction.guild.id,
                    leaveMsg: msg,
                    lchannelId: channel.id,
                }).save();
            }
            interaction.reply({ content: `Nowy ustawiony kanał pożegnań to ${channel}`, ephemeral: true })
        })
    }
}