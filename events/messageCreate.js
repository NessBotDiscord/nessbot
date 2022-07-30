const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Collection } = require('discord.js');
const emoji = require('../config/emojis.json');
const embedconfig = require('../config/embeds.json');
const client = require('..');
const config = require('../config.json');
const link = require('../config/links.json');
const prefix = config.prefix;

//messagCreate events
client.on("messageCreate", async (message) => {
    if (message.author.bot) return; //return when message author is a bot

    //     if(message.content === 'ta?'){
    //    message.channel.send("ta") 
    //     }

    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('menuuu')
                .setPlaceholder('Wybierz w czym mogę Ci pomóc.')
                .addOptions([
                    {
                        label: 'Administracja',
                        description: 'Aby zobaczyć naszą administrację kliknij tutaj!',
                        value: 'personel',
                        emoji: `${emoji['emotka.moderator']}`
                    },
                    {
                        label: 'Bot',
                        description: 'Aby dowiedzieć się więcej o bocie kliknij tutaj!',
                        value: 'bot',
                        emoji: `${emoji['emotka.nesslogo']}`
                    },
                    {
                        label: 'Social Media',
                        description: 'Aby zobaczyć nasze social media kliknij tutaj!',
                        value: 'social',
                        emoji: `${emoji['emotka.youtube']}`
                    }
                ])
        )

    const rowBT = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Serwer Wsparcia')
                .setStyle('LINK')
                .setURL(`${link['support.serwer']}`)
                .setEmoji(`${emoji['emotka.helper']}`),
            new MessageButton()
                .setLabel('Dodaj Bota')
                .setStyle('LINK')
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=987821547987275857&permissions=8&scope=bot%20applications.commands`)
                .setEmoji(`${emoji['emotka.add']}`)
        )

    const mention = new MessageEmbed()
        .setDescription(`
       ${emoji['emotka.witaj']} ${message.author.tag} Cześć! Potrzebujesz pomocy?
       
       W menu poniżej masz wszystkie najważniejsze informacje, a link do serwera wsparcia jest w przycisku niżej.
   `)

    const personelEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`Aktualna administracja NessBot'a`)
        .setDescription(`
        ${emoji['emotka.wlasciciel']}・Zarząd
        [VandusieK#5560](https://discord.com/users/452188835405758483) (452188835405758483)
        [oszzyk#8502](https://discord.com/users/971079149089349674) (971079149089349674)
        [!𝓐 𝓁i𝒸𝕛𝒶 2137#6085](https://discord.com/users/720586172006662164) (720586172006662164)
        ${emoji['emotka.developer']}・Developerzy
        [VandusieK#5560](https://discord.com/users/452188835405758483) (452188835405758483) BOT**&**STRONA
        [oszzyk#8502](https://discord.com/users/971079149089349674) (971079149089349674) BOT**&**STRONA
        ${emoji['emotka.moderator']}・Moderacja
        [Dajell19#5544](https://discord.com/users/779034809301205102) (779034809301205102)
        [M4sterek✓#3167](https://discord.com/users/687669120199557150) (687669120199557150)
        [WX Bambikolo#7528](https://discord.com/users/644617577490022420) (644617577490022420)
        [Frugo_Official#2969](https://discord.com/users/929385315926417438) (929385315926417438)
        [kot.it#9817](https://discord.com/users/772735021160988674) (772735021160988674)
        `)

        const botEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle('Kilka słów o NessBocie')
        .setDescription(`
        ${emoji['emotka.robot']}・NessBot jest botem który pomoże Ci w prowadzeniu Twojego serwera.
        Z nim możesz z łatwością zarządzać swoim serwerem, banować nieprzyjazne osoby i wiele więcej.
        
        ${emoji['emotka.wlasciciel']} \`Właściciel\`: [VandusieK#5560](https://discord.com/users/452188835405758483)
        ${emoji['emotka.slash']} \`Prefix\`: \`/\` (komendy ukośnikowe)
        ${emoji['emotka.ustawienia']} \`Strona\`: ${link['web.page']}
        ${emoji['emotka.ping']} \`Ping\`: ${client.ws.ping} ms
        `)

        const socialEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle('Nasze social media')
        .setDescription(`
        ${emoji['emotka.instagram']}・Instagram: **SOON**
        ${emoji['emotka.twitter']}・Twitter: **SOON**
        ${emoji['emotka.youtube']}・YouTube: **SOON**
        ${emoji['emotka.facebook']}・Facebook: **SOON**
        `)

    const collector = message.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU' })

    collector.on('collect', async (collected) => {
        const value = collected.values[0]

        if (value === 'personel') {
            collected.reply({ embeds: [personelEmbed], ephemeral: true })
        }

        if (value === 'bot') {
            collected.reply({ embeds: [botEmbed], ephemeral: true })
        }

        if (value === 'social') {
            collected.reply({ embeds: [socialEmbed], ephemeral: true })
        }
    })

    if (message.content.match(prefixMention)) message.channel.send({ embeds: [mention], components: [row, rowBT] })

    if (!message.content.startsWith(prefix)) return; //only response when command is start with prefix
    if (!message.guild) return; //return if the command is not using in guild. For example: DM will return the cmd
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g); // arg[0] is the first word after the cmd (not include prefix)
    //for example: !ban @user, so @user is args[0] If you still don't understand, feel free to ask me in Discord.
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
});