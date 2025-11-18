/*-------------- Constants -------------*/

const CARDVALUES = ['&#127827;', '&#127819;', '&#127825;', '&#129373;', '&#127817;', '&#129381;', '&#127825;', '&#127819;', '&#129373;', '&#129381;', '&#127827;', '&#127817;'];
const TOTALPAIRS = 6;
const MATCHEDCARDSOUND = new Audio('../assets/matchwin.wav');
const WONGAMESOUND = new Audio('../assets/gamewin.ogg');
const LOSTGAMESOUND = new Audio('../assets/gameloss.wav');

/*---------- Variables (state) ---------*/
let firstCard; // first card flip
let secondCard; // second card flip -- incremement or decremement tries counter
let boardLocked = false;
let matchedCards = 0;
let triesLeft = 9;

// not sure if I need these yet due to my gameStatusCounter();
// let unflippedCards = [];
// let flippedCards = [];
// let gameStatus; // win or lose

/*----- Cached Element References  -----*/

const cardsEl = document.querySelectorAll('.card');
const choicesLeftEl = document.querySelector('#tries-num');
const matchedCardsEl = document.querySelector('#pairs-num');
const gameRulesEL = document.querySelector('.game-rules');
const hiddenBtnEl = document.querySelector('.hidden-btn');
const resetBtnEl = document.querySelector('.reset-btn');

/*-------------- Functions -------------*/
// render function -- don't need it?
// const render = () => {
// }

// card flip function
const handleCardClick = (card) => {
    // prevent tries from going negative
    if (triesLeft <=0) {
        resetChoices(); 
    }
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
        MATCHEDCARDSOUND.play();
        triesLeft--;
        choicesLeftEl.textContent = triesLeft;

        if(matchedCards === 6) {
            gameRulesEL.textContent = 'You found all 6 matches!';
            hiddenBtnEl.style.display = 'block';   
            WONGAMESOUND.play();
        }
    } else {
        triesLeft--;
        choicesLeftEl.textContent = triesLeft;

        if(triesLeft === 0) {
            gameRulesEL.textContent = 'You ran out of tries, play again?';
            hiddenBtnEl.style.display = 'block';
            boardLocked = true;
            LOSTGAMESOUND.play();
        }
   }
}

// reset UI after clicking play again
const resetGame = () => {
    gameRulesEL.textContent = 'You have 9 tries to find every match!';
    hiddenBtnEl.style.display = 'none';
}

// shuffle cards on reset
const shuffledCards = (cardArray) => {
  let i = cardArray.length,
    randomIndex;

  while (i !== 0) {
    randomIndex = Math.floor(Math.random() * i);
    i--;

    [cardArray[i], cardArray[randomIndex]] = [
      cardArray[randomIndex],
      cardArray[i],
    ];
  }
  return cardArray;
}

// initialize game function
const init = () => {
    matchedCards = 0;
    triesLeft = 9;
    firstCard = null;
    secondCard = null;
    boardLocked = false;

    matchedCardsEl.textContent = matchedCards;
    choicesLeftEl.textContent = triesLeft;

   cardsEl.forEach(card => {
    card.classList.add('hidden');
});

    const shuffled = shuffledCards([...CARDVALUES]);

    cardsEl.forEach((card, i) => {
        card.innerHTML = shuffled[i];
    });

    resetGame();
}

/*----------- Event Listeners ----------*/

// Event listener for card clicks/flips
cardsEl.forEach(card => {
  card.addEventListener('click', () => handleCardClick(card));
});

// Event listener for reset game button
resetBtnEl.addEventListener('click', init);

init();