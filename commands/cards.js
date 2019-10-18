
let deck = [];

for (i = 1; i <= 360; i++) {
    deck[i] = i;
}

function deal() {
    const hand = [];
    for (i = 0; i < 7; i++) {
        var ran = Math.floor(Math.random() * deck.length + 1);
        hand[i] = ran;
        deck.splice(deck.indexOf(ran), 1);
    }
    return hand;
}

function draw() {
    return Math.floor(Math.random() * deck.length + 1);
}


