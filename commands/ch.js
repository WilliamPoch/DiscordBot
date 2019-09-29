module.exports = message => {
    const Discord = require('discord.js');
    const rp = require('request-promise');
    const rcg = 'http://explosm.net/rcg';
    const daily = 'http://explosm.net/';
    const rpg = 'http://explosm.net/rpg';
    const s = require('cheerio')

    var messagesplit = message.content.split(" ");

    if (messagesplit.length < 2) {
        message.reply("!ch rcg or !ch daily")
    } else {
        if (messagesplit[1].includes("game")) {
            rp(rcg)
                .then(function (html) {
                    const img = [];
                    for (i = 0; i < 3; i++) {
                        img.push(s('.rcg-panels > img', html)[i].attribs.src);
                    }
                    setTimeout(function () {
                        message.channel.send("1st Card: " + img[0])
                    }, 1000);
                    setTimeout(function () {
                        message.channel.send("2nd Card: " + img[1])
                    }, 6000);
                    setTimeout(function () {
                        message.channel.send("3rd Card: " + img[2])
                    }, 11000);

                })
                .catch(function (err) {
                    console.log(err)
                });
        } else if (messagesplit[1].includes("daily")) {
            rp(daily)
                .then(function (html) {
                    var date = s('div > br', html)[0].prev.data;
                    var author = s('div > br', html)[0].next.data;
                    message.reply(date + " " + author + "http:" + s('div > img', html)[0].attribs.src);
                })
                .catch(function (err) {
                    console.log(err)
                });

        } else if (messagesplit[1].includes("nsfw")) {
            rp(rpg)
                .then(function (html) {                  
                    var title = s('div > h2', html)[0].children[0].data;
                    var url = ("http:" + s('a > img', html)[1].attribs.src);
                    sendEmbeds(title, url, message)
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }


    function sendEmbeds(title, url, message) {
        let channel = message.channel;

        let embed1 = new Discord.RichEmbed({
            title: title,
            url: 'http://explosm.net/rpg',
            author: {
                name: 'Cyanide and Happiness'
            },
            image: {
                url: url,
            },
        });
        channel.send(embed1)
       
    };

}