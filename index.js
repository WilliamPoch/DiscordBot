require('dotenv').config()
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const DiscordAntiSpam = require('discord-anti-spam');

const AntiSpam = new DiscordAntiSpam({
    warnThreshold: 4, // Amount of messages sent in a row that will cause a warning.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban
    maxInterval: 3000, // Amount of time (in ms) in which messages are cosidered spam.
    warnMessage: "{@user}, Can you don't?.", // Message will be sent in chat upon warning.
    banMessage: ("**{user_tag}** has been banned for spamming.", { files: ['./img/Pogweird.png'] }), // Message will be sent in chat upon banning.
    maxDuplicatesWarning: 4, // Amount of same messages sent that will be considered as duplicates that will cause a warning.
    maxDuplicatesBan: 8, // Amount of same messages sent that will be considered as duplicates that will cause a ban.
    deleteMessagesAfterBanForPastDays: 1, // Amount of days in which old messages will be deleted. (1-7)
    ignoredUsers: [], // array of ignored user ids
    ignoredGuilds: [], // array of ignored guild ids
    exemptPermissions: [], // Bypass users with at least one of these permissions
    ignoreBots: true, // Ignore bot messages
    verbose: false, // Extended Logs from module
    client: client, // Client is your Discord.Client and is a required option.
    ignoredUsers: [], // Array of string user IDs that are ignored
    ignoredGuilds: [] // Array of string Guild IDs that are ignored
});

AntiSpam.on("warnEmit", (member) => console.log(`Attempt to warn ${member.user.tag}.`));
AntiSpam.on("warnAdd", (member) => console.log(`${member.user.tag} has been warned.`));
AntiSpam.on("banEmit", (member) => console.log(`Attempt to ban ${member.user.tag}.`));
AntiSpam.on("banAdd", (member) => console.log(`${member.user.tag} has been banned.`));
AntiSpam.on("dataReset", () => console.log("Module cache has been cleared."));

function date() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = dd +  '-' + mm + '-' + yyyy;
    return today;
}
function dateTime() {
    var today = new Date();
    var hour = String(today.getHours()).padStart(2, '0');
    var min = String(today.getMinutes()).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = hour + ":" + min + "-" + dd + '-' + mm + '-' + yyyy;
    return today;
}

client.on("message", (msg) => {
    AntiSpam.message(msg);
})

client.on("message", (msg) => {
    let filename = './logs/log' + date() + '.txt';
    let CreateFiles = fs.createWriteStream(filename, {
        flags: 'a'
    })
    if (fs.existsSync(filename)) {
        let link
        for (var [key, value] of msg.attachments) {
            link = (value.url);
        }
        if (link != undefined) {
            CreateFiles.write(dateTime() + "," + msg.author.id + "," + msg.author.username + "," + msg.content + "," + link + '\r\n');
        } else {
            CreateFiles.write(dateTime() + "," + msg.author.id + "," + msg.author.username + "," + msg.content + "," + '\r\n');
        }
    } else {
         CreateFiles = fs.createWriteStream(filename, {
            flags: 'a'
        })
    }
   
    
    
})
fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split('.')[0]
        client.on(eventName, (...args) => eventHandler(client, ...args))
    })
})
client.login(process.env.BOT_TOKEN);