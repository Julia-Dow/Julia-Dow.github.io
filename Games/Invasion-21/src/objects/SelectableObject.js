import Vector from "../../lib/Vector.js";
import { getCollisionDirection, isAABBCollision } from "../../lib/CollisionHelpers.js";
import Hitbox from "../../lib/Hitbox.js";
import { context, mouse } from "../globals.js";

export default class SelectableObject {

	constructor() {
        this.selected = false;

        //using the capital s in front to indicate that these properties are only for selection
        this.Sposition = null;
        this.Sdimentions = null;
    }

    update(){
        if(this.mouseOver()){
            document.body.style.cursor = 'pointer'; 
        }
    }

    mouseOver(){

        if(!isAABBCollision(
            mouse.x,
            mouse.y,
            .01,
            .01,
            this.Sposition.x,
            this.Sposition.y,
            this.Sdimentions.x,
            this.Sdimentions.y
                                 
            ))
            { return false}
        
        return true
    }

}
