/*-------------- Constants -------------*/

const CARDVALUES = ['🍑', '🍉', '🍋', '🥝', '🍓', '🫐', '🍋', '🍉', '🥝', '🫐', '🍑', '🍓'];
const TOTALPAIRS = 6;
const MATCHEDCARDSOUND = new Audio('assets/audio/matchwin.wav');
const WONGAMESOUND = new Audio('assets/audio/gamewin.ogg');
const LOSTGAMESOUND = new Audio('assets/audio/gameloss.wav');

/*---------- Variables (state) ---------*/
let firstCard; // first card flip
let secondCard; // second card flip -- incremement or decremement tries counter
let boardLocked = false;
let matchedCards = 0;
let triesLeft = 9;

/*----- Cached Element References  -----*/

const selectionEl = document.querySelectorAll('.selection');
const cardsEl = document.querySelectorAll('.card');
const choicesLeftEl = document.querySelector('#tries-num');
const matchedCardsEl = document.querySelector('#pairs-num');
const gameRulesEL = document.querySelector('.game-rules');
const hiddenBtnEl = document.querySelector('.hidden-btn');
const resetBtnEl = document.querySelector('.reset-btn');

/* ----- Modal Refs ----- */
const modal = document.getElementById("helpModal");
const btn = document.getElementById("helpBtn");
const span = document.querySelector(".close");

/*-------------- Functions -------------*/
// render function for DOM changes
const render = () => {
    choicesLeftEl.textContent = triesLeft;
    matchedCardsEl.textContent = matchedCards;

    if (triesLeft === 0) {
        gameRulesEL.textContent = 'You ran out of tries, play again?';
        hiddenBtnEl.style.display = 'block';
    } 
    else if (matchedCards === TOTALPAIRS) {
        gameRulesEL.textContent = 'You found all 6 matches!';
        hiddenBtnEl.style.display = 'block';
    } 
    else {
        gameRulesEL.textContent = 'You have 9 tries to find every match!';
        hiddenBtnEl.style.display = 'none';
    }
}

// card flip function
const handleCardClick = (card) => {
    // prevent tries from going negative
    if (triesLeft <=0) {
        resetChoices(); 
    }
    // check if board locked or double clicking same card
    if (boardLocked || card === firstCard || !card.classList.contains('selection')) {
        return;
    }

    card.classList.remove('selection');

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
        shakeCards();
        boardLocked = true;
        setTimeout(() => {
            firstCard.classList.add('selection');
            secondCard.classList.add('selection');
            resetChoices();
        }, 1000);
    }
}

// shake cards function for no match
const shakeCards = () => {
    firstCard.classList.add('shake');
    secondCard.classList.add('shake');

    setTimeout(() => {
        firstCard.classList.remove('shake');
        secondCard.classList.remove('shake');
    }, 400);
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
        triesLeft--;
        MATCHEDCARDSOUND.play();    

        if(matchedCards === TOTALPAIRS) {  
            WONGAMESOUND.play();
        }

    } else {
        triesLeft--;

        if(triesLeft === 0) {
            LOSTGAMESOUND.play();
            boardLocked = true;
        }
   }
   render();
}

// reset UI after clicking play again -- refactored into render()
// const resetGame = () => {
//     gameRulesEL.textContent = 'You have 9 tries to find every match!';
//     hiddenBtnEl.style.display = 'none';
// }

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

   selectionEl.forEach(card => {
    card.classList.add('selection');
});

    const shuffled = shuffledCards([...CARDVALUES]);

    selectionEl.forEach((card, i) => {
        card.innerHTML = shuffled[i];
    });

    render();
}

/*----------- Event Listeners ----------*/

// Event listener for card clicks/flips
cardsEl.forEach(card => {
  card.addEventListener('click', () => {
    const innerCard = card.querySelector('.selection');
    handleCardClick(innerCard);
  });
});

// Event listener for reset game button
resetBtnEl.addEventListener('click', init);

// event listener for modal open
btn.addEventListener('click', () => {
  modal.style.display = 'block';
});

span.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if(e.target == modal) {
    modal.style.display = 'none';
  }
});

init();