const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const client = new Client({
    allowedMentions: { repliedUser: false },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});
const embedconfig = require('./config/embeds.json');
const emoji = require('./config/emojis.json');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://vsbotadmin:2KKKsTN1514Lf3O7@cluster0.jgjrf9h.mongodb.net/Data', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log(chalk.yellow('[BAZA DANYCH] ') + chalk.green('Połączono z bazą danych')))


module.exports = client;

const dotenv = require('dotenv')
const envFile = dotenv.config()
const config = require('./config.json')
const prefix = config.prefix
const { token } = require('./config.json')


client.on("ready", () => {
    console.log(chalk.yellow('[BOT] ') + chalk.green(`Pomyślnie zalogowano się jako `) + chalk.blue(`${client.user.tag}`))
    
    const actvs = [
        `@NessBot`,
        `NessBot 2.0.7`,
        `Jestem w Stegnie na plaży`,
        `Czadowo!`,
        `To hagi łagi jest to on!`
    ]

    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'PLAYING' });
        setInterval(() => {
            client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'PLAYING' });
    }, 5000);

    client.user.setStatus('dnd')

    
});

// Kolekcje

client.timeouts = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

// Zwykłe Komendy

client.categories = fs.readdirSync('./commands');

['command'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});

// Slash Komendy

client.slashCommands = new Collection();

['slashCommand'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});

// Powitania --------------------------------------------------------------------------------------------------
const WelcomeSchema = require('./Schema/welcome-schema');

client.on('guildMemberAdd', async (member, guild) => {
    WelcomeSchema.findOne({ wguildId: member.guild.id }, async (err, data) => {
        if(!data) return;

        const user = member.user;
        const wlcchannel = member.guild.channels.cache.get(data.wchannelId);
        const welcomemsg = data.welcomeMsg.replace(`{user.name}`, user.username).replace(`{user.id}`, user.id).replace(`{user.tag}`, user.tag);

        const welcomeEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle(`👋 Powitajmy nowego użytkownika!`)
        .setDescription(`
            ${welcomemsg}
        `)

        wlcchannel.send({ embeds: [welcomeEmbed] })
    })
})

// Pożegnania --------------------------------------------------------------------------------------------------
const LeaveSchema = require('./Schema/leaves-schema');

client.on('guildMemberRemove', async (lmember, lguild) => {
    LeaveSchema.findOne({ lguildId: lmember.guild.id }, async (err, ldata) => {
        if(!ldata) return;

        const luser = lmember.user;
        const lvschannel = lmember.guild.channels.cache.get(ldata.lchannelId);
        const leavemsg = ldata.leaveMsg.replace(`{user.name}`, luser.username).replace(`{user.id}`, luser.id).replace(`{user.tag}`, luser.tag);

        const leaveEmbed = new MessageEmbed()
        .setColor(embedconfig.cdefault)
        .setTitle('👋 Pożegnajmy użytkownika!')
        .setDescription(`
            ${leavemsg}
        `)

        lvschannel.send({ embeds: [leaveEmbed] })
    })
})

// Easter Eggi --------------------------------------------------------------------------------------------------
const egSchema = require('./Schema/eastereggs-schema');

client.on('messageCreate', async (message) => {
    egSchema.findOne({ eguildId: message.guild.id }, async (err, egdata) => {
        if(!egdata) return;
        
        if(message.content === 'kto pytał?') {
            message.reply({ content: '"kto pytał" było modne rok temu' })
        }

        if(message.content === 'w stegnie na plaży') {
            message.reply({ content: 'Witam was jestem w Stegnie na plaży.\nDrugi dzień w Stegnie na plaży!\nSerdecznie was pozdrawiam ze Stegny z morza Bałtyckiego.' })
        }

        if(message.content === 'ta?') {
            message.reply({ content: 'ta.' })
        }
    })
})

client.login(token)