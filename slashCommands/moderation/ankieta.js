const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ankieta')
    .setDescription('Tworzy ankietę')
    .addChannelOption(option => option.setName('kanał').setDescription('Kanał na który ma zostać wysłana ankieta').setRequired(true))
    .addStringOption(option => option.setName('tekst').setDescription('Tekst który widnieje na ankiecie').setRequired(true)),
    timeout:5000,
    async execute(client, interaction) {

        const channel = interaction.options.getChannel('kanał');
        const text = interaction.options.getString('tekst');

        const pEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`MANAGE_MESSAGES\``)
            .setFooter({ text: embedconfig.footer })
        
            const bpEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Bot nie posiada permisji aby wykonać to polecenie!\n\nPotrzebna permisja: \`ADD_REACTIONS\``)

            if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                return interaction.reply({ embeds: [bpEmbed], ephemeral: true })
            } else if (!interaction.member.permissions.has(Permissions.FLAGS.ADD_REACTIONS)) {
                return interaction.reply({ embeds: [pEmbed], ephemeral: true })
            }

            const embed = new MessageEmbed()
            .setColor(embedconfig.cdefault)
            .setTitle(`${emoji['emotka.add']} Nowa ankieta!`)
            .setDescription(`
             ・ ${emoji['emotka.person']} Autor ankiety:
                ${emoji['emotka.reply']} \`${interaction.user.tag}\`

            ・ ${emoji['emotka.wiadomosc']} Treść ankiety:
            > ${text}
            `)

            channel.send({ embeds: [embed] }).then(m => {
                m.react('✅')
                m.react('❌')
            })

            interaction.reply({ content: `Pomyślnie wysłano ankietę na kanale <#${channel}>`, ephemeral: true })
    }
}