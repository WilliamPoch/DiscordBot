module.exports = client => {
	const fs = require('fs');
	
	function date() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = dd +  '-' + mm + '-' + yyyy;
    return today;
}
	let filename = 'logs/log' + date() + '.txt';
    fs.appendFile(filename,"", function (err) {
		if (err) throw err;
		console.log(err);
	});
    console.log(`Logged in as ${client.user.tag}!`)
}