/*THIS ClASS IS BASED ON VIKS GAME OBJECT CLASS*/

import Vector from "../../lib/Vector.js";
import { getCollisionDirection } from "../../lib/CollisionHelpers.js";
import Hitbox from "../../lib/Hitbox.js";
import { context } from "../globals.js";

export default class GameObject {
	/**
	 * The base class to be extended by all game objects in the game.
	 *
	 * @param {Vector} dimensions The height and width of the game object.
	 * @param {Vector} position The x and y coordinates of the game object.
	 */
	constructor(dimensions, position) {
		this.dimensions = dimensions;
		this.position = position;
		this.hitboxOffsets = new Hitbox();
		this.hitbox = new Hitbox(
			this.position.x + this.hitboxOffsets.position.x,
			this.position.y + this.hitboxOffsets.position.y,
			this.dimensions.x + this.hitboxOffsets.dimensions.x,
			this.dimensions.y + this.hitboxOffsets.dimensions.y,
		);
		this.sprites = [];
		this.currentFrame = 0;
		this.cleanUp = false;
		this.renderPriority = 0;

		// If an entity can overlap with this game object.
		this.isSolid = false;

		// If an entity should detect if it's overlapping this game object.
		this.isCollidable = false;

		// If the game object should disappear when collided with.
		this.isConsumable = false;

		// If the game object was collided with already.
		this.wasCollided = false;

		// If the game object was consumed already.
		this.wasConsumed = false;
	}

	update(dt) { }

	render(offset = { x: 0, y: 0 }) {
		const x = this.position.x + offset.x;
		const y = this.position.y + offset.y;

		this.sprites[this.currentFrame].render(Math.floor(x), Math.floor(y));

	}

	onConsume(consumer) {
		this.wasConsumed = true;
	}

	onCollision(collider) {
		/**
		 * If this object is solid, then set the
		 * collider's position relative to this object.
		 */

		if (this.wasCollided) {
			return;
		}

		this.wasCollided = true;
	}

	/**
	 * @param {Hitbox} hitbox
	 * @returns Whether this game object collided with an hitbox using AABB collision detection.
	 */
	didCollideWithEntity(hitbox) {
		return this.hitbox.didCollide(hitbox);
	}


}
