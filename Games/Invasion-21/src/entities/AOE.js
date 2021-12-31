import Tower from "./Tower.js";
import Bullet from "../objects/Bullet.js";
import Vector from "../../lib/Vector.js";
import { context,sounds } from "../globals.js";
import SoundName from "../enums/SoundName.js";

export default class AOE extends Tower {
    static FRAME = 1;
    static PRICE = 80;
    constructor(dimensions,position,level){
        super(dimensions,position,level);
        this.bullets=[];
        this.currentFrame = AOE.FRAME
        this.lastAngle = null
        this.price = AOE.PRICE
    }

    action(){
        if(this.enemiesInRadius.length > 0){
            //right
            this.bullets.push(new Bullet(new Vector(Bullet.SIZE,Bullet.SIZE),new Vector(this.position.x+Tower.SIZE/2,this.position.y+Tower.SIZE/2),new Vector(this.position.x+Tower.SIZE/2+1,this.position.y+Tower.SIZE/2)))
            //left 
            this.bullets.push(new Bullet(new Vector(Bullet.SIZE,Bullet.SIZE),new Vector(this.position.x+Tower.SIZE/2,this.position.y+Tower.SIZE/2),new Vector(this.position.x-(Tower.SIZE/2+1),this.position.y+Tower.SIZE/2)))
            //up
            this.bullets.push(new Bullet(new Vector(Bullet.SIZE,Bullet.SIZE),new Vector(this.position.x+Tower.SIZE/2,this.position.y+Tower.SIZE/2),new Vector(this.position.x+Tower.SIZE/2,this.position.y-(Tower.SIZE/2+1))))
            //down
            this.bullets.push(new Bullet(new Vector(Bullet.SIZE,Bullet.SIZE),new Vector(this.position.x+Tower.SIZE/2,this.position.y+Tower.SIZE/2),new Vector(this.position.x+Tower.SIZE/2,this.position.y+Tower.SIZE/2+1)))
        }
    }

    update(dt){
        super.update()    

        this.bullets.forEach(bullet => {
            bullet.update(dt);
            
            //make for loop
            for(let i = 0; i < this.level.Spiders.length; i++){
                if(this.bulletEnemyCollision(bullet,this.level.Spiders[i]))
                {
                    sounds.play(SoundName.AOE);
                    this.level.Spiders[i].health -= bullet.damage
                    bullet.cleanUp = true;
                }
            }

        })

        this.bullets = this.bullets.filter((entity) => !entity.cleanUp);
    }

    
    render(){
        this.bullets.forEach(bullet => bullet.render())

        super.render()
    }
}