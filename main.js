console.clear()
import rs from "readline-sync";

console.log("\n");
console.log("┌────────────────────────────────────────┐");
console.log("│   ♥️♠️♦️♣️ Black Jack Terminal Game ♥️♠️♦️♣️   │");
console.log("└────────────────────────────────────────┘");
console.log("=================================================");
console.log("=================================================");
console.log("\n");

//-------------------------------------------------------------

//* In order to play, I need to come up with a function that creates a deck of cards:

function createDeck() {
  const cards = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const suits = ["♥️ Hearts", "♦️ Diamonds", "♣️ Clubs", "♠️ Spades"];
  const deck = [];

  for (let card of cards) {
    for (let suit of suits) {
      deck.push({ card, suit });
    }
  }
  //* To shuffle the deck
  deck.sort(() => Math.random() - 0.5);
  return deck;
}

const newDeck = createDeck();
// console.log(createDeck());

//* Once the deck is shuffled, I need to be able to deal a card from it:
//! - The card must be removed from the playing deck so that it can't be dealt again or repeated.

function dealCard() {
  const indexOfCard = Math.floor(Math.random() * newDeck.length);
  const card = newDeck[indexOfCard];
  // With splice, I make sure the dealt card is removed from the shuffled deck: (indexOfCard, 1)
  newDeck.splice(indexOfCard, 1);

  return card;
} // Now I'm drawing a card that is completely random from a shuffled deck

//* Creating 2 new variables to store whatever card we get from above in an array.
const playerHand = [];
const casinoHand = [];

playerHand.push(dealCard(newDeck));
playerHand.push(dealCard(newDeck));
casinoHand.push(dealCard(newDeck));
casinoHand.push(dealCard(newDeck));

//* as the players are drawn cards, I must create a function to keep track of their scores:

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
}

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


//* Game registration (Validation):
let firstName;
do {
  firstName = rs.question("Enter your first name: \n> ");
} while (firstName === "" || !isNaN(firstName));

let lastName;
do {
  lastName = rs.question("Enter your last name: \n> ");
} while (lastName === "" || !isNaN(lastName));

let age;
do {
  age = rs.question("Enter your age: \n> ");
} while (isNaN(age) || age === "" || age.length !== 2);

console.log(`Thanks, ${firstName[0].toUpperCase() + firstName.slice(1)}! `);

//*Tests:

let option;

do {
  console.log("▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️");

  option = rs.question(
    `When you're ready, please type: "START" to begin or "QUIT" to leave: \n> `
  );

  console.log(newDeck);

  if (newDeck.length <= 15 || newDeck.length === 0) {
    console.log("▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️");
    console.log("❗At this point, it would not be fair to keep playing, please standby while we look for a new deck and start over!");
    break;
  }

  if (option.toLowerCase() === "start") {
    //* Player deals initial cards:
    //Initializing both player and casino's hand to 0.
    playerHand.length = 0; // Clear existing cards
    casinoHand.length = 0; // Clear existing cards

    //Player starts with 2 cards face up:
    playerHand.push(dealCard(newDeck));
    playerHand.push(dealCard(newDeck));
    // Casino starts with 2 cards, 1 face up while the other one is face down:
    casinoHand.push(dealCard(newDeck));
    casinoHand.push(dealCard(newDeck));

    while (true) {
      //* Display current cards:
      const playerScore = getTotalScore(playerHand);
      const casinoScore = getCardScore(casinoHand[0].card);

      console.log("▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️");

      console.log(
        `${firstName[0].toUpperCase() + firstName.slice(1)}'s hand: \n> ${playerHand
          .map((card) => `${card.card} of ${card.suit}`)
          .join(", ")}`,
        "(Total:",
        playerScore,
        ")"
      );

      console.log(
        `Casino's hand: \n> ${casinoHand[0].card} of ${casinoHand[0].suit}`,
        "(Partial Total:",
        casinoScore,
        ")"
      );

      console.log("▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️");

      if (playerScore === 21) {
        console.log(
          `${firstName[0].toUpperCase() + firstName.slice(1)}`, "💰💰🏁BLACKJACK!!🏁💰💰 Your score is:", playerScore,",", "whereas the Casino had:", casinoScore);
          break;
        }

      if (playerScore > 21) {
        console.log(
          `${firstName[0].toUpperCase() + firstName.slice(1)}, you lose! ❌❌❌❌`, "Your score is:",playerScore, "whereas the Casino had:", casinoScore);
        break;
      }

      const action = rs.question(
        '❓ Do you want to HIT or STAND? (Type "HIT" or "STAND") ❓\n> ');

      if (action.toLowerCase() === "hit") {
        playerHand.push(dealCard(newDeck));
      } else if (action.toLowerCase() === "stand") {
        console.log(`The casino plays now!! 🙏🙏`);
        // If the code gets to this point, it breaks and it moves onto the casino's turn
        break;
      } else {
        console.log('Invalid input. Please enter "HIT" or "STAND".');
        continue;
        //Continue asking the question when the input is invalid.
      }
    }

    // Casino's turn
    while (getTotalScore(casinoHand)  < 21 || getTotalScore(casinoHand) < getTotalScore(playerHand)) {
      casinoHand.push(dealCard(newDeck));
    }

    //* I need to check the winner now:
    const playerScore = getTotalScore(playerHand);
    const casinoScore = getTotalScore(casinoHand);

    console.log("▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️");
    console.log("⬇️ SUMMARY ⬇️");
    console.log("");

    console.log(
      `${
        firstName[0].toUpperCase() + firstName.slice(1)
      }'s hand was: \n> ${playerHand
        .map((card) => `${card.card} of ${card.suit}`)
        .join(", ")}`,
      "(Total:",
      playerScore,
      ")"
    );
    console.log(
      `...while the Casino's hand was or would have been: \n> ${casinoHand
        .map((card) => `${card.card} of ${card.suit}`)
        .join(", ")}`,
      "(Total:",
      casinoScore,
      ")"
    );
    console.log("▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️");


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

    console.log("▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️");
    console.log("");

    let again = rs.question(`Would you like to play again? (Type "YES" or "NO") \n> `)

    if (again.toLowerCase() === "yes") {
      continue;
    } else {
      break;
    }
  }
} while (option.toLowerCase() !== "quit");
