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

const MISMATCH_DELAY = 1000;

const STORAGE_KEY = "memoryGameResults";

let firstCard = null;
let secondCard = null;

let moves = 0;
let matchedPairs = 0;

let isGameStarted = false;

let isBoardLocked = false;

let closeCardsTimer = null;

const header = document.createElement("header");
