const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shardinfo')
    .setDescription('Wyświetla informacje o shardingu'),
    async execute(client, interaction) {

        const guildCount = await client.shard.fetchClientValues('guilds.cache.size');
        const users = await client.shard.fetchClientValues('users.cache.size');
        const ping = await client.shard.fetchClientValues('ws.ping');

        guildCount.forEach((count, shardId) => {

            const embed = new MessageEmbed()
            .setColor(embedconfig.cdefault)
            .setTitle('Poniżej zobaczysz informacje o shardingu.')
            .setDescription(
                `
                ・ ${emoji['emotka.rakieta']} Używany shard na tym serwerze:
                   ${emoji['emotka.reply']} \`${interaction.guild.shardId}\`
                ・ ${emoji['emotka.serwer']} Serwery:
                   ${emoji['emotka.reply']} \`${count}\`
                ・ ${emoji['emotka.ping']} Ping:
                   ${emoji['emotka.reply']} \`${ping[shardId]}\`
                ・ ${emoji['emotka.person']} Użytkownicy:
                   ${emoji['emotka.reply']} \`${users[shardId]}\`
                `
            )
            interaction.reply({ embeds: [embed] })
        })
    }
}