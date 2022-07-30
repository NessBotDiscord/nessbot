const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');
const Schema = require('../../Schema/verification-schema');
const embedconfig = require('../../config/embeds.json');
const emoji = require('../../config/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-verification')
    .setDescription('Ustaw weryfikację')
    .addChannelOption(option => option.setName('kanał').setDescription('Wybierz kanał na który ma zostać wysłana weryfikacja').setRequired(true))
    .addRoleOption(option => option.setName('rola').setDescription('Wybierz rolę którą ma otrzymać użytkownik po weryfikacji').setRequired(true))
    .addStringOption(option => option.setName('wiadomość').setDescription('Ustaw wiadomość').setRequired(true)),
    timeout:5000,
    async execute(client, interaction) {

        const channel = interaction.options.getChannel('kanał');
        const role = interaction.options.getRole('rola');
        const message = interaction.options.getString('wiadomość');

        const user = interaction.guild.members.cache.get();

        const pEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Nie posiadasz permisji aby użyć tej komendy!\nPotrzebujesz permisji \`ADMINISTRATOR\``)
            .setFooter({ text: embedconfig.footer })
        
            const bpEmbed = new MessageEmbed()
            .setColor(embedconfig.cerror)
            .setTitle(`${emoji['emotka.uwaga']} ・ Brak permisji!`)
            .setDescription(`${emoji['emotka.brakperms']} Bot nie posiada permisji aby wykonać to polecenie!\n\nPotrzebna permisja: \`MANAGE_GUILD\``)

            if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                return interaction.reply({ embeds: [bpEmbed], ephemeral: true })
            } else if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                return interaction.reply({ embeds: [pEmbed], ephemeral: true })
            }

            Schema.findOne({ guildId: interaction.guild.id }, async (err, data) => {
                if(data) {
                    data.channelId = channel.id;
                    data.roleId = role.id;
                    data.message = message;
                    data.save();
                } else {
                    new Schema({
                        guildId: interaction.guild.id,
                        channelId: channel.id,
                        roleId: role.id,
                        message: message,
                    }).save();
                }
                interaction.reply({ content: 'Ustawiono weryfikację.', ephemeral: true })
            })

            const embed = new MessageEmbed()
            .setColor(embedconfig.cdefault)
            .setTitle('Weryfikacja')
            .setDescription(`${message}`)

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('button')
                .setLabel('Zweryfikuj się')
                .setStyle('SUCCESS')
            )

            channel.send({ embeds: [embed], components: [row] })

            client.on('interactionCreate', async ButtonInteraction => {
             if (!ButtonInteraction.isButton()) return
             if (ButtonInteraction.customId === 'button') {
                 const wait = require('util').promisify(setTimeout)
                 await wait(1000)
                 user.roles.add(role)
                 await ButtonInteraction.reply({ content: 'Zweryfikowałeś się!', ephemeral: true })
             }
         })
    }
}