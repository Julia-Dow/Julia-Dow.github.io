import State from "../../lib/State.js";
import ImageName from "../enums/ImageName.js";
import GameStateName from "../enums/GameStateName.js";
import HighScoreManager from "../services/HighScoreManager.js";
import PersistentStateManager from "../services/PersistentStateManager.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	images,
	keys,
	timer,
	stateMachine,
} from "../globals.js";
import PlayState from "./PlayState.js";

export default class GameOverState extends State {
	static POSITION = {
		start: { x: 480, y: 150 },
		mid: { x: 160, y: 150 },
		end: { x: -160, y: 150 },
	}

	constructor() {
		super();
		this.highScore=HighScoreManager.loadHighScore();
	}

	enter() {
		this.highScore=HighScoreManager.loadHighScore();
		PersistentStateManager.clear();
	}

	update() {
		if (keys.Enter) {
			this.titleScreen();
		}
	}

	render() {
		context.save();
		this.renderTitle();
		this.renderText();
		context.restore();
	}

	renderTitle() {
		context.fillStyle = "Black";
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		images.render(ImageName.GameOver, 0, 0);
		context.font = '50px Invasion';
		context.textAlign = 'center';
		context.fillStyle = "White";
		context.fillText('Game Over', CANVAS_WIDTH / 2, 105);
	}

	renderText() {
		context.font = '30px retganon';
		context.fillText('Press Enter to Try Again', CANVAS_WIDTH / 2, 150);
		context.textAlign = 'left';
		context.fillStyle = "White";
		context.font = '25px retganon';
		context.fillText('🏆HIGHSCORE: '+`${this.highScore}`, 0, CANVAS_HEIGHT-20);
		context.textAlign = 'right';
		context.fillText('🕸️YOU SCORED: '+`${PlayState.SCORE} `, CANVAS_WIDTH, CANVAS_HEIGHT-20);
	}

	titleScreen() {
		keys.Enter = false;
		stateMachine.change(GameStateName.Transition, {
			fromState: this,
			toState: stateMachine.states[GameStateName.TitleScreen]
		});
	}
}


