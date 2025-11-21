# Concentration Memory Game

Concentration is a game in which a set of cards are all laid face down on a surface and two cards are flipped face up over each turn. The goal is to find all matches (6 total) before you run out of attempts (9 tries)!

<img width="700" height="auto" alt="Memory Game Demo" src="https://github.com/user-attachments/assets/bf8eafc7-8112-4307-b2ba-c5bd8ffacd27" />

This version of Concentration offers 6 different matches of fruit emojis, offering you 9 chances to find all 6 matches.

For each match you find, the DOM will continue to display them on the screen, along with incrementing your matches found in a counter. You will also hear an audible sound when you find a match.

For each mismatched attempt, the screen will notify you of a mismatch with a CSS animation followed by the card flipping over and the counter decrementing the number of tries you have remaining.

If you find all 6 matches before the game ends, the screen will notify you of this along with an audible game is won sound.

If you do not find all 6 matches before the game ends, the screen will notify you of this along with an audible game is lost sound.

The play again button will appear at the end of each game.

There is also a modal that will trigger at the end of each game, displaying a message based on if you won or lost.

There is also a help button in the top right of the screen that will display a modal with additional instructions and a visual of the game board.

## Why Concentration?

I chose this game because I grew up as an only child and remember playing Memory over and over! I implemented my chosen methods because wanted to practice displaying a variety of elements and manipulations to the DOM through events, functions and CSS styling.

## Play the game here: [Concentration Game](https://sarahlibx.github.io/concentration-memory-game/)

### Resources

In developing this game, I leaned heavily on a few resources:

- [MDN Docs](https://developer.mozilla.org/en-US/)
- [W3 Schools](https://www.w3schools.com/)
- [Geeks for Geeks](https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/)
- [Stack Overflow](https://stackoverflow.com/questions)
- [CSS Tricks](https://css-tricks.com)
- [Google -- to research other concentration games!](https://www.google.com)
- [Freesound](https://freesound.org)
- Ashley Sands, our instructor for navigating browser quirks!

### Technologies

- JavaScript
- CSS
- HTML

#### Future Plans/Stretch Goals

- Responsive mobile first design
- Create flip animation with the cards
- Add modal at end of game to display outcome (number of wins vs losses & matches found this round)
- Add timer for each round of play to include in game stats modal
- Show all matching cards at the end of each round OR for a quick second on game load for the user to "memorize" the board
