export function sendScore(player, score) {
  fetch('https://memory-backend-kvd60uyb0-nicolas-teboul-benjamins-projects.vercel.app/api/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player: player, score: score })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Score send', data);
  })
  .catch(error => {
    console.error('Error  while sending score', error);
  });
}