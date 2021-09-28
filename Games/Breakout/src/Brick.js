import { sounds, TILE_SIZE } from "./globals.js";
import Particle from "./Particle.js";
import SpriteManager from "./SpriteManager.js";
import { getRandomPositiveNumber } from "./utils.js";

export default class Brick {
	/**
	 * Represents a brick in the world space that the ball can collide with;
	 * differently coloured bricks have different point values. On collision,
	 * the ball will bounce away depending on the angle of collision. When all
	 * bricks are cleared in the current map, the player should be taken to a new
	 * layout of bricks.
	 *
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = TILE_SIZE * 2;
		this.height = TILE_SIZE;

		// Used for colouring and score calculation.
		this.tier = 0;

		// Used to determine whether this brick should be rendered.
		this.inPlay = true;

		this.numberOfColours = 5;
		this.colour = Math.floor(getRandomPositiveNumber(0, this.numberOfColours - 1));
		this.sprites = SpriteManager.generateBrickSprites();
		this.lockedSprite = SpriteManager.generateLockedBrickSprites();

		// Used to create a more visually appealing hit animation.
		this.particles = [];
		this.maxParticles = 20;

		//Used to check if the block is locked
		this.isLocked = false;

		// The RGB colours of the bricks. Used for the colour of the particles.
		this.colours = [
			{ r: 99, g: 155, b: 255 }, // blue
			{ r: 106, g: 190, b: 47 }, // green
			{ r: 217, g: 87, b: 99 }, // red
			{ r: 215, g: 123, b: 186 }, // purple
			{ r: 251, g: 242, b: 54 }, // gold
		];
	}

	hit() {
		sounds.brickHit.play();

		// Every time the brick is hit, create 20 new particles.
		for (let i = 0; i < this.maxParticles; i++) {
			this.particles.push(new Particle(
				this.x + this.width / 2,
				this.y + this.height / 2,
				this.colours[this.colour],
			));
		}

		// If we're at a higher tier than the base, we need to go down a tier.
		if (this.tier > 0) {
			this.tier--;
		}
		else {
			// If we're in the first tier, remove brick from play
			this.inPlay = false;
		}
	}

	update(dt) {
		this.particles.forEach((particle) => {
			particle.update(dt);
		});


		/**
		 * The filter() method creates a new array with all elements
		 * that pass the test implemented by the provided function.
		 *
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
		 */
		this.particles = this.particles.filter((particle) => particle.isAlive);
	}

	render() {

		
		if (this.inPlay) {		
			if(this.isLocked){
				this.lockedSprite[0].render(this.x,this.y)
				return 
			}
			
			this.sprites[this.colour * (this.numberOfColours - 1) + this.tier].render(this.x, this.y);
		}

		this.particles.forEach((particle) => {
			particle.render();
		});
		
	}

	//the higher the number the less likly the brick is locked
	static lockedStatus(chance){
		return 1 == Math.floor(getRandomPositiveNumber(1,chance))
	}
}
