const Discord = require('discord.js');

const db = require('quick.db');

const { MessageEmbed } = require("discord.js");

const Client = new Discord.Client();

const prefix = "*"

const fs = require('fs');

//Test.js is required for some reason//
const test = require('./test/test');





Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    Client.commands.set(command.name, command);
}

Client.once('ready', () => {
    console.log('Uwu bots online');

    setInterval(() => {
        Client.user.setPresence({
            status: 'online',
            activity: {
                name: Client.guilds.cache.size + ' Servers | *Help/h',
                type: "WATCHING",
            },
        });
    }, 120000);
});


Client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase()

    if (Client.commands.has(command)) Client.commands.get(command).execute(message, args, Client)

});

Client.on("guildMemberAdd", (message) => {
    let chx = db.get(`welchannel_${message.guild.id}`);

    if (chx === null) {
        return;
    }

    

    let wembed = new MessageEmbed()
        .setTitle("Welcome new member")
        .setDescription(`Hi <@${message.user.id}> welcome to **${message.guild.name}**!`)
        .setThumbnail(message.user.displayAvatarURL({ dynamic: true }))
        .setColor('27cc9a')

    Client.channels.cache.get(chx).send(wembed)
})



Client.on("guildMemberRemove", (message) => {
    let chx = db.get(`welchannel_${message.guild.id}`);

    if (chx === null) {
        return;
    }

    let wembed1 = new MessageEmbed()
        .setTitle("Goodbye old member")
        .setDescription(`Come back soon ${message.user.username}`)
        .setThumbnail(message.user.displayAvatarURL({ dynamic: true }))
        .setColor('27cc9a')

    Client.channels.cache.get(chx).send(wembed1)
})

Client.on("messageDelete", (message) => {
    let chx = db.get(`delmessages_${message.guild.id}`);

    if (chx === null) {
        return;
    }


    let delet = new MessageEmbed()
        .setTitle(`Message Deleted in ${message.channel.name}`)
        .addField("Author", `Name: <@${message.author.id}> \nID: ${message.author.id}`)
        .addField(`Content:`, `> ${message.content}`)
        .setColor("PURPLE")
        .setTimestamp()

    Client.channels.cache.get(chx).send(delet);

})






















Client.login(Bot Token);
