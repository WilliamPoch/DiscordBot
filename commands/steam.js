module.exports = message => {
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(process.env.STEAM_API);
    const loadJsonFile = require('load-json-file');

    var error = console.error;

    var messagesplit = message.content.split(" ");
    messagesplit.splice(0, 1);
    messagesplit.join(" ");
    var userID

    loadJsonFile('./cache/GarroSummary.json').then(user => {
        userID = user.steamID;
    }).catch(error)

    loadJsonFile('./cache/GarroGames.json').then(games => {


        steam.getUserStats(userID, games[0].appID).then(stats => {
            console.log(stats)
        }).catch(error)
    }).catch(error)
}
