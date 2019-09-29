module.exports = message => {
    const lyrics = require('4lyrics')

    var messagesplit = message.content.split(" ");
    messagesplit.splice(0, 1);
    messagesplit.join("");

    lyrics.azlyrics.getURL(messagesplit)
        .then(r => lyrics.azlyrics.getLyrics(r)).catch(console.error)
        .then(a => message.reply("\n" + a)).catch(console.error)
}