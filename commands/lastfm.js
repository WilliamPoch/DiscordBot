module.exports = message => {
    var LastFmNode = require('lastfm').LastFmNode;
    const save = require('write-json-file')
	const api = process.env.last_fm_api
	const secret = process.env.last_secret

    var lastfm = new LastFmNode({
        api_key: api,
        secret: secret,
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
