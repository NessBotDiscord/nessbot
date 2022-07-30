const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Zbanuj użytkownika')
    .addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika którego chcesz zbanować').setRequired(true))
    .addStringOption(option => option.setName('powód').setDescription('Podaj powód bana')),
    timeout:5000,
    async execute(client, interaction) {

        const user = interaction.options.getMember('użytkownik');
        const reason = interaction.options.getString('powód') || '\`Nie podano powodu!\``';

        const pEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`BAN_MEMBERS\``)
            .setFooter({ text: embedconfig.footer })
        
            const bpEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Bot nie posiada permisji aby wykonać to polecenie!\n\nPotrzebna permisja: \`BAN_MEMBERS\``)

            if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                return interaction.reply({ embeds: [bpEmbed], ephemeral: true })
            } else if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                return interaction.reply({ embeds: [pEmbed], ephemeral: true })
            }

            if(user.user.id === interaction.user.id) {
                return interaction.reply({ content: 'Nie możesz zbanować siebie!', ephemeral: true })
            } else if(user.user.id === interaction.client.user.id) {
                return interaction.reply({ content: 'Nie możesz zbanować mnie!', ephemeral: true })
            } else if(user.user.id === interaction.guild.ownerId) {
                return interaction.reply({ content: 'Nie możesz zbanować właściciela serwera!', ephemeral: true })
            }

            if (user.roles.highest.position >= interaction.member.roles.highest.position) {
                const upEmbed = new MessageEmbed()
                .setColor(embedconfig.cerror)
                .setTitle(`${emoji['emotka.brakperms']} Nie mogę wykonać tego polecenia!`)
                .setDescription('Osoba którą chcesz zbanować ma taką samą lub wyższą rolę od Ciebie.')
                return interaction.reply({ embeds:[upEmbed], ephemeral: true })
            }

            if(!user.bannable) {
                return interaction.reply({ content: 'Nie mogę zbanować tego użytkownika!', ephemeral: true })
            }

        const banEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle('Zbanowano użytkownika!')
        .setDescription(`
         ・ ${emoji['emotka.moderator']} Moderator:
            ${emoji['emotka.reply']} \`${interaction.user.tag}\`
         ・ ${emoji['emotka.person']} Użytkownik:
            ${emoji['emotka.reply']} \`${user.user.tag}\` || \`${user.id}\`
         ・ ${emoji['emotka.wiadomosc']} Powód:
            ${emoji['emotka.reply']} \`${reason}\`
        `)

        user.ban();
        interaction.reply({ embeds: [banEmbed] })
    }
}