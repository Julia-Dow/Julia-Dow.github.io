import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import SmallSpider from "../entities/SmallSpider.js";
import ImageName from "../enums/ImageName.js";
import { context, images,tiles } from "../globals.js";

export default class Button {
    static SIZE = 16;

	constructor(Type,frame,position) {
        this.Type = Type 

        this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Towers),
			Button.SIZE,
			Button.SIZE
		);	

        this.currentFrame = frame
        console.log(this.currentFrame)
        console.log(frame)

        this.position = position
        
	}

    update(){

    }

    render(){
        this.sprites[this.currentFrame].render(this.position.x,this.position.y,{x:1,y:1})     
    }

    placeTower(){
        
    }


}