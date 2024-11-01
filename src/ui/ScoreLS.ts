export class ScoreLS {
  static getScores() {
    return JSON.parse(localStorage.getItem('scores') || '[]');
  }

  static addScore(score: number) {
    // If the given score is better than the worst score in the top 5, add it
    const scores = ScoreLS.getScores();
    if (scores.length < 5 || score > scores[scores.length - 1]) {
      scores.push(score);
      scores.sort((a: number, b: number) => b - a);
      scores.length = Math.min(scores.length, 5);
      localStorage.setItem('scores', JSON.stringify(scores));
    }
  }
}
