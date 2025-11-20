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
let wins = Number(localStorage.getItem('wins')) || 0;
let losses = Number(localStorage.getItem('losses')) || 0;

/*----- Cached Element References  -----*/

const selectionEl = document.querySelectorAll('.selection');
const cardsEl = document.querySelectorAll('.card');
const choicesLeftEl = document.querySelector('#tries-num');
const matchedCardsEl = document.querySelector('#pairs-num');
const gameRulesEL = document.querySelector('.game-rules');
const hiddenBtnEl = document.querySelector('.hidden-btn');
const resetBtnEl = document.querySelector('.reset-btn');
const winsEl = document.querySelector('#wins-count');
const lossesEl = document.querySelector('#losses-count');

/* ----- Help Modal Refs ----- */
const modal = document.getElementById("helpModal");
const btn = document.getElementById("helpBtn");
const span = document.querySelector(".close");

/* ----- Game Over Modal Refs --- */
const gameOverModal = document.querySelector('#game-over-modal');
const gameOverModalContent = document.querySelector('.game-over-modal-content');
const memoryModalMessage = document.querySelector('.memory-message');
const closeGameOverModal = document.querySelector('.close-game-over-modal');

/*-------------- Functions -------------*/
// render function for DOM changes
const render = () => {
    choicesLeftEl.textContent = triesLeft;
    matchedCardsEl.textContent = matchedCards;

    winsEl.textContent = wins;
    lossesEl.textContent = losses;

    if (matchedCards === TOTALPAIRS) {
        gameRulesEL.textContent = 'You found all 6 matches!';
        hiddenBtnEl.style.display = 'block';
    } 
    else if (triesLeft === 0) {
        gameRulesEL.textContent = 'You ran out of tries, play again?';
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

        if(matchedCards === TOTALPAIRS) {  
            WONGAMESOUND.play();
            wins++;
            localStorage.setItem('wins', wins); 
            boardLocked = true;
            showGameOverModal();
            render();
            return;
        }

        if (triesLeft <= 0) {
            LOSTGAMESOUND.play();
            boardLocked = true;
            losses++;
            localStorage.setItem('losses', losses);
            showGameOverModal();
            render();
            return;
        } 

        MATCHEDCARDSOUND.play();    

    } else {
        triesLeft--;

        if(triesLeft === 0) {
            LOSTGAMESOUND.play();
            boardLocked = true;
            losses++;
            localStorage.setItem('losses', losses);
            showGameOverModal();
        }
   }
   render();
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

// display modal on game over
const showGameOverModal = () => {

    gameOverModal.style.display = 'block';
    memoryModalMessage.textContent = "You didn't find all the matches but you've still got a pretty good memory!";

    if (matchedCards === TOTALPAIRS) {
        gameOverModal.style.display = 'block';
        memoryModalMessage.textContent = 'You found all the matches, what a good memory!';
    }
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
    // keeping this console.log in to view current shuffled deck for testing
    console.log("SHUFFLED CARDS:", shuffled); 

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

// event listener for help modal open
btn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// help modal close
span.addEventListener('click', () => {
  modal.style.display = 'none';
});

// modal close on click anywhere on window
window.addEventListener('click', (e) => {
  if(e.target == modal) {
    modal.style.display = 'none';
  }
});

// event listener for game over modal close
closeGameOverModal.addEventListener('click', () => {
    gameOverModal.style.display = 'none';
});

// game over modal close on click anywhere on window
window.addEventListener('click', (e) => {
  if(e.target == modal) {
    gameOverModal.style.display = 'none';
  }
});

init();