/*-------------- Constants -------------*/

// Const: cardValues — set values — ensure pairs (10 cards, 5 pairs)
// Const: maxAttempts — 9 attempts to get all 6 pairs
// Let: unflippedCards — empty array to store current unflipped cards
// Let: flippedCards — empty array to store current flipped cards

const cardValues = ['&#127827;', '&#127819;', '&#127825;', '&#129373;', '&#129817;', '&#129381;', '&#127825;', '&#127819;', '&#129373;', '&#129381;', '&#127827;', '&#127817;'];
const totalPairs = 6;

/*---------- Variables (state) ---------*/
let firstCard; // first card flip
let secondCard; // second card flip -- incremement or decremement tries counter (state of game)
let boardLocked = false;
let matchedCards = 0; // matching cards -- disable event listeners
let triesLeft = 9;

// not sure if I need these yet due to my gameStatusCounter();
let unflippedCards = [];
let flippedCards = [];

let gameStatus; // win or lose

/*----- Cached Element References  -----*/

const cardsEl = document.querySelectorAll('.card');
const resetBtnEl = document.querySelector('.reset-btn');
const choicesLeftEl = document.querySelector('#tries-num');
const matchedCardsEl = document.querySelector('#pairs-num');

/*-------------- Functions -------------*/
// render function
const render = () => {

}
// card flip function
const handleCardClick = (card) => {
    // check if board locked or double clicking same card
    if (boardLocked || card === firstCard || !card.classList.contains('hidden')) {
        return;
    }

    card.classList.remove('hidden');

    if(!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    boardLocked = true;

    checkMatch();
}

// check card match function
const checkMatch = () => {
    let isMatch = firstCard.textContent === secondCard.textContent;

    if (isMatch) {
        gameStatusCounter(true);
        resetChoices();
    } else {
        gameStatusCounter(false);
        boardLocked = true;
        setTimeout(() => {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            resetChoices();
        }, 1000);
    }
}

// reset cards between mismatched choices
const resetChoices = () => {
    firstCard = null;
    secondCard = null;
    boardLocked = false;
}

// remaining choices counter
const gameStatusCounter = (isMatch) => {
    if (!firstCard || !secondCard) return;

    if (isMatch) {
        matchedCards++;
        matchedCardsEl.textContent = matchedCards;
    } else {
        triesLeft--;
        choicesLeftEl.textContent = triesLeft;
   }
}

// initialize game function
const init = () => {
    matchedCards = 0;
    triesLeft = 9;
    firstCard = null;
    secondCard = null;
    boardLocked = false;

    cardsEl.forEach(card => {
        card.classList.add('hidden');
    });

    render();
}

/*----------- Event Listeners ----------*/

// Event listener for card clicks/flips
cardsEl.forEach(card => {
  card.addEventListener('click', () => handleCardClick(card));
});

// Event listener for reset button
resetBtnEl.addEventListener('click', init);

init();