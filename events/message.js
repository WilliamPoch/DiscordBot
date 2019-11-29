
const kick = require('../commands/kick')
const ball = require('../commands/8ball')
//const setColor = require('../commands/setColor')
const emote = require('../commands/emote')
const roll = require('../commands/dice')
//const help = require('../commands/help')
const steam = require('../commands/steam')
const cache = require('../commands/cache')
const wf = require('../commands/wf')
const lyrics = require('../commands/lyrics')
const lastfm = require('../commands/lastfm')
const ch = require('../commands/ch')
const logs = require('../commands/log')
const test = require('../commands/test')
// const play = require('../commands/music/play')
const leave = require('../commands/leave')
// const skip = require('../commands/music/skip')
// const pause = require('../commands/music/pause')
// const volumeUp = require('../commands/music/volumeUp')
// const volumeDown = require('../commands/music/volumeDown')
// const resume = require('../commands/music/resume')
// const stop = require('../commands/music/stop')



var help = "!help";
var emotes = ['feelsbadman', 'F', 'f', 'YA'];
var command = ["!kick", "!8ball", "!setColor", "!roll", "!steam", "!cache", "!wf", "!lyrics",
    "!lastfm", "!ch", "!logs", "!test", "!leave"];
var comToPass = ['kick', 'ball', 'color', 'roll', 'steam', 'cache', 'wf', 'lyrics',
    'lastfm', 'ch', 'logs', 'test', 'leave'];
var description = ["@user you want to kick.", "Ask a yes or no question!", "Specify a color role you'd like.",
    "Choose dice with xdy: x number of dice, y type of dice. \nEx: 1d20+1d6 rolls 1 d20 and 1 d6 dice.",
    "WIP", "!cache 'steam profile URL' Does not do anything yet", "WIP", "!lyrics 'Song name - artist'", "WIP",
    "!ch game WIP, !ch daily, !ch nsfw", "!logs dd-mm-yyyy"];



let lastCommandDate = 0;
let cooldown = 5000;
function timer(com, message) {
    const now = new Date();
    if (now - lastCommandDate > cooldown) {
        lastCommandDate = now;
        return com(message);
    }
}

const commands = {
    kick: message => {
        timer(kick, message)
    }
    , ball: message => {
        timer(ball, message)
    }
    , color: message => {
        message.reply('disabled')
    }
    , emote: message => {
        timer(emote, message)
    }
    , roll: message => {
        timer(roll, message)
    }
    , steam: message => {
        timer(steam, message)
    }
    , cache: message => {
        timer(cache, message)
    }
    , wf: message => {
        timer(wf, message)
    }
    , lyrics: message => {
        timer(lyrics, message)
    }
    , lastfm: message => {
        timer(lastfm, message)
    }
    , ch: message => {
        timer(ch, message)
    }
    , logs: message => {
        timer(logs, message)
    }
    , test: message => {
        timer(test, message)
    }
    , leave: message => {
        timer(leave, message)
    }
    // , play: message => {
    //     timer(play, message)
    // }
    // , stop: message => {
    //     timer(stop, message)
    // }
    // , skip: message => {
    //     timer(skip, message)
    // }
    // , resume: message => {
    //     timer(resume, message)
    // }
    // , volumeUp: message => {
    //     timer(volumeUp, message)
    // }
    // , volumeDown: message => {
    //     timer(volumeDown, message)
    // }
    // , stop: message => {
    //     timer(stop, message)
    // }
    // , pause: message => {
    //     timer(pause, message)
    // }

};

module.exports = (client, message) => {
    var msg = message.content.split(" ");
    if (command.includes(msg[0])) {
        var i = command.indexOf(msg[0]);
        commands[comToPass[i]](message);
    } else if (emotes.includes(msg[0])) {
        commands['emote'](message);
    } else if (help == msg[0]) {
        var out = "";
        for (i = 0; i < command.length; i++) {
            out += (`**\n${command[i]}** \n${description[i]}`)
        }
        message.reply(out)
    }

}




