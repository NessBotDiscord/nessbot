const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Pokazuje informacje o serwerze.'),
    async execute(client, interaction) {

        const { guild } = interaction;

        const { memberCount, createdAt } = guild;

        const owner = await guild.members.fetch(guild.ownerId);

        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.pytanie']} Informacje o serwerze ${guild.name}`)
        .setDescription(`
        ・ ${emoji['emotka.wlasciciel']} Właściciel serwera:
           ${emoji['emotka.reply']} ${owner}
        ・ ${emoji['emotka.add']} Data utworzenia serwera:
           ${emoji['emotka.reply']} \`${new Date(createdAt).toLocaleDateString()}\`
        ・ ${emoji['emotka.person']} Ilość osób:
           ${emoji['emotka.reply']} \`${memberCount}\`
        ・ ${emoji['emotka.hasztag']} Ilość kanałów oraz kategorii:
           ${emoji['emotka.reply']} \`${guild.channels.cache.size}\`
        ・ ${emoji['emotka.emotka']} Ilość emotek:
           ${emoji['emotka.reply']} \`${guild.emojis.cache.size}\`
        ・ ${emoji['emotka.rakieta']} Ilość boostów:
           ${emoji['emotka.reply']} \`${guild.premiumSubscriptionCount} || ${guild.premiumTier} Tier\`
        ・ ${emoji['emotka.ban']} Ilość banów:
           ${emoji['emotka.reply']} \`${guild.bans.cache.size}\`
        ・ ${emoji['emotka.ustawienia']} Ilość ról:
           ${emoji['emotka.reply']} \`${guild.roles.cache.size - 1}\`
        ・ ${emoji['emotka.robot']} Ilość botów:
           ${emoji['emotka.reply']} \`${guild.members.cache.filter((m) => m.user.bot).size}\`
        ・ ${emoji['emotka.lock']} ID serwera:
           ${emoji['emotka.reply']} \`${guild.id}\`
        `)

        interaction.reply({ embeds: [embed] })
    }
}

// ${guild.members.cache.filter((m) => m.user.bot).size}