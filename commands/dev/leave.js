const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "wyjdz",
    description: "wyjdz z jakiegos serwrea bota~!",
    run: async(client, message, args) => {
        const eembed = new MessageEmbed()
        .setColor(`RED`)
        .setDescription('Nie posiadasz permisji!')
        if (message.author.id !== '452188835405758483') 
        if (message.author.id !== '971079149089349674') return message.reply({ embeds: [eembed] })

        const serverID = args[0];
        if(!serverID) {
            message.channel.send('Nie podałeś ID serwera.')
            return;
        }

        const serverTarget = client.guilds.cache.get(serverID);
        if(!serverTarget) {
            message.channel.send('Podałeś neprawidłowe ID');
            return
        }

        serverTarget.leave();
        message.channel.send('Pomyslnie wyszedłem zserwera,')
    }
}