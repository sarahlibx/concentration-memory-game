User Stories:
// - See a landing page to know I’m in the right place
// - Be given clear instructions on how to play — 10 cards, 5 matches, 7 attempts
// - See clearly defined tries/pairs to let me know when I run out of attempts
// - See clearly labeled cards to click on to select my game move
// - See visual feedback after my selection (re: cards match & stay flipped vs no match and card flip back over)
// - See a game result message (win vs out of attempts)
// - See a reset/replay game button

Pseudocode:
// - Define constants & variables — in ALL_CAPS
// - Const: cardValues — set values — ensure pairs (10 cards, 5 pairs)
// - Const: maxAttempts — 8 attempts to get all 5 pairs
// - Let: unflippedCards — empty array to store current unflipped cards
// - Let: flippedCards — empty array to store current flipped cards

// - Define state variables but don’t assign values to them
// - Variable for user’s choice
// - Variable for state of game board — flipped vs unflipped cards
// - Variable for game message/status

// - Select & save cached elements for things that need to be accessed more than once
// - Results display element

// - Add event listeners
// - Event listener for card clicks/flips
// - Event listener for reset button

// - Invoke init function used to initialize all state variables/game

// - Invoke primary render function that transfers all defined state variables to the DOM
// - Render game message to the DOM

// - Wait for the user to click on a card
// - Update all state variables with the correct values depending on the user’s choice — if/else re: match vs not a match statement
// - Invoke the primary render function
// - Render game message to the DOM

// - Function for card flips
// - Compare card 1 to card 2, keep them flipped if a match
// - If not a match, flip cards back over and prompt for a new selection

// - Function for remaining flips/attempts counter
// - 8 attempts given
// - Decrement the counter by 1 for every 2 card flips
// - Set message for “out of attempts/try again”

// - Wait for user to click play again button
// - Invoke init to reset all state variables to their initial values
// - Reset the cards
// - Reset the tries/pairs to 0

// - Stretch goals
// - Shuffle cards on reset button click
// - Display a modal when the game ends with the result & play again button
// - Media queries for responsive screen sizes
