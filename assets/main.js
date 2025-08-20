import { initTimer, startTimer, stopTimer, getElapsedTime } from "./modulesJs/timer.js";
import { Card } from "./modulesJs/card.js";
import { logos } from "./modulesJs/logos.js";
import { shuffleCards } from "./modulesJs/shuffleCards.js";

const startBtn = document.getElementById("start-game-btn");
const timerElement = document.getElementById("timer");
const container = document.getElementById("game-container");

let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

initTimer("timer");

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  resetGame();
  setupGameBoard();
  startTimer();
});

function setupGameBoard() {
  container.innerHTML = "";

  const cards = logos.flatMap((logo, index) => [
    new Card(index * 2 + 1, logo, logo),
    new Card(index * 2 + 2, logo, logo),
  ]);

  shuffledCards = shuffleCards(cards);

  shuffledCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", "backface");
    cardElement.dataset.id = card.id;
    container.appendChild(cardElement);
  });

  shuffledCards.forEach((card, index) => {
    const cardElement = container.children[index];
    cardElement.cardData = card;

    cardElement.addEventListener("click", () => {
      if (lockBoard) return;
      if (cardElement === firstCard) return;
      if (cardElement.classList.contains("matched")) return;

      cardElement.classList.remove("backface");
      cardElement.style.backgroundImage = `url('${card.image}')`;

      if (!firstCard) {
        firstCard = cardElement;
        return;
      }

      secondCard = cardElement;
      lockBoard = true;

      if (firstCard.cardData.valeur === secondCard.cardData.valeur) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetBoard();
        checkGameEnd();
      } else {
        setTimeout(() => {
          firstCard.classList.add("backface");
          secondCard.classList.add("backface");
          firstCard.style.backgroundImage = "";
          secondCard.style.backgroundImage = "";
          resetBoard();
        }, 1000);
      }
    });
  });
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function resetGame() {
  container.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkGameEnd() {
  const matchedCards = container.querySelectorAll(".matched");
  if (matchedCards.length === shuffledCards.length) {
    stopTimer();
    alert(`Bravo ! Tu as fini en ${getElapsedTime()} secondes.`);
    startBtn.disabled = false;
  }
}