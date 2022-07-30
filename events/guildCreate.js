const { MessageEmbed } = require('discord.js');
const client = require('..');

client.on('guildCreate', async (guild) => {
    const channel = client.channels.cache.get('9895622527912591988');
    const owner = await guild.fetchOwner();
    const embed = new MessageEmbed()
    .setAuthor({
        name: guild.name,
        iconURL: guild.iconURL({ dynamic: true })
    })
    .setDescription(`
    Właściciel: \`${owner.user.tag}\`
    Nazwa: \`${guild.name}\`
    ID: \`${guild.id}\`
    Użytkownicy: \`${guild.members.cache.filter(m => !m.user.bot).size}\`
    Boty: \`${guild.members.cache.filter(m => m.user.bot).size}\`
    `)
    channel.send({ content: 'Nowy Serwer!', embeds: [embed] })
});