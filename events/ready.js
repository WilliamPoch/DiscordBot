module.exports = client => {
	const fs = require('fs');
	let filename = './logs/log' + date() + '.txt';
    let CreateFiles = fs.createWriteStream(filename, {
        flags: 'a'
    })
    console.log(`Logged in as ${client.user.tag}!`)
}