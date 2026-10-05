const cardImages = [
  "./assets/cat.png",
  "./assets/dog.png",
  "./assets/fox.png",
  "./assets/panda.png",
  "./assets/lion.png",
  "./assets/rabbit.png",
  "./assets/bear.png",
  "./assets/koala.png",
];

const cardsData = [...cardImages, ...cardImages]; // Duplicate the images for pairs 05.10

const TOTAL_PAIRS = cardImages.length;

let firstCard = null;

let secondCard = null;

let moves = 0;

let matchedPairs = 0;

let isBoardLocked = false;

let isGameFinished = false;

let closeCardsTimer = null;

const app = document.createElement("div");

app.classList.add("app");

document.body.prepend(app);

const header = document.createElement("header");

header.classList.add("header");

newGameButton.type = "button";

newGameButton.textContent = "New Game";

newGameButton.classList.add("header-button");

const leaderboardButton = document.createElement("button");

leaderboardButton.type = "button";

leaderboardButton.textContent = "High-score table";

leaderboardButton.classList.add("header-button");

header.append(newGameButton, leaderboardButton);

app.append(header);

const main = document.createElement("main");

main.classList.add("main");

app.append(main);

const counters = document.createElement("div");

counters.classList.add("counters");

const movesCounter = document.createElement("p");

movesCounter.classList.add("counter");

const pairsCounter = document.createElement("p");

pairsCounter.classList.add("counter");

counters.append(movesCounter, pairsCounter);

main.append(counters);

const gameBoard = document.createElement("div");

gameBoard.classList.add("game-board");

gameBoard.setAttribute("aria-label", "Memory game board");

main.append(gameBoard);
