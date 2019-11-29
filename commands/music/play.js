module.exports = message => {
    const YTDL = require('ytdl-core');
    var messagesplit = message.content.split(" ")
    var song = messagesplit[1]

    function Play(connection, message) {
        var server = servers[message.guild.id]
        server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));
        server.queue.shift();
        server.dispatcher.on('end', function () {
            if(server.queue[0]) {
                Play(connection, message)
            } else {
                connection.disconnect();
            }
        });
    }

    if (message.member.voiceChannel) {
        if (!message.guild.voiceConnection) {
            if (!servers[message.guild.id]) {
                servers[message.guild.id] = {queue: []}
            }
            message.member.voiceChannel.join().then(connection => {
                var server = servers[message.guild.id];
                message.reply("Successfully joined!");
                server.queue.push(song)
                Play(connection, message);
            })
        }
    } else {
        message.reply("You must be in a voice channel to summon me.")
    }
}