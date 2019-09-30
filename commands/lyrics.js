module.exports = message => {
    const lyrics = require('4lyrics')

    var messagesplit = message.content.split(" ");
    messagesplit.splice(0, 1);
    messagesplit.join("");



    //lyrics.lyricslive.getURL(messagesplit)
    //    .then(r => lyrics.lyricslive.getLyrics(r))
    //    .then(a => message.reply("\n" + a)).catch(console.error)
    //    .catch(console.error);

    //lyrics.musixmatch.getURL(messagesplit)
    //    .then(r => lyrics.musixmatch.getLyrics(r))
    //    .then(a => message.reply("\n" + a)).catch(console.error)
    //    .catch(console.error);

    //lyrics.lyricscom.getURL(messagesplit)
    //    .then(r => lyrics.lyricscom.getLyrics(r))
    //    .then(a => message.reply("\n" + a)).catch(console.error)
    //    .catch(console.error);

    try {
        lyrics.musixmatch.getURL(messagesplit)
            .then(r => lyrics.musixmatch.getLyrics(r)).catch(console.error)
            .then(a => {
                message.reply("\n" + a, { split: true });   
            }).catch (console.error)
            .catch (function onError(error) { console.log(error); });
    } catch (e) {
        console.log(e.stack);
        message.channel.send(e);
    };


}