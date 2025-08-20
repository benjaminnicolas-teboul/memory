// timer.js (ou ton fichier module)

let timerElement = null;
let timerInterval = null;
let secondsElapsed = 0;

// Initialisation du timer avec l'élément HTML (à appeler une fois dans ton app)
export function initTimer(elementId) {
  timerElement = document.getElementById(elementId);
  if (!timerElement) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }
}

// Démarrer le timer
export function startTimer() {
  if (!timerElement) throw new Error("Timer element not initialized. Call initTimer first.");
  
  secondsElapsed = 0;
  timerElement.textContent = `Temps : ${secondsElapsed}s`;
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerElement.textContent = `Temps : ${secondsElapsed}s`;
  }, 1000);
}

// Arrêter le timer
export function stopTimer() {
  clearInterval(timerInterval);
}

export function getElapsedTime() {
  return secondsElapsed;
}