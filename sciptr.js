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

let firstCard = null;
let secondCard = null;

let moves = 0;
let matchedPairs = 0;

let isBoardLocked = false;
let isGameStarted = false;

let closeCardsTimer = null;

const header = document.createElement("header");
