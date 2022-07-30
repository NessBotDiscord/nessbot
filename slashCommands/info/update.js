const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aktualizacje')
        .setDescription('Informacje o aktualizacjach'),
        timeout:5000,
    async execute(client, interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ostatnia')
                    .setLabel('Poprzednia')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('teraz')
                    .setLabel('Aktualna')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('nastepna')
                    .setLabel('Następna')
                    .setStyle('PRIMARY')
            )

        const embed = new MessageEmbed()
            .setColor(embedconfig.cdefault)
            .setTitle('Aktualizacje')
            .setDescription(`
            ${emoji['emotka.rakieta']} Cześć! poniżej wiadomości znajdziesz przyciski,
            dzięki którym możesz zobaczyć aktualizacje.
        `)

        const embed1 = new MessageEmbed()
            .setColor(embedconfig.cdefault)
            .setTitle('Poprzednia aktualizacja')
            .setDescription(`
            \`\`\`USER:\n[+] /8ball\n[+] /clear\n[+] /iledo\n[-] /adminpanel\n[/] Naprawiono błędy ze sprawdzeniem wysokości roli użytkownika\n\nDEV:\n[+] /gban\n[+] /shutdown\`\`\`
            `)
            .setFooter({ text: '2.0.6' })

        const embed2 = new MessageEmbed()
            .setColor(embedconfig.cdefault)
            .setTitle('Teraźniejsza aktualizacja')
            .setDescription(`
            \`\`\`[+] /ankieta\n[+] /eastereggs-on\n[+] /eastereggs-off\n[/] naprawiono sporo błędów\n[-] /shardinfo\n[/] /userinfo\`\`\`
        `)
            .setFooter({ text: '2.0.7' })

        const embed3 = new MessageEmbed()
            .setColor(embedconfig.cdefault)
            .setTitle('Plany na następną aktualizację')
            .setDescription(`
                \`\`\`[+] /set-report\n[+] /delete-report\n[+] /report\`\`\`
            `)
            .setFooter({ text: '2.0.8' })

        interaction.reply({ embeds: [embed], components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON' });

        collector.on('collect', async i => {
            if (i.customId === 'ostatnia') {
                await i.reply({ embeds: [embed1], ephemeral: true })
            } else if (i.customId === 'teraz') {
                await i.reply({ embeds: [embed2], ephemeral: true })
            } else if (i.customId === 'nastepna') {
                await i.reply({ embeds: [embed3], ephemeral: true })
            }
        })

        // client.on('interactionCreate', async ButtonInteraction => {
        //     if (!ButtonInteraction.isButton()) return
        //     if (ButtonInteraction.customId === 'ostatnia') {
        //         const wait = require('util').promisify(setTimeout)
        //         await wait(1000)
        //         await ButtonInteraction.reply({ embeds: [embed1], ephemeral: true })
        //     }
        //     if (ButtonInteraction.customId === 'teraz') {
        //         const wait = require('util').promisify(setTimeout)
        //         await wait(1000)
        //         await ButtonInteraction.reply({ embeds: [embed2], ephemeral: true })
        //     }
        //     if (ButtonInteraction.customId === 'nastepna') {
        //         const wait = require('util').promisify(setTimeout)
        //         await wait(1000)
        //         await ButtonInteraction.reply({ embeds: [embed3], ephemeral: true })
        //     }
        // })
    }
}