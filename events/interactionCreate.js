const client = require('..');
const { MessageEmbed } = require('discord.js');
const embedconfig = require('../config/embeds.json');
const emoji = require('../config/emojis.json');
const link = require('../config/links.json');
const gbanSchema = require('../Schema/gban-schema');

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand) return

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

    try {
        await slashCommand.execute(client, interaction)
    } catch (err) {
        if (err) console.error(err);
        await interaction.reply({ content: 'Podczas wykonywania polecenia wystąpił błąd!', ephemeral: true })
    }
});