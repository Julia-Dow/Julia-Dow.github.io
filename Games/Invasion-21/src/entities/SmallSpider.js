import Enemy from "./Enemy.js";
import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, timer } from "../globals.js";
import Animation from "../../lib/Animation.js";
import Paths from "../enums/Paths.js";

export default class SmallSpider extends Enemy{
    static SCALE = 2;
    static OFFSET=14;
    constructor(dimensions,position,level){
        super(dimensions,position,level);
        this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Spiders),
			Enemy.SIZE,
			Enemy.SIZE
		);
        this.currentFrame = 0;
        this.animation=new Animation([0,1],0.5)

        this.speed=0.4;
    }

    update(dt){
        super.update()
        this.animation.update(dt);
        this.currentFrame = this.animation.getCurrentFrame();   
    }
}