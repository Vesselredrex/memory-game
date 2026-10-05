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
  
  const cardsData = [
    ...cardImages,
    ...cardImages,
  ];
  
  const TOTAL_PAIRS = cardImages.length;
  
  const MISMATCH_DELAY = 1000;
  
  const STORAGE_KEY = "memoryGameResults";
  
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

  const newGameButton = document.createElement("button");

  newGameButton.type = "button";
  
  newGameButton.textContent = "New game";

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

const modalOverlay = document.createElement("div");

modalOverlay.classList.add("modal-overlay");

const modal = document.createElement("div");

modal.classList.add("modal");

modalOverlay.append(modal);

app.after(modalOverlay);

function shuffleCards(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

function createCard(imagePath) {
  const card = document.createElement("button");

  card.type = "button";

  card.classList.add("card");

  card.dataset.image = imagePath;

  card.setAttribute("aria-label", "Closed memory card");

  const image = document.createElement("img");

  image.src = imagePath;

  image.alt = "Memory card";

  image.draggable = false;

  image.classList.add("card-image");

  card.append(image);

  card.addEventListener("click", () => {
    handleCardClick(card);
  });

  return card;
}

function renderCards() {

  gameBoard.replaceChildren();

  const shuffledCards = shuffleCards(cardsData);

  shuffledCards.forEach((imagePath) => {
    const card = createCard(imagePath);

    gameBoard.append(card);
  });
}

function handleCardClick(card) {

  if (isBoardLocked) {
    return;
  }

  if (isGameFinished) {
    return;
  }


  if (card.classList.contains("is-open")) {
    return;
  }

  if (card.classList.contains("is-matched")) {
    return;
  }

  card.classList.add("is-open");

  card.setAttribute("aria-label", "Opened memory card");

  if (!firstCard) {
    firstCard = card;

    return;
  }

  secondCard = card;

rd.
  moves++;

  updateCounters();

  checkCards();
}

function checkCards() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

function handleMatch() {
  firstCard.classList.remove("is-open");

  secondCard.classList.remove("is-open");

  firstCard.classList.add("is-matched");

  secondCard.classList.add("is-matched");

  firstCard.setAttribute("aria-label", "Matched memory card");

  secondCard.setAttribute("aria-label", "Matched memory card");

  matchedPairs++;

  updateCounters();

  resetSelectedCards();

  if (matchedPairs === TOTAL_PAIRS) {
    finishGame();
  }
}

function handleMismatch() {
  isBoardLocked = true;

  closeCardsTimer = setTimeout(() => {
    firstCard.classList.remove("is-open");

    secondCard.classList.remove("is-open");

    firstCard.setAttribute("aria-label", "Closed memory card");

    secondCard.setAttribute("aria-label", "Closed memory card");

    resetSelectedCards();

    isBoardLocked = false;

    closeCardsTimer = null;
  }, MISMATCH_DELAY);
}

function resetSelectedCards() {
  firstCard = null;
  secondCard = null;
}

function updateCounters() {
  movesCounter.textContent = `Moves: ${moves}`;

  pairsCounter.textContent = `Pairs: ${matchedPairs} / ${TOTAL_PAIRS}`;
}

function startNewGame() {

  if (closeCardsTimer !== null) {
    clearTimeout(closeCardsTimer);

    closeCardsTimer = null;
  }

  resetSelectedCards();

  moves = 0;

  matchedPairs = 0;

  isBoardLocked = false;

  isGameFinished = false;

  updateCounters();

  renderCards();
}

function openModal(content) {
  modal.replaceChildren(content);

  modalOverlay.classList.add("is-open");

  document.body.classList.add("modal-open");
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
.
  document.body.classList.remove("modal-open");

  modal.replaceChildren();
}

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay.classList.contains("is-open")) {
    closeModal();
  }
});

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function getResults() {
  const savedResults = localStorage.getItem(STORAGE_KEY);

  if (!savedResults) {
    return [];
  }

  try {
    const results = JSON.parse(savedResults);

    if (Array.isArray(results)) {
      return results;
    }

    return [];
  } catch {
    return [];
  }
}
function saveResult() {
  const results = getResults();

  const now = new Date();

  const result = {
    moves: moves,

    date: formatDate(now),

    timestamp: now.getTime(),
  };

  results.push(result);

  results.sort((a, b) => {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }

    return a.timestamp - b.timestamp;
  });

  const bestResults = results.slice(0, 10);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bestResults));
}

function finishGame() {
  if (isGameFinished) {
    return;
  }

  isGameFinished = true;

  saveResult();

  showVictoryModal();
}

function showVictoryModal() {
  const content = document.createElement("div");

  const title = document.createElement("h2");

  title.classList.add("modal-title");

  title.textContent = "You won!";

  const result = document.createElement("p");

  result.classList.add("modal-text");

  result.textContent = `You finished the game in ${moves} moves.`;

  const buttons = document.createElement("div");

  buttons.classList.add("modal-buttons");

  const newGameModalButton = document.createElement("button");

  newGameModalButton.type = "button";

  newGameModalButton.textContent = "New game";

  newGameModalButton.classList.add("modal-button");

  const closeButton = document.createElement("button");

  closeButton.type = "button";

  closeButton.textContent = "Close";

  closeButton.classList.add("modal-button");

  newGameModalButton.addEventListener("click", () => {
    closeModal();

    startNewGame();
  });

  closeButton.addEventListener("click", closeModal);

  buttons.append(newGameModalButton, closeButton);

  content.append(title, result, buttons);

  openModal(content);
}

function showLeaderboard() {
  const content = document.createElement("div");

  const title = document.createElement("h2");

  title.classList.add("modal-title");

  title.textContent = "High-score table";

  content.append(title);

  const results = getResults();

  if (results.length === 0) {
    const message = document.createElement("p");

    message.classList.add("modal-text");

    message.textContent = "No results yet";

    content.append(message);
  } else {

    const table = document.createElement("table");

    table.classList.add("leaderboard-table");

    const tableHead = document.createElement("thead");

    const headerRow = document.createElement("tr");

    const placeHeader = document.createElement("th");

    placeHeader.textContent = "Place";

    const movesHeader = document.createElement("th");

    movesHeader.textContent = "Moves";

    const dateHeader = document.createElement("th");

    dateHeader.textContent = "Date";

    headerRow.append(placeHeader, movesHeader, dateHeader);

    tableHead.append(headerRow);

    const tableBody = document.createElement("tbody");

    results.forEach((result, index) => {
      const row = document.createElement("tr");

      const placeCell = document.createElement("td");

      placeCell.textContent = index + 1;

      const movesCell = document.createElement("td");

      movesCell.textContent = result.moves;

      const dateCell = document.createElement("td");

      dateCell.textContent = result.date;

      row.append(placeCell, movesCell, dateCell);

      tableBody.append(row);
    });

    table.append(tableHead, tableBody);

    content.append(table);
  }


  const closeButton = document.createElement("button");

  closeButton.type = "button";

  closeButton.textContent = "Close";

  closeButton.classList.add("modal-button");

  closeButton.addEventListener("click", closeModal);

  content.append(closeButton);

  openModal(content);
}


newGameButton.addEventListener("click", startNewGame);

leaderboardButton.addEventListener("click", showLeaderboard);

startNewGame();