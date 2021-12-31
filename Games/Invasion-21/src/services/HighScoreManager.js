/**
 * This class is responsible for reading and writing the high scores
 * of our game to and from the browser's local storage. Local storage
 * is a simple way to store small key/value pairs (kind of like cookies)
 * for a particular domain on your browser.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
export default class HighScoreManager {
	static loadHighScore() {
		/**
		 * Since the high scores are being saved as a string containing JSON,
		 * we must parse the string into a valid JavaScript object in order
		 * to manipulate it.
		 */
		const highScore = JSON.parse(localStorage.getItem('highScore')) ?? 0;

		if (highScore === 0) {
			localStorage.setItem('highScore', JSON.stringify(0));
		}

		return highScore;
	}

	static addHighScore(score) {
		let highScore = HighScoreManager.loadHighScore();

		if(score>highScore)
			localStorage.setItem('highScore', JSON.stringify(score));
	}
}
