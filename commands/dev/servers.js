const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "serwery",
    aliases: [],
    description: "pokaż serwery na których jest bot!",
    run: async(client, message, args) => {
        const eembed = new MessageEmbed()
        .setColor(`RED`)
        .setDescription('Nie posiadasz permisji!')
        if (message.author.id !== '452188835405758483') 
        if (message.author.id !== '971079149089349674') return message.reply({ embeds: [eembed] })

      let guilds = [];
  
      client.guilds.cache.forEach((guild) => {
        guilds.push(
          `${guild.name}        ${guild.id}        ${guild.memberCount}\n`
        );
      });
  
      message.channel.send({ content: `${guilds}` });
    },
  };