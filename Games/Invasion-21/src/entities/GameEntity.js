import Vector from "../../lib/Vector.js";
import SelectableObject from "../objects/SelectableObject.js";

//THE BASE OF THIS CLASS WAS TAKEN FROM VIKS MARIO ASSIGNMENT
export default class GameEntity extends SelectableObject{
	/**
	 * The base class to be extended by all game objects in the game.
	 *
	 * @param {Vector} dimensions The height and width of the game object.
	 * @param {Vector} position The x and y coordinates of the game object.
	 */
	constructor(dimensions, position) {
		super()
		this.dimensions = dimensions;
		this.position = position;
		this.sprites = [];
		this.cleanUp = false;
		this.currentFrame = 0;
        
		this.selectable = false
		/*VIKS CODE
		// If an entity can overlap with this game object.
		this.isSolid = false;

		// If an entity should detect if it's overlapping this game object.
		this.isCollidable = false;

		// If the game object should disappear when collided with.
		this.isConsumable = false;

		// If the game object was collided with already.
		this.wasCollided = false;

		// If the game object was consumed already.
		this.wasConsumed = false;*/
	}

	update(dt) { 
		if(this.selectable){
			super.update()
		}
	}

	render() {
		this.sprites[this.currentFrame].render(this.position.x, this.position.y);
	}

    generateSprites(measurements){
        
    }

	onConsume(consumer) {
		this.wasConsumed = true;
	}

	onCollision(collider) {
		this.wasCollided = true;
	}

	didCollideWithEntity(hitbox) {
		
	}
}
