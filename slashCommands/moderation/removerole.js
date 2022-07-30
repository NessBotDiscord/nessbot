const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Odbierz rolę użytkownikowi')
        .addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika któremu chcesz odebrać rolę').setRequired(true))
        .addRoleOption(option => option.setName('rola').setDescription('Wybierz rolę którą chcesz odebrać użytkownikowi').setRequired(true))
        .addStringOption(option => option.setName('powód').setDescription('Podaj powód odebrania roli').setRequired(false)),
        timeout:5000,
    async execute(client, interaction) {

        const member = interaction.options.getMember('użytkownik');
        const role = interaction.options.getRole('rola');
        const reason = interaction.options.getString('powód') || '\`Nie podano powodu\`';

        const pEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`MANAGE_ROLES\``)
            .setFooter({ text: embedconfig.footer })
        
            const bpEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Bot nie posiada permisji aby wykonać to polecenie!\n\nPotrzebna permisja: \`MANAGE_ROLES\``)

            if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                return interaction.reply({ embeds: [bpEmbed], ephemeral: true })
            } else if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                return interaction.reply({ embeds: [pEmbed], ephemeral: true })
            }

            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                const upEmbed = new MessageEmbed()
                .setColor(embedconfig.cerror)
                .setTitle(`${emoji['emotka.brakperms']} Nie mogę wykonać tego polecenia!`)
                .setDescription('Osoba której chcesz zabrać rolę ma taką samą lub wyższą rolę od Ciebie.')
                return interaction.reply({ embeds:[upEmbed], ephemeral: true })
            }

        const embed = new MessageEmbed()
            .setColor(embedconfig.cdefault)
            .setTitle(`${emoji['emotka.ban']}・Usunięto rolę!`)
            .setDescription(`
            ・ ${emoji['emotka.person']} Użytkownik: 
               ${emoji['emotka.reply']} ${member}
            ・ ${emoji['emotka.gwiazda']} Rola:
               ${emoji['emotka.reply']} ${role}
            ・ ${emoji['emotka.wiadomosc']} Powód:
               ${emoji['emotka.reply']} \`${reason}\`
        `)
            .setTimestamp();

        member.roles.remove(role)
        interaction.reply({ embeds: [embed] })
    }
}