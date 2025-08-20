import { Card } from "./modulesJs/card.js";
import { logos } from "./modulesJs/logos.js";
import { shuffleCards } from "./modulesJs/shuffleCards.js";

const cards = logos.flatMap((logo, index) => [
  new Card(index * 2 + 1, logo, logo),
  new Card(index * 2 + 2, logo, logo),
]);

const shuffledCards = shuffleCards(cards);

const container = document.getElementById("game-container");

shuffledCards.forEach((card) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card", "backface");  // dos au départ
  cardElement.dataset.id = card.id;
  container.appendChild(cardElement);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;

shuffledCards.forEach((card, index) => {
  const cardElement = container.children[index];
  cardElement.cardData = card;

  cardElement.addEventListener("click", () => {
    if (lockBoard) return;
    if (cardElement === firstCard) return;
    if (cardElement.classList.contains("matched")) return;

    // Retourne la carte : retirer la classe backface
    cardElement.classList.remove("backface");

    // Appliquer l'image de la carte en fond
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
    } else {
      setTimeout(() => {
        // Remettre les cartes face cachée uniquement en ré-ajoutant la classe backface
        firstCard.classList.add("backface");
        secondCard.classList.add("backface");

        // Supprimer l'image (optionnel) pour que le fond soit celui défini dans CSS
        firstCard.style.backgroundImage = "";
        secondCard.style.backgroundImage = "";

        resetBoard();
      }, 1000);
    }
  });
});

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}