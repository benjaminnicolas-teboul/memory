import { displayScores } from "./displayScores.js";

export function fetchAndDisplayScores() {
  fetch('https://memory-backend-kvd60uyb0-nicolas-teboul-benjamins-projects.vercel.app/api/score')
    .then(res => res.json())
    .then(data => displayScores(data))
    .catch(err => console.error('Erreur récupération scores:', err));
}