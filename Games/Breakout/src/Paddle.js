import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	keys,
	TILE_SIZE
} from "./globals.js";
import SpriteManager from "./SpriteManager.js";

/**
 * Represents a paddle that can move left and right. Used in the main
 * program to deflect the ball toward the bricks; if the ball passes
 * the paddle, the player loses one heart. The Paddle can have a skin,
 * which the player gets to choose upon starting the game.
 */
export default class Paddle {
	constructor() {		
		
		// Starting dimensions.
		this.width = TILE_SIZE * 4;
		this.height = TILE_SIZE;

		// X is placed in the middle.
		this.x = CANVAS_WIDTH / 2 - this.width/2

		// Y is placed a little above the bottom edge of the screen.
		this.y = CANVAS_HEIGHT - TILE_SIZE * 2;

		// Start us off with no velocity.
		this.dx = 0;

		// The skin only has the effect of changing our color.
		this.skin = 0;

		/**
		 * The variant is which of the four paddle sizes we currently are;
		 * 1 is the starting size, as the smallest is too tough to start with.
		 */
		this.size = 1;

		this.paddleSpeed = 500;

		this.sprites = SpriteManager.generatePaddleSprites();

		this.keySprite = SpriteManager.generateKeySprites()

		this.hasKey = false;
	}

	setPaddleSize(newSize){
		if(newSize >= 0 && newSize <= 3){
			this.size = newSize;
			this.width = TILE_SIZE * 2 + (TILE_SIZE * this.size * 2 ) ;
		}

	}

	update(dt) {
		if (keys.a) {
			this.dx = -this.paddleSpeed;
		}
		else if (keys.d) {
			this.dx = this.paddleSpeed;
		}
		else {
			this.dx = 0
		}

		if (this.dx < 0) {
			/**
			 * Math.max ensures that we're the greater of 0 or the player's
			 * current calculated Y position when pressing up so that we don't
			 * go into the negatives; the movement calculation is simply our
			 * previously-defined paddle speed scaled by dt.
			 */
			this.x = Math.max(0, this.x + this.dx * dt)
		}
		else {
			/**
			 * Math.min ensures we don't go any farther than the bottom of the
			 * screen minus the paddle's height (or else it will go partially
			 * below, since position is based on its top left corner).
			 */
			this.x = Math.min(CANVAS_WIDTH - this.width, this.x + this.dx * dt)
		}
	}

	render() {
		this.sprites[this.size + 4 * this.skin].render(this.x, this.y);
		if(this.hasKey)
			this.keySprite[0].render(this.x+this.width/2-TILE_SIZE/2,this.y)
	}
}
