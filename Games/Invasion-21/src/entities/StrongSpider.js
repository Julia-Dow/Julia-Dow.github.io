import Enemy from "./Enemy.js";
import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, timer } from "../globals.js";
import Animation from "../../lib/Animation.js";

export default class StrongSpider extends Enemy{
    static SCALE = 2;
    static START_X=12;
    static OFFSET=14;
    constructor(dimensions,position,level){
        super(dimensions,position,level);
        this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Spiders),
			Enemy.SIZE,
			Enemy.SIZE
		);
        this.currentFrame = 0;
        this.animation=new Animation([16,17],0.5)

        this.clearDirection();

        this.speed=0.3;
        this.health=this.health*2;
        this.value=this.value*2;
    }

    update(dt){
        super.update()
        this.animation.update(dt);
        this.currentFrame = this.animation.getCurrentFrame();
    }

}