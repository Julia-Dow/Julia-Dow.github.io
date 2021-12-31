import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { images } from "../globals.js";
import Vector from "../../lib/Vector.js";
export default class Tile {
    static SIZE = 32;
    static SCALE = 1
	constructor(tileType,x,y) {
        this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Tiles),
			Tile.SIZE,
			Tile.SIZE
		);		
        this.offSet = new Vector((Tile.SIZE/2)*Tile.SCALE,(Tile.SIZE/2)*Tile.SCALE)
        this.renderPosition = new Vector(x*Tile.SIZE*Tile.SCALE,y*Tile.SIZE*Tile.SCALE)  

        //calculate center position for spider tweening
        this.position = this.renderPosition.subtract(this.offSet)  
        //put renderPosition back to proper values      
        this.renderPosition = new Vector(x*Tile.SIZE*Tile.SCALE,y*Tile.SIZE*Tile.SCALE)          
        this.currentFrame = tileType

	}

    update(){

    }

    render(){
        this.sprites[this.currentFrame].render(this.renderPosition.x,this.renderPosition.y,{ x: Tile.SCALE, y:Tile.SCALE})
    }

}