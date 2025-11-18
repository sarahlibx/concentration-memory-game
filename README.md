- [ ] Screenshot/Logo: A screenshot of your app or a logo.
- [ ] Your game’s name: Include a description of your game and what it does. Background info about the game and why you chose it is a nice touch.
- [ ] Getting started: Include a link to your deployed game and any instructions you deem important. This should also contain a link to your planning materials.
- [ ] Attributions: This section should include links to any external resources (such as libraries or assets) you used to develop your application that require attribution. You can exclude this section if it does not apply to your application.
- [ ] Technologies used: List of the technologies used, for example: JavaScript, HTML, CSS, etc.
- [ ] Next steps: Planned future enhancements (stretch goals).

# Concentration Memory Game

Concentration is a game in which a set of cards are all laid face down on a surface and two cards are flipped face up over each turn. The goal is to find all matches (6 total) before you run out of attempts (9 tries)!

<img width="700" height="auto" alt="Memory Game Demo" src="https://github.com/user-attachments/assets/7825b98f-ad63-443d-bc4c-a9a46aeeedec" />

This version of Concentration offers 6 different matches of fruit emojis, offering you 9 chances to find all 6 matches.

For each match you find, the DOM will continue to display them on the screen, along with incrementing your matches found in a counter. You will also hear an audible sound when you find a match.

For each mismatched attempt, the screen will notify you of a mismatch with a CSS animation followed by the card flipping over and the counter decrementing the number of tries you have remaining.

If you find all 6 matches before the game ends, the screen will notify you of this along with an audible game is won sound.

If you do not find all 6 matches before the game ends, the screen will notify you of this along with an audible game is lost sound.

The play again button will appear at the end of each game.

There is also a help button in the top right of the screen that will display a modal with additional instructions and a visual of the game board.

## Why Concentration?

I chose this game because I wanted to practice displaying a variety of elements and manipulations to the DOM through events, functions and CSS styling.

### Resources

In developing this game, I leaned heavily on a few resources:

- [MDN Docs](https://developer.mozilla.org/en-US/)
- [W3 Schools](https://www.w3schools.com/)
- [Stack Overflow](https://stackoverflow.com/questions)

### Technologies

- JavaScript
- CSS
- HTML
