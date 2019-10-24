module.exports = message => {
    const Discord = require('discord.js');
    const rp = require('request-promise');
    const rcg = 'http://explosm.net/rcg';
    const daily = 'http://explosm.net/';
    const rpg = 'http://explosm.net/rpg';
    const s = require('cheerio')

    var messagesplit = message.content.split(" ");

    if (messagesplit.length < 2) {
        message.reply("!ch game or !ch daily")
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
                    var url = ("http:" + s('div > img', html)[0].attribs.src);
                    sendEmbeds(date, author, url, message)
                })
                .catch(function (err) {
                    console.log(err)
                    rp(daily)
                        .then(function (html) {
                            var thumb = s('.ytp-cued-thumbnail-overlay', html);
                            var author = s('div > a', html)[23].attribs.href;
                            var url = s('div > a', html)[27].attribs.href;
                            message.channel.send(url)
                            //sendEmbeds(url, author, url, message)
                        })
                        .catch(function (err) {
                            console.log(err)

                        });
                });

        } else if (messagesplit[1].includes("nsfw")) {
            rp(rpg)
                .then(function (html) {                  
                    var title = s('div > h2', html)[0].children[0].data;
                    var author = 'Cyanide and Happiness'
                    var url = ("http:" + s('a > img', html)[1].attribs.src);
                    sendEmbeds(title, author,  url, message)
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }


    function sendEmbeds(title, author, url, message) {
        let channel = message.channel;

        let embed1 = new Discord.RichEmbed({
            title: title,
            url: url,
            author: {
                name: author,
            },
            image: {
                url: url,
            },
        });
        channel.send(embed1)
       
    };

}