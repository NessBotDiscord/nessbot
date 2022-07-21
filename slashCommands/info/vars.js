const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('zmienne')
    .setDescription('Wyświetla zmienne np do powitań'),
    async execute(client, interaction) {
        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.ustawienia']} Poniżej są rozpisane zmienne`)
        .setDescription(`
            ${emoji['emotka.kropka']} Powitania/Pożegnania:
            ・ \`{user.name}\` - Nick użytkownika np. \`NessBot\`
            ・ \`{user.tag}\` - Nick i # użytkownika np. \`NessBot#0635\`
            ・ \`{user.id}\` - Identyfikator użytkownika np. \`987821547987275857\`
            ${emoji['emotka.rakieta']} Przykład:
            ${emoji['emotka.reply']} \`/set-welcome wiadomość[Witaj {user.name} {user.tag} {user.id}] kanał[#powitania]\`
        `)
        interaction.reply({ embeds: [embed] })
    }   
}