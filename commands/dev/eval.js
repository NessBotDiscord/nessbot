const { MessageEmbed, Message } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    category: 'dev',
    run: async(client, message, args) => {

        const eembed = new MessageEmbed()
        .setColor(`RED`)
        .setDescription('Nie posiadasz permisji!')
        if (message.author.id !== '452188835405758483') 
        if (message.author.id !== '971079149089349674') return message.reply({ embeds: [eembed] })


        let query = args.join(' ');
        if(!query) return message.reply({ content: 'Nie podałeś kodu!' })

        let hrDiff;
        let evaled;
        try {
            let hrStart = process.hrtime();
            evaled = eval(query);
            hrDiff = process.hrtime(hrStart);
        } catch (err) {
            if (query?.lenght > 1024) query = query?.substring(0, 1010) + '...';
            const embed = new MessageEmbed()
            .addField('Wejście', `\`\`\`js\n${query}\`\`\``)
            .addField('Błąd!', `\`\`\`js\n${err.message}\`\`\``)
            return message.reply({ embeds: [embed] })
        }

        if(message.content.match('client.token')) {
            return message.reply({ content: 'XDDD' })
        } else {
            let inspected = inspect(evaled, { depth: 0 });
            if(query?.lenght > 1012) query = query?.substring(0, 1010) + '...';
            const embedd = new MessageEmbed()
            .addField('Wejście', `\`\`\`js\n${query}\`\`\``)
            .addField('Wyjście', `\`\`\`js\n${inspected}\`\`\``)
            .setColor('GREEN')
            return message.reply({ embeds: [embedd] })
        }
    }
}