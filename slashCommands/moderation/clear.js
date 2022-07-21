const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Wyczyść wiadomości na kanale')
    .addNumberOption(option => option.setName('ilość').setDescription('Ilość wiadomości które mają zostać usunięte').setRequired(true)),
    async execute(client, interaction) {

        const num = interaction.options.getNumber('ilość');

        const pEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`MANAGE_MESSAGES\``)
            .setFooter({ text: embedconfig.footer })
        
            const bpEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Bot nie posiada permisji aby wykonać to polecenie!\n\nPotrzebna permisja: \`MANAGE_MESSAGES\``)

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply({ embeds: [bpEmbed], ephemeral: true })
        } else if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply({ embeds: [pEmbed], ephemeral: true })
        }

        if(num < 1) return interaction.reply({ content: 'Nie możesz usunąć mniej niż 1 wiadomość!', ephemeral: true })

        if(num > 100) {
            return interaction.reply({ content: 'Nie możesz usunąć więcej niż 100 wiadomości za jednym razem.', ephemeral: true })
        } else {
            try{
                let { size } = await interaction.channel.bulkDelete(num)
                await interaction.reply({ content: `Pomyślnie usunięto ${size} wiadomości`, ephemeral: true })
            } catch(e) {
                console.log(e)
                interaction.reply({ content: 'Nie można usunąć wiadomości starszych niż 14 dni!', ephemeral: true })
            }
        }
    }
}