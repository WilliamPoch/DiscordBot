module.exports = message => {
    var emotes = ['feelsbadman'];
    var msg = message.content.toLowerCase();


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