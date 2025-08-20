const scoresContainer = document.getElementById('scoresList');

export function displayScores(scores) {
  scoresContainer.innerHTML = scores.map(
    s => `<div>${s.player} : ${s.score} secondes</div>`
  ).join('');
}