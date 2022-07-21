const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const botconfig = require('../../config/bot.json');
const emoji = require('../../config/emojis.json');
const link = require('../../config/links.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Pokazuje komendy z danej kategorii'),
    async execute(client, interaction) {

        const embed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setDescription(`
            ${emoji['emotka.witaj']} Witaj ${interaction.user.tag}
            Wybierz z listy poniżej interesującą Cię kategorię!
            ${emoji['emotka.kropka']} Ilość komend: \`25\`
        `)

        const infoEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.pytanie']} Komendy informacyjne`)
        .setDescription(`\`\`\`/avatar\n/bot\n/globalne-ogloszenie\n/help\n/shardinfo\n/aktualizacje\n/zmienne\n/iledo\`\`\`\n${emoji['emotka.kropka']} Łącznie: \`8\``)

        const modEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.moderator']} Komendy moderacyjne`)
        .setDescription(`\`\`\`/addrole\n/ban\n/embed\n/kick\n/removerole\n/clear\`\`\`\n${emoji['emotka.kropka']} Łącznie: \`6\``)

        const funEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.rakieta']} Komendy 4FUN`)
        .setDescription(`\`\`\`/8ball\`\`\`\n${emoji['emotka.kropka']} Łącznie: \`1\``)

        const userEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.person']} Komendy dla użytkownika`)
        .setDescription(`\`\`\`/userinfo\n/opinia\n/serverinfo\n/propozycja\`\`\`\n${emoji['emotka.kropka']} Łącznie: \`4\``)

        const setEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`${emoji['emotka.ustawienia']} Komendy konfiguracyjne`)
        .setDescription(`\`\`\`/delete-suggest\n/set-suggest\n/delete-leave\n/delete-welcome\n/set-leave\n/set-welcome\`\`\`\n${emoji['emotka.kropka']} Łącznie: \`6\``)

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('menu')
					.setPlaceholder('Wybierz kategorię komend')
					.addOptions([
						{
							label: 'Komendy informacyjne',
							description: 'Kliknij, aby zobaczyć komendy informacyjne',
							value: 'info',
                            emoji: `${emoji['emotka.pytanie']}`,
						},
						{
							label: 'Komendy moderacyjne',
							description: 'Kliknij, aby zobaczyć komendy moderacyjne',
							value: 'mod',
                            emoji: `${emoji['emotka.moderator']}`,
						},
                        {
                            label: 'Komendy 4FUN',
                            description: 'Kliknij, aby zobaczyć komendy 4FUN',
                            value: 'fun',
                            emoji: `${emoji['emotka.rakieta']}`,
                        },
                        {
                            label: 'Komendy dla użytkownika',
                            description: 'Kliknij, aby zobaczyć komendy dla użytkownika',
                            value: 'user',
                            emoji: `${emoji['emotka.person']}`,
                        },
                        {
                            label: 'Komendy konfiguracyjne',
                            description: 'Kliknij, aby zobaczyć komendy konfiguracyjne',
                            value: 'settings',
                            emoji: `${emoji['emotka.ustawienia']}`,
                        }
					]),
			);

        interaction.reply({ embeds: [embed], components: [row] })

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU' })

        collector.on('collect', async (collected) => {
            const value = collected.values[0]

            if(value === 'info') {
                collected.reply({ embeds: [infoEmbed], ephemeral: true })
            }

            if(value === 'mod') {
                collected.reply({ embeds: [modEmbed], ephemeral: true })
            }

            if(value === 'fun') {
                collected.reply({ embeds: [funEmbed], ephemeral: true })
            }

            if(value === 'user') {
                collected.reply({ embeds: [userEmbed], ephemeral: true })
            }

            if(value === 'settings') {
                collected.reply({ embeds: [setEmbed], ephemeral: true })
            }
        })
    }
}