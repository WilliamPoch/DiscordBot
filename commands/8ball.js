// const commando = require('discord.js-commando');

// class eightBall extends commando.Command
// {
//     constructor(client) 
//     {
//         super(client, {
//             name: '8ball',
//             group: 'simple',
//             memberName: '8ball',
//             description: 'Answers a yes or no question to varying degrees of yes or no.'
//         });
//     }
//     async run(message, args) 
//     {
//         var answers = ["It is certain.", "It is decidedly so.", "Without a doubt.",
//             "Yes - definitely.", "You may rely on it.", "As I see it.", "Most Likely.",
//             "Outlook good.", "Yes.", "Signs point to yes.", "Don't count on it.",
//             "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful.",
//             "Reply hazy.", "Try again.", "Ask again later.", "Better not tell you now.",
//             "Cannot predict now.", "Concentrate and ask again."]

//         var reply = answers[Math.floor(Math.random() * answers.length)];
//         message.reply(reply);
//     }
// }


module.exports = message => {

    if (message.content.includes("?")) {
        var answers = ["It is certain.", "It is decidedly so.", "Without a doubt.",
            "Yes - definitely.", "You may rely on it.", "As I see it.", "Most Likely.",
            "Outlook good.", "Yes.", "Signs point to yes.", "Don't count on it.",
            "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful.",
            "Reply hazy.", "Try again.", "Ask again later.", "Better not tell you now.",
            "Cannot predict now.", "Concentrate and ask again."]

        var reply = answers[Math.floor(Math.random() * answers.length)];

        message.reply(reply);
    } else {
        message.reply("Ask me a question, then I'll answer.");
    }
    
}