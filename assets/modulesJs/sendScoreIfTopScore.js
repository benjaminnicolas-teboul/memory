import { sendScore } from './sendScore.js';
import { fetchAndDisplayScores } from './fetchAndDisplayScores.js'; // ajout ./ devant nom de fichier
import {displayScores} from './displayScores.js';

export async function sendScoreIfTopScore(playerName, playerScore) {
  try {
    // Récupérer les scores actuels
    const response = await fetch('https://memory-backend-kvd60uyb0-nicolas-teboul-benjamins-projects.vercel.app/api/score');
    const meilleursScores = await response.json();

    // Vérifier si on a moins de 10 scores ou si le nouveau score est meilleur que n’importe quel score existant
    if (
      meilleursScores.length < 10 ||
      meilleursScores.some(score => playerScore > score.score)
    ) {
      // Envoyer le score car il est dans le top 10
      await sendScore(playerName, playerScore);
      // Actualiser la liste des scores affichés
      fetchAndDisplayScores();
    } else {
      // Score pas assez bon pour entrer dans le top 10, juste afficher la liste
      displayScores(meilleursScores);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi conditionnel du score", error);
    displayScores(meilleursScores); // afficher quand même la liste en cas d'erreur
  }
}