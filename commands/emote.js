module.exports = message => {
    var chance = Math.floor(Math.random() * 3 + 1);
    var emotes = ['feelsbadman'];
    var msg = message.content.toLowerCase();

    if (chance > 1) {
        for (i = 0; i < emotes.length; i++) {
            if (message.content.includes(emotes[i])) {
                message.channel.send({ files: ['./img/' + emotes[i] + '.png'] });
            } else if (msg.includes("YA")) {
                message.channel.send({ files: ['./img/yeet.gif]'] });
            } else if (msg.includes("f")) {
                message.channel.send('F');
            }
        }
       
    }
    

}