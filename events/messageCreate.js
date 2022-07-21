const { MessageEmbed, Collection } = require('discord.js');
const emoji = require('../config/emojis.json');
const client = require('..');
const config = require('../config.json');
const link = require('../config/links.json');
const prefix = config.prefix;

//messagCreate events
client.on("messageCreate", async (message) => {
    if (message.author.bot) return; //return when message author is a bot

    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    const mention = new MessageEmbed()
        .setDescription(`
       ${emoji['emotka.witaj']} ${message.author.tag} Cześć! Potrzebujesz pomocy?
       Dołącz na serwer wsparcia znajdujący się w linku poniżej.

       ${emoji['emotka.slash']} Prefix: \`(/)\`
       ${emoji['emotka.rakieta']} Komendy: \`25\`
       ${emoji['emotka.link']} Serwer Wsparcia: [Kliknij Tutaj](${link['support.serwer']})
   `)

    if (message.content.match(prefixMention)) message.channel.send({ embeds: [mention] })

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