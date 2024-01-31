## Note

This repo includes `readline-sync`, in case you want to get user input from the terminal.
- See the starter code in `solution.js` for a reminder of how `readline-sync` works.
- You do not have to use `readline-sync` if you do not need to!
- **Remember:** you will need to run `npm install` in the terminal before you can start using `readline-sync`!

-----------------------------------------------------------------------------------------

### Custom Project:

# ♥️♠️♦️♣️ BlackJack Terminal Game ♥️♠️♦️♣️

![BlackJack Values](https://www.blackjackapprenticeship.com/wp-content/uploads/2018/08/how-to-play-blackjack-card-values-min.jpg)


### Conditions:
1. Generate a deck of 52 cards with the following values and types:

  - Numerical values: 2, 3, 4, 5, 6, 7, 8, 9, 10.
  - Face cards: J, Q, K, A.
  - Suits: Hearts, Spades, Diamonds, Clubs.
  - At the start of the game, both players (the user and dealer) receive two different random cards.

_These randomly chosen cards are non-replaceable and non-repeating._

#### (Simple) Rules:

3.1 - The game will run for as long as a player either surpasses 21 points or reaches exactly 21.
3.2 - In each turn, both players draw a random card.
3.3 - If a player's total score exceeds 21, the dealer wins. If the player reaches exactly 21, the dealer loses.
3.4 - If the dealer's score exceeds 21, the player wins. If the dealer reaches exactly 21, the player loses.

#### Points:

* Cards: `2 - 10: same value e.g. 2 ♥️ = 2, 6 ♣️ = 6.`
* Cards: `Jack, Queen, King will be = 10.`
* Cards: `Ace will be = 11 or 1` depending on the score. (Needs research)

-------------------------------------------------------------------------------------------

### Code Implementation:

* Since it is a game of cards, I'll be dealing with a bunch of them, so a good approach would be to display the deck of cards (52), which have different values and types, as an object, hopefully in a format like this: `{"number", "type"} e.g. {card: "5", type: "Diamonds"}`.

* I should come up with a `function()` that iterates through arrays of strings: e.g. `values = ["2", "3", "4"...]` and `type = ["Diamonds", "Spades"...]` and can return an array of objects.


* When the deck has been created, this needs to be mixed/shuffled in a way that whenever we play it is always unordered.
  * Find a way to shuffle the already created deck: the `sort()` method might be helpful here...

~~~
function createDeck() {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = ['♥️ Hearts', '♦️ Diamonds', '♣️ Clubs', '♠️ Spades'];
  const deck = [];

  for (let card of cards) {
    for (let suit of suits) {
      deck.push({ card, suit });
    }
  }

  // To shuffle the deck
  deck.sort(() => Math.random() - 0.5);
  return deck;
}
~~~
------------
* A player should also be able to take a card from the deck. For this, another functionality is needed:

~~~
function dealCard() {
  const indexOfCard = Math.floor(Math.random() * newDeck.length);
  const card = newDeck[indexOfCard];
  newDeck.splice(indexOfCard, 1);
  return card;
}
~~~

* `const indexOfCard = Math.floor(Math.random() * newDeck.length);`: will choose a random position of a card inside the deck.
* `const card = newDeck[indexOfCard];`: to pick a random card at a random index.
* `newDeck.splice(indexOfCard, 1);`: choosing the position of the card in the deck and removing it to avoid duplicates.

-------------

* Once a card is dealt, we need to check what score it represents. In order to know this, we can create a function() that receives a card as argument and tells us what value it represents i.e:

~~~
function getCardScore(card) {
  // what happens when you get "J", "Q", "K"?
  if (["J", "Q", "K"].includes(card)) {
    return 10;
    // What happens when you get "A"?
  } else if (card === "A") {
    return 11;
  } else {
    return +card; // converts from string to number.
  }
};
~~~
---------

* In Blackjack, the person who hits exactly 21 points will win, however, if you go over 21, you will have lost.
In order to keep track of the total score in our hand, we need to create a function() that receives a hand as argument, for example:

~~~
function getTotalScore(hand) {
  // Initialized to 0.
  let currentScore = 0;
  // Tracker for Aces (how many "A" so far)
  let countOfAces = 0;

  for (let cardObj of hand) {
    const card = cardObj.card;
    // currentScore will be reassigned to whatever score we get from getCardScore(card)
    currentScore += getCardScore(card);
    if (card === "A") {
      countOfAces++;
      //When "A" is drawn, countOfAces increments by 1.
    }
  }

  //? What happens if you get an A and you exceed 21?
  while (countOfAces > 0 && currentScore > 21) {
    // I subtract 10 from the currentScore and keep only 1.
    currentScore -= 10;
    // and I also decrement countOfAces by 1.
    countOfAces--;
  }
  return currentScore;
}
~~~

* two new variables are needed:
  * `let currentScore = 0;` - to know the total score.
  * `let countOfAces = 0`; - to keep track of how many "A" have been dealt.

- We then iterate (with a for...of loop) through the hand in order to get the score and reassign it to `currentScore` i.e: `{"J", "H"}, {"5", "S"} = 15.`
  * As soon as we hit an "A", our `countOfAces` will increment by 1.

- A while loop is implemented for whenever the `countOfAces is > 0` and `currentScore is > 21`:
 * If that happens, we subtract 10 from `currentScore`, keeping only 1. Also, we reduce the `countOfAces` by 1.
 * We return the `currentScore`.

--------
After all the functions run properly, we run readline-sync to get some inputs from the user, such as:
* `firstName, lastName, age`. Those are requirements the user needs to give to continue with the game.

For the game to run, we need a do..while loop, it will run upon the user typing "start" and as long as they don't type "quit".

The user will get this question: `option = rs.question(When you're ready, please type: "START" to begin or "QUIT" to leave:)`
* If the user types `"start"`, the game starts running. On the other hand, it will exit when the user types `"quit"`.

Inside the do..while loop, there'll be many conditions:
  * each player will start with an empty hand and they'll be given 2x cards each.
    * `playerHand` will have 2x cards face up while `casinoHand` will have 1x face up and 1x face down

We then nest a while loop that will run as long as all is true:
  * We display the cards `const playerScore = getTotalScore(playerHand);` and `const casinoScore = getCardScore(casinoHand[0].card);` and then build 2x conditions for when the player hits 21 and goes over 21.
  * `if (playerScore === 21)`: Blackjack.
  * `if (playerScore > 21)`: player loses.

Depending on the player's hand, they decide if they want to continue or wait: `const action = rs.question('Do you want to HIT or STAND? (Type "HIT" or "STAND")\n> ');`
  * `if (action.toLowerCase() === "hit")` - player deals a new card. A message will return accordingly.
  * `if (action.toLowerCase() === "stand")` - it's the casino's turn. A message will return accordingly. At this point the first while loop breaks.

Another while loop is created for the casino's turn. `while (getTotalScore(casinoHand) < 17 || getTotalScore(casinoHand) < getTotalScore(playerHand))` - when any of those two events happens, the casino deals a new card.

It's time to check each player scores:
 * `const playerScore = getTotalScore(playerHand);`
 * `const casinoScore = getTotalScore(casinoHand);`

Finally, based on each player scores, messages will be logged in the console through a block of code:

~~~
    if (playerScore > 21) {
      console.log(`❌❌ ${firstName[0].toUpperCase() + firstName.slice(1)}, you got greedy, YOU lose! 👎 Better luck next time! 🤝`);
    } else if ((casinoScore <= 21 && casinoScore > playerScore)) {
      console.log(`❌❌ ${firstName[0].toUpperCase() + firstName.slice(1)}, you lose unfortunately 👎😭 Better luck next time! 🤝`);
    } else if (playerScore === casinoScore) {
      if (playerScore === 21 && casinoScore === 21) {
        console.log("IT'S A PUSH!!! (Tie) 😮");
      }
    } else if (playerScore === 21) {
      console.log(`🍾🍾 ${firstName[0].toUpperCase() + firstName.slice(1)}, 💰💰🏁BLACKJACK!!🏁💰💰 YOU WIN!!!💰💰💰`);
    } else {
      console.log(`🍾🍾 ${firstName[0].toUpperCase() + firstName.slice(1)}, the Casino got greedy, YOU WIN!!!💰💰💰`);
    }
~~~

--------

