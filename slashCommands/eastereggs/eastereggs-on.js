const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const Schema = require('../../Schema/eastereggs-schema');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eastereggs-on')
    .setDescription('Włącza easter eggi'),
    timeout:5000,
    async execute(client, interaction) {

        const pEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`ADMINISTRATOR\``)
            .setFooter({ text: embedconfig.footer })
        
            const bpEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Bot nie posiada permisji aby wykonać to polecenie!\n\nPotrzebna permisja: \`MANAGE_GUILD\``)

            if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                return interaction.reply({ embeds: [bpEmbed], ephemeral: true })
            } else if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                return interaction.reply({ embeds: [pEmbed], ephemeral: true })
            }

            Schema.findOne({ eguildId: interaction.guild.id }, async (err, data) => {
                if(data) {
                    data.save();
                } else {
                    new Schema({
                        eguildId: interaction.guild.id,
                    }).save();
                }
                interaction.reply({ content: 'Włączono easter eggi.', ephemeral: true })
            })
    }
}