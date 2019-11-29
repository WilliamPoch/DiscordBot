module.exports = message => {
    const client = require('discord.js')
    if (message.guild.voiceConnection) {
        message.guild.voiceConnection.disconnect();
    } else {
        message.reply("I'm not in any channel")
    }
}