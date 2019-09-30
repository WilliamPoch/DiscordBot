module.exports = message => {
    //const lyrics = require('4lyrics')
    const solenolyrics = require("solenolyrics");
    var messagesplit = message.content.split(" ");
    messagesplit.splice(0, 1);
    var string = messagesplit.join(" ");

    async function f() {
        var lyrics = await solenolyrics.requestLyricsFor(string);
        return (lyrics);
    };
    f().then(a => message.reply(a, { split: true })).catch(function catchError(error) { 
        console.log(error)
        message.channel.send(error)
    });

    //lyrics.lyricslive.getURL(messagesplit)
    //    .then(r => lyrics.lyricslive.getLyrics(r))
    //    .then(a => message.reply("\n" + a)).catch(console.error)
    //    .catch(console.error);

    //lyrics.musixmatch.getURL(messagesplit)
    //    .then(r => lyrics.musixmatch.getLyrics(r))
    //    .then(a => message.reply("\n" + a)).catch(console.error)
    //    .catch(console.error);

    //lyrics.azlyrics.getURL(messagesplit)
    //    .then(r => lyrics.azlyrics.getLyrics(r))
    //    .then(a => message.reply("\n" + a, { split: true })).catch(console.error)
    //    .catch(console.error);
    //try {
    //    lyrics.musixmatch.getURL(string)
    //        .then(r => lyrics.musixmatch.getLyrics(r)).catch(console.error)
    //        .then(a => {
    //            message.reply("\n" + a, { split: true });   
    //        }).catch (console.error)
    //        .catch (function onError(error) { console.log(error); });
    //} catch (e) {
    //    console.log(e.stack);
    //    message.channel.send(e);
    //};


}