const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, version } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const botconfig = require('../../config/bot.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bot')
    .setDescription('Wyświetla statystyki bota'),
    async execute(client, interaction) {

        const uptime = process.uptime();
        const days = Math.floor((uptime % 31536000) / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.round(uptime % 60);
        const botuptime = (days > 0 ? days + 'd : ' : '') + (hours > 0 ? hours + 'g : ' : '') + (minutes > 0 ? minutes + 'm : ' : '') + (seconds > 0 ? seconds + 's' : '');
        

        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle('Informacje o bocie')
        .setDescription(`
            ${emoji['emotka.rakieta']} **STATYSTYKI**
            ・ ${emoji['emotka.serwer']} Serwery:
               ${emoji['emotka.reply']} \`${client.guilds.cache.size}\`
            ・ ${emoji['emotka.person']} Użytkownicy:
               ${emoji['emotka.reply']} \`${client.users.cache.size}\`
            ・ ${emoji['emotka.hasztag']} Kanały:
               ${emoji['emotka.reply']}
            ・ ${emoji['emotka.emotka']} Emotki:
               ${emoji['emotka.reply']} \`${client.emojis.cache.size}\`
            ・ ${emoji['emotka.ping']} Ping:
               ${emoji['emotka.reply']} \`${client.ws.ping} ms\`
            ・ ${emoji['emotka.zegar']} Czas działania:
               ${emoji['emotka.reply']} \`${botuptime}\`
            ・ ${emoji['emotka.ustawienia']} ・ Baza danych: 🟢
            
            ${emoji['emotka.system']} **WERSJE**
            ・ ${emoji['emotka.discordlogo']} Discord.js:
               ${emoji['emotka.reply']} \`${version}\`
            ・ ${emoji['emotka.nodejs']} Node.js:
               ${emoji['emotka.reply']} \`${process.version}\`
            ・ ${emoji['emotka.robot']} Bot:
               ${emoji['emotka.reply']} \`${botconfig.wersja}\`

            ${emoji['emotka.staff']} **ZARZĄD**
            \`${botconfig.dev1}\` ${emoji['emotka.wlasciciel']} | ${emoji['emotka.developer']}
            \`${botconfig.dev2}\` ${emoji['emotka.wlasciciel']} | ${emoji['emotka.developer']}
            \`${botconfig.manager}\` ${emoji['emotka.manager']}
        `)

        interaction.reply({ embeds: [embed] })
    }
}