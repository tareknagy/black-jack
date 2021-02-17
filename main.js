/*----- constants -----*/
const cardValues = {
    dA: 11, dK: 10, dQ: 10, dJ: 10, d10: 10, d09: 9, d08: 8, d07: 7, d06: 6, d05: 5, d04: 4, d03: 3, d02: 2,
    hA: 11, hK: 10, hQ: 10, hJ: 10, h10: 10, h09: 9, h08: 8, h07: 7, h06: 6, h05: 5, h04: 4, h03: 3, h02: 2,
    sA: 11, sK: 10, sQ: 10, sJ: 10, s10: 10, s09: 9, s08: 8, s07: 7, s06: 6, s05: 5, s04: 4, s03: 3, s02: 2,
    cA: 11, cK: 10, cQ: 10, cJ: 10, c10: 10, c09: 9, c08: 8, c07: 7, c06: 6, c05: 5, c04: 4, c03: 3, c02: 2
};
const MAX_SCORE = 21;
const COMP_HIT_LIMIT = 17;

/*----- app's state (variables) -----*/
let players, playerTurn, winner, cardDeck;

/*----- cacced element references -----*/
const player1CardsEl  = document.getElementById('player1');
const player2CardsEl = document.getElementById('player2');
const msgEl  = document.querySelector('h2');
const buttonsEl =  document.getElementById('buttons');

/*----- event listeners -----*/
document.querySelector('#restart').addEventListener('click', init);
document.querySelector('#hit').addEventListener('click', hit);
document.querySelector('#stand').addEventListener('click', stand);


/*----- functions -----*/
function init() {
    playerTurn = 2;
    winner = null;
    cardDeck = ['dA', 'dK', 'dQ', 'dJ', 'd10', 'd09', 'd08', 'd07', 'd06', 'd05', 'd04', 'd03', 'd02', 'hA', 'hK', 'hQ', 'hJ', 'h10', 'h09', 'h08', 'h07', 'h06', 'h05', 'h04', 'h03', 'h02', 'sA', 'sK', 'sQ', 'sJ', 's10', 's09', 's08', 's07', 's06', 's05', 's04', 's03', 's02', 'cA', 'cK', 'cQ', 'cJ', 'c10', 'c09', 'c08', 'c07', 'c06', 'c05', 'c04', 'c03', 'c02'];
    players = {
        1: [],
        2:  []
    };
    assignCard(1); 
    assignCard(1);
    assignCard(2);
    assignCard(2);
    render();
}

function randomCard() {
    return Math.floor(Math.random() * cardDeck.length);
}

function assignCard(player) {
    // chose random card, assign to player, remove from cardDeck
    let cardNum  = randomCard();
    players[player].push(cardDeck[cardNum]);
    cardDeck.splice(cardNum, 1);
}

function render()  {
    renderCards();
    renderButtons();
    renderMsg();
}

function renderCards()  {
    if (playerTurn === 2) {
        // hide player1 card 1, display rest
        let player1Content  =  `PLAYER 1 <br><div class="back card"></div>`
        for  (i =  1;  i < players[1].length; i++)  {
            player1Content += `<div class="${players[1][i]} card"></div>`
        };
        player1CardsEl.innerHTML = player1Content;

        // display player2 cards
        let player2Content = 'PLAYER 2 <br>';
        for  (i =  0;  i < players[2].length; i++)  {
            player2Content += `<div class="${players[2][i]} card"></div>`
        };
        player2CardsEl.innerHTML = player2Content;
    } else  {
        // display all player1 cards
        let player1Content = 'PLAYER 1 <br>';
        for  (i =  0;  i < players[1].length; i++)  {
            player1Content += `<div class="${players[1][i]} card"></div>`
        };
        player1CardsEl.innerHTML = player1Content;
        // display all player2 cards
        let player2Content = 'PLAYER 2 <br>';
        for  (i =  0;  i < players[2].length; i++)  {
            player2Content += `<div class="${players[2][i]} card"></div>`
        };
        player2CardsEl.innerHTML = player2Content;
    }
}

function renderButtons() {
    if (players[1].length > 2 || players[2].length > 2 || winner !== null) {
        buttonsEl.children["restart"].style.visibility = 'visible'
    }  else {
        buttonsEl.children["restart"].style.visibility = 'hidden' 
    };
    if (playerTurn  === 1)  {
        buttonsEl.children["hit"].style.visibility = 'hidden' 
        buttonsEl.children["stand"].style.visibility = 'hidden' 
    } else {
        buttonsEl.children["hit"].style.visibility = 'visible' 
        buttonsEl.children["stand"].style.visibility = 'visible' 
    }
}

function renderMsg() {
    //     renderMessage() - if winner  / loser else if my turn, else if computer's turn.
    if (winner !== null) {
        if (winner === 0) {
            msgEl.innerHTML = `I can't believe it, it's a TIE!`
        } else {
            msgEl.innerHTML = `Looks like the winner is player ${winner}!!! Play again?`
        }
    } else if (playerTurn === 2)  {
        msgEl.innerHTML = `It's your turn! Do you want to Hit or Stand?`
    } else {
        msgEl.innerHTML = `The all-mighty computer is playing now. hang tight.`
    }
}

function hit() {
    assignCard(2);
    //     if player cards >= MAX_SCORE then stand_button()
    if (countScore(2) > MAX_SCORE) {
        stand();
    } else {
        render();
    };
}

function stand() {
    playerTurn  = 1;
    render();
    compPlay();
}

function countScore(player) {
    let currentCount  = 0;
    for  (i =  0;  i < players[player].length; i++) {
        currentCount += cardValues[players[player][i]];
    }
    return currentCount;
}

function compPlay() {
//     if player1 cards < COMP_HIT_LIMIT
    if (countScore(1) < COMP_HIT_LIMIT) {
        setTimeout(function() {
            assignCard(1);
            render();
            compPlay();
        }, 2000);
    } else  {
        if (countScore(1) === countScore(2)) {
            winner = 0;
        } else if (countScore(1) > countScore(2) && countScore(1) <= MAX_SCORE) {
            winner = 1
        } else if (countScore(2) <= MAX_SCORE) {
            winner = 2;
        } else {
            winner = 0;
        };
        render();
    };
}

init();


// Things to fix: Ace should be either 1 or 11.