const client = require('..');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const embedconfig = require('../config/embeds.json');
const emoji = require('../config/emojis.json');
const link = require('../config/links.json');
const gbanSchema = require('../Schema/gban-schema');
const ms = require('ms-prettify').default;

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand) return

    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel('Serwer Wsparcia')
        .setStyle('LINK')
        .setURL(`${link['support.serwer']}`)
    )

    const errEmbed = new MessageEmbed()
    .setColor(embedconfig.cerror)
    .setTitle('Wystąpił błąd...')
    .setDescription(`
    Podczas wykonywania tego polecenia wystąpił błąd.
    Błąd został wysłany do programistów bota, ale żeby przyspieszyć proces jego naprawy zgłoś to na serwerze wsparcia.
    Link do serwera wsparcia jest w przycisku poniżej.
    Aby zgłosić ten błąd na serwerze wsparcia w kategorii **NessBot** odszukaj kanał **pomoc** a następnie stwórz ticketa i opisz błąd.
    `)

    // Gban
    const userID = interaction.user.id;
    const gbanResults = await gbanSchema.findOne({ userID })
    if (gbanResults) {
        interaction.reply({ content: `Jesteś globalnie zbanowany!\n\nPowod: ${gbanResults.reason}\nModerator: ${gbanResults.moderatorID}`, ephemeral: true })
        return;
    }

    if (interaction.guild) {
        client.channels.cache.get(`990347593517269012`).send(`\`"${interaction}" | U: "${interaction.user.tag}" ${interaction.user.id} | CH: ${interaction.channel.id} | S: ${interaction.guild.name} ${interaction.guild.id}\`\n\u200b`);
    } else {
        client.channels.cache.get(`990347593517269012`).send(`\`"${interaction}" | U: "${interaction.user.tag}" ${interaction.user.id}\`\n\u200b`);
    }

    const t = client.timeouts.get(`${interaction.user.id}_${slashCommand.name}`) || 0;

    if(Date.now() - t < 0) return interaction.reply({ content: `Nie możesz teraz użyć tej komendy!\nPonownie będziesz mógł z niej skorzystać za ${ms(t - Date.now(), { till: 'second' })}`, ephemeral: true });

    client.timeouts.set(`${interaction.user.id}_${slashCommand.name}`, Date.now() + (slashCommand.timeout || 0));

    try {
        await slashCommand.execute(client, interaction)
    } catch (err) {
        const errorchannel = client.channels.cache.get('1003049713551016078')

        const errtEmbed = new MessageEmbed()
        .setColor(embedconfig.cerror)
        .setTitle('Error!')
        .setDescription(`
        Użytkownik: \`${interaction.user.tag}\`
        Serwer: \`${interaction.guild.name}\`

        Error: ${err}
        `)
        if (err) console.error(err);
        await errorchannel.send({ embeds: [errtEmbed] })
        await interaction.reply({ embeds: [errEmbed], components: [row], ephemeral: true })
    }
});