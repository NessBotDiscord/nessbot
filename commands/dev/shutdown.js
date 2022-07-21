const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shutdown',
    category: 'dev',
    run: async(client, message, args) => {

        const eembed = new MessageEmbed()
        .setColor(`RED`)
        .setDescription('Nie posiadasz permisji!')
        if (message.author.id !== '452188835405758483') 
        if (message.author.id !== '971079149089349674') return message.reply({ embeds: [eembed] })

        await message.channel.send('Wyłączanie głównego systemu...')
        process.exit();
    }
}