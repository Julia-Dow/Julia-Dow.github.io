import SpriteManager from "./SpriteManager.js";
import Vector from "./Vector.js";
import { getRandomNumber, getRandomNegativeNumber } from "./utils.js";
import { CANVAS_HEIGHT, TILE_SIZE } from "./globals.js";
export default class PowerUp{
    constructor(x,y){
        this.position = new Vector(x, y);
		this.velocity = new Vector(1, getRandomNegativeNumber(20, 20));
		this.acceleration = new Vector(0, 0);
		this.gravity = new Vector(0, 85);
        this.sprites = SpriteManager.generatePowerUpSprites()
        this.width = TILE_SIZE;
        this.height = TILE_SIZE;


        this.applyForce(this.gravity);
    }
    applyForce(force) {
		this.acceleration.add(force);
	}

	/**
	 * Updates the velocity and position of the particle.
	 * as well as decrements the life value over time.
	 */
	update(dt) {
		this.velocity.add(this.acceleration, dt);
		this.position.add(this.velocity, dt);
	}

    render(){
        this.sprites[0].render(this.position.x,this.position.y);
    }

    static didSpawn(){
        if( 1 == Math.floor(getRandomNumber(1,4))){
            return true;
        }
         
        return false;
    }

    didFall() {
		return this.position.y > CANVAS_HEIGHT
	}

    didCollide(target) {

		if (this.position.x + this.width >= target.x
			&& this.position.x <= target.x + target.width
			&& this.position.y + this.height >= target.y
			&& this.position.y <= target.y + target.height) {
			return true;
		}

		// If the above isn't true, they're overlapping.
		return false;
	}

}