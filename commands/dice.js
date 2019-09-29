module.exports = message => {
    var messagesplit = message.content.split(" ");

    if (messagesplit.length < 2) {
        message.reply("What dice to roll? Example: !roll 2d20+4d4...etc");
    } else {
        var diceSplit = messagesplit[1].split("+");
        var list = [];
        var total = 0;
        var dice, roll = 0;

        for (i = 0; i < diceSplit.length; i++) {
            dice = diceSplit[i].split("d");
            for (j = 0; j < dice[0]; j++) {
                roll = Math.floor(Math.random() * dice[1] + 1);
                total += roll;
                list.push(roll);
            }

        }
        if (list.length == 1 && dice == 20 && list[0] == 20) {
            message.reply(total + " : [" + list + "]");
            message.reply("Critical Success!");
        } else if (list.length == 1 && dice == 20 && list[0] == 1) {
            message.reply(total + " : [" + list + "]");
            message.reply("F");
        } else {
            message.reply(total + " : [" + list + "]");
        }
       

    }
    



}