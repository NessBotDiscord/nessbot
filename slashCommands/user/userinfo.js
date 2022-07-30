const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');
const axios = require('axios');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('userinfo')
      .setDescription('Zobacz informacje o użytkowniku')
      .addUserOption(option => option.setName('użytkownik').setDescription('Sprawdź informacje o wybranym przez Ciebie użytkowniku')),
   timeout: 5000,
   async execute(client, interaction) {

      const userTarget = interaction.options.getUser('użytkownik') || interaction.user;
      const memberTarget = interaction.guild.members.cache.get(userTarget.id)

      const statuses = {
         'online': 'Dostępny',
         'idle': 'Zaraz wracam',
         'dnd': 'Nie przeszkadzać',
         'offlie': 'Nieaktywny',
      }

      const status = statuses[memberTarget.presence?.status] || memberTarget.presence?.status

      let isBot;
      if (userTarget.bot) isBot = 'Tak';
      else isBot = 'Nie';

      const embed = new MessageEmbed()
         .setColor(embedconfig.cdefault)
         .setTitle(`${emoji['emotka.person']} Informacje o użytkowniku ${userTarget.tag}`)
         .setDescription(`
            ・ ${emoji['emotka.kropka']} Tag użytkownika:
               ${emoji['emotka.reply']} \`${userTarget.tag}\`
            ・ ${emoji['emotka.hasztag']} ID użytkownika:
               ${emoji['emotka.reply']} \`${userTarget.id}\`
            ・ ${emoji['emotka.gwiazda']} Nick użytkownika:
               ${emoji['emotka.reply']} \`${memberTarget.nickname || 'Nie istnieje'}\`
            ・ ${emoji['emotka.add']} Data założenia konta:
               ${emoji['emotka.reply']} \`${new Date(userTarget.createdTimestamp).toLocaleDateString()}\`
            ・ ${emoji['emotka.rakieta']} Data dołączenia do serwera:
               ${emoji['emotka.reply']} \`${new Date(memberTarget.joinedTimestamp).toLocaleDateString()}\`
            ・ ${emoji['emotka.robot']} Czy użytkowik jest botem:
               ${emoji['emotka.reply']} \`${isBot}\`
            ・ ${emoji['emotka.ustawienia']} Ilość ról:
               ${emoji['emotka.reply']} \`${memberTarget.roles.cache.size - 1}\`
            ・ ${emoji['emotka.kropka']} Status:
               ${emoji['emotka.reply']} \`${status || 'Nieaktywny'}\`
        `)
         .setThumbnail(memberTarget.user.displayAvatarURL({ dynamic: true }))

      interaction.reply({ embeds: [embed] })
   }
}