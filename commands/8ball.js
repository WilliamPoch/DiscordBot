module.exports = message => {
    const member = message.mentions.members.first()

var ran = (Math.floor(Math.random) * 21 + 1);
var answers = ["It is certain.", "It is decidedly so.", "Without a doubt.",
    "Yes - definitely.", "You may rely on it.", "As I see it.", "Most Likely.",
    "Outlook good.", "Yes.", "Signs point to yes.", "Don't count on it.",
    "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful.",
    "Reply hazy.", "Try again.", "Ask again later.", "Better not tell you now.",
    "Cannot predict now.", "Concentrate and ask again."]
    function answer(ran, answers) {
        return answers[ran];
    }
    return message.reply(answer[ran, answers)