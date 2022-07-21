const gbanSchema = require('../../Schema/gban-schema');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "gban",
  aliases: [],
  description: "gban someone!",
  run: async(client, message, args) => {
    const eembed = new MessageEmbed()
        .setColor(`RED`)
        .setDescription('Nie posiadasz permisji!')
        if (message.author.id !== '452188835405758483') 
        if (message.author.id !== '971079149089349674') return message.reply({ embeds: [eembed] })

    const userTarget =
      message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!userTarget) {
      message.channel.send("Podales nieprawidlowego uzytkownika");
      return;
    }

    const reason = args.slice(1).join(" ");
    if (!reason) {
      message.channel.send("Nie podales przyczyny.");
      return;
    }

    const date = Date.now();
    // console.log(date)
    const moderatorID = message.author.tag;

    gbanSchema
      .create({
        userID: userTarget.id,
        moderatorID,
        reason,
        date,
      })
      .then((profile) => profile.save());

      message.channel.send('Pomyslnie zgabanowano uzytkownikka.')
  },
};