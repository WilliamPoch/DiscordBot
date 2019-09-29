module.exports = (message, commands, description) => {
    var coms = commands;
    var desclist = description;
    var help = "";
    
    for (i = 0; i < coms.length; i++) {
        help += (`**\n${commands[i]}** \n${desclist[i]}`)
    }

    message.reply(help);
}