module.exports = message => {
    var msgsplit = message.content.split(" ")
    var date = msgsplit[1]
    message.channel.send({ files: ['./logs/log' + date + '.txt'] }).catch(err => {
        message.channel.send('File not found');
        console.log(err);  
    });
}