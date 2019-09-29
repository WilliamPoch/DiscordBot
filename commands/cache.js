module.exports = message => {
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(process.env.STEAM_API);
    const writeJsonFile = require('write-json-file');

    var messagesplit = message.content.split(" ");
    var name = messagesplit[1];
    var error = console.error;
    var user = "";

    function compare(a, b) {
        a = a.toLowerCase()
        b = b.toLowerCase();

        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }


    if (messagesplit.length >= 2) {
        if (name.includes("https://steamcommunity.com/id/")) {
            steam.resolve(name).then(id => {
                steam.getUserSummary(id).then(summary => {
                    user = summary.nickname
                    steam.getUserOwnedGames(id).then(games => {
                        writeJsonFile('./cache/' + user + 'Summary.json', summary)
                        writeJsonFile('./cache/' + user + 'Games.json', games)
                        message.channel.send('Done!');
                    }).catch(error)
                }).catch(error)
            }).catch(error)
        } else if (name.includes('steam')) {
            steam.getAppList().then(allgames => {
                var sorted = allgames.sort(function (a, b) { return compare(a.name, b.name)  })
                writeJsonFile('./cache/steamGames.json', sorted).catch(error)
                message.channel.send('Done!');
            }).catch(error)

        } else {
            steam.resolve("https://steamcommunity.com/id/" + name).then(id => {
                steam.getUserSummary(id).then(summary => {
                    user = summary.nickname
                    steam.getUserOwnedGames(id).then(games => {
                        message.channel.send('Caching...')
                        writeJsonFile('./cache/' + user + 'Summary.json', summary)
                        writeJsonFile('./cache/' + user + 'Games.json', games)
                        message.channel.send('Done!');
                    }).catch(error)
                }).catch(error)
            }).catch(error)
        }

    } else {
        message.reply("Enter a profile to cache")
    }
}