module.exports = message => {
    var LastFmNode = require('lastfm').LastFmNode;
    const save = require('write-json-file')


    var lastfm = new LastFmNode({
        api_key: '97ba32cc9870ccf6062bce30b029a7ee',
        secret: '410dc87860174f14913c0a0eeda9833',
        useragent: 'feelsbotman'
    });

    var request = lastfm.request("user.getRecentTracks", {
        user: "tobi980i",
        handlers: {
            success: function (data) {
                console.log("Success: " + data);
                
            },
            error: function (error) {
                console.log("Error: " + error.message);
            }
        }
    });
    var stream = lastfm.stream("tobi980i");
    stream.start();
    stream.on('lastPlayed', function (track) {
        message.reply('Last played: ' + track.name);
    });
    stream.stop();
    

}
