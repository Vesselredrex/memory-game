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
