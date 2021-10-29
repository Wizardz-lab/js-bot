const Discord = require('discord.js');
const fs = require('fs');
const { token, prefix } = require('./config.json');
const client = new Discord.Client({intents: [
    "GUILDS",
    "GUILD_MESSAGES"
]});
client.on('ready', () => {
    console.log(`${client.user.username} is online!`)
});

const commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for(const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        commands.set(command.name, command);
    }
}

client.on('messageCreate', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) return message.reply({content:`There is no command with that name`});
    try {
        command.execute(message, args, client)
    } catch (e) {
        console.error(e);
        message.reply({content:`\`\`\`js\n${e}\`\`\` has been found`});
    }
});

client.login(token);
