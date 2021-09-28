import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	keys,
	sounds,
	stateMachine,
	TILE_SIZE
} from "../globals.js";
import PowerUp from "../PowerUp.js";
import State from "./State.js";
import Ball from "../Ball.js";
import Key from "../Key.js";
import { getRandomPositiveNumber } from "../utils.js";

/**
 * Represents the state of the game in which we are actively playing;
 * player should control the paddle, with the ball actively bouncing between
 * the bricks, walls, and the paddle. If the ball goes below the paddle, then
 * the player should lose one point of health and be taken either to the Game
 * Over screen if at 0 health or the Serve screen otherwise.
 */
export default class PlayState extends State {
	constructor() {
		super();		
		this.baseScore = 10;
		this.powerUps = [];
		this.keys = [];
		this.balls = [];
		this.lockedBricks = 0;
	}

	enter(parameters) {
		this.paddle = parameters.paddle;
		this.bricks = parameters.bricks;
		this.health = parameters.health;
		this.score = parameters.score;
		this.ball = parameters.ball;
		this.userInterface = parameters.userInterface;
		this.level = parameters.level;
		this.powerUps = [];
		this.keys = [];
		this.balls = [];
		this.balls.push(this.ball);			
		this.scoreBar = parameters.scoreBar;

		//count locked bricks TODO find better way to count
		this.lockedBricks = 0;
		this.bricks.forEach(brick => {
			if(brick.isLocked && brick.inPlay){
				this.lockedBricks++;
			}
		});	

	}

	checkVictory() {
		/**
		 * The every method executes the provided callback function once for
		 * each element present in the array until it finds the one where callback
		 * returns a falsy value. If such an element is found, the every method
		 * immediately returns false. Otherwise, if callback returns a truthy value
		 * for all elements, every returns true.
		 *
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
		 */
		return this.bricks.every(brick => !brick.inPlay);
	}

	checkLockStuck(){
		let locked = 0
		let inPlay = 0
		this.bricks.forEach(brick  => {
			if(brick.inPlay)
				inPlay++;
			
			if(brick.isLocked)
				locked++;
		});

		return inPlay == locked 
	}

	dropKey(){
		console.log("drop")
		if(1 == Math.floor(getRandomPositiveNumber(1,300)))
			this.keys.push(new Key(getRandomPositiveNumber(0+TILE_SIZE,CANVAS_WIDTH-TILE_SIZE),0 ))
	}

	update(dt) {
		if (this.paused) {
			if (keys.p) {
				keys.p = false;
				this.paused = false;
				sounds.pause.play();
			}
			else {
				return;
			}
		}
		else if (keys.p) {
			keys.p = false;
			this.paused = true;
			sounds.pause.play();
			return;
		}


		this.balls.forEach((ball) => {

			if (ball.didCollide(this.paddle)) {
				// Flip y velocity and reset position to on top of the paddle.
				ball.dy *= -1;
				ball.y = CANVAS_HEIGHT - TILE_SIZE * 2 - TILE_SIZE / 2;

				// Vary the angle of the ball depending on where it hit the paddle.
				ball.handlePaddleCollision(this.paddle);

				sounds.paddleHit.play();
			}		


			this.bricks.forEach((brick) => {
				if (brick.inPlay && ball.didCollide(brick)) {
					
					if(!brick.isLocked || this.paddle.hasKey){
						this.score += this.baseScore * (brick.tier + 1);
						this.userInterface.update(this.health, this.score);

						if(brick.isLocked && this.paddle.hasKey){
							this.score += this.baseScore * 3;
							brick.isLocked = false;
							this.paddle.hasKey = false;
							this.lockedBricks--;
							sounds.wallHit.play();
							ball.handleBrickCollision(brick);
							return
						}


						if(brick.tier == 0){
							// Call the brick's hit function, which removes it from play.
							brick.hit();
							if(PowerUp.didSpawn()){
								this.powerUps.push(new PowerUp(brick.x + brick.width / 2,brick.y + brick.height / 2))
							}

							//if theres a chance it spawns and there are still locked bricks spawns a key
							if(Key.didSpawn() && this.lockedBricks > 0){
								this.keys.push(new Key(brick.x + brick.width / 2,brick.y + brick.height / 2))
							}

						}	

						brick.tier--;
					}
					
					if (this.checkVictory()) {
						sounds.victory.play();

						stateMachine.change('victory', {
							level: this.level,
							paddle: this.paddle,
							health: this.health,
							score: this.score,
							ball: this.ball,
							userInterface: this.userInterface,
							scoreBar: this.scoreBar
						});
					}

					ball.handleBrickCollision(brick);
				}
			});		
		})



		if (this.balls.length == 0) {

			this.health--;	
			this.paddle.setPaddleSize(this.paddle.size-1);
			this.userInterface.update(this.health, this.score);
			sounds.hurt.play();

			if (this.health === 0) {
				stateMachine.change('game-over', {
					score: this.score,
				});
			}
			else {
				stateMachine.change('serve', {
					paddle: this.paddle,
					ball: this.ball,
					bricks: this.bricks,
					health: this.health,
					score: this.score,
					userInterface: this.userInterface,
					level: this.level,
					scoreBar: this.scoreBar
				});
			}
		}

		this.powerUps.forEach((powerUp,i) => {
			powerUp.update(dt);

			if(powerUp.didCollide(this.paddle)){
				this.powerUps.splice(i,1)
				this.balls.push(new Ball())			
				this.balls.push(new Ball())		
			}

		});

		this.keys.forEach((key,i) => {
			key.update(dt);

			if(key.didCollide(this.paddle)){
				this.keys.splice(i,1)
				this.paddle.hasKey = true;
			}

		});

		this.balls.forEach((ball,i) => {
			ball.update(dt);

			if(ball.didFall()){
				this.balls.splice(i,1)
			}

		})

		if(this.scoreBar.milestone <= this.score ){
			this.paddle.setPaddleSize(this.paddle.size+1)
		}	

		if(this.checkLockStuck()){
			this.dropKey()
		}

		this.scoreBar.update(this.score)
		this.paddle.update(dt);
		this.bricks.forEach((brick) => {
			brick.update(dt);
		});
	}

	render() {
		this.userInterface.render();
		this.paddle.render();
		this.scoreBar.render();

		this.bricks.forEach((brick) => {
			brick.render();
		});

		this.powerUps.forEach(powerUp => {
			powerUp.render();
		});

		this.balls.forEach(ball =>{
			ball.render();
		})

		this.keys.forEach(key =>{
			key.render();
		})

		if (this.paused) {
			context.save();
			context.font = "50px Joystix";
			context.fillStyle = "white";
			context.textBaseline = 'middle';
			context.textAlign = 'center';
			context.fillText(`⏸`, CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5);
			context.restore();
		}
	}
}
