import Tower from "./Tower.js";
import Bullet from "../objects/Bullet.js";
import Vector from "../../lib/Vector.js";
import CannonBall from "../objects/CannonBall.js";
import { context, sounds } from "../globals.js";
import SoundName from "../enums/SoundName.js";

export default class Cannon extends Tower {
    static FRAME = 0;
    static PRICE=50;
    constructor(dimensions,position,level){
        super(dimensions,position,level);
        this.bullets=[];
        this.currentFrame = Cannon.FRAME
        this.lastAngle = null
        this.price = Cannon.PRICE
    }

    action(){
        if(this.enemiesInRadius.length > 0){
            this.bullets.push(new CannonBall(new Vector(Bullet.SIZE,Bullet.SIZE),new Vector(this.position.x+Tower.SIZE/2,this.position.y+Tower.SIZE/2),this.enemiesInRadius[0].getCenterPosition()))
            this.lastAngle = this.calculateAngle(this.enemiesInRadius[0].getCenterPosition().x,this.enemiesInRadius[0].getCenterPosition().y)
        }
    }

    update(dt){
        super.update()    
        /*    
        if(this.enemiesInRadius.length > 0 && this.CanAction){
            this.CanAction = false;
            timer.addTask(()=>{},0,this.speed,()=>{
                
                this.action()
                this.CanAction = true;
            })
        }*/

        this.bullets.forEach(bullet => {
            bullet.update(dt);
            
            //make for loop
            for(let i = 0; i < this.level.Spiders.length; i++){
                if(this.bulletEnemyCollision(bullet,this.level.Spiders[i]))
                {
                    sounds.play(SoundName.Bomb);
                    this.level.Spiders[i].health -= bullet.damage
                    bullet.cleanUp = true;
                }
            }

        })

        this.bullets = this.bullets.filter((entity) => !entity.cleanUp);
    }

    
    render(){
        this.bullets.forEach(bullet => bullet.render())



        context.save()        

        context.translate(this.position.x,this.position.y)        
        
        if(this.selected){       
            this.drawRadius()
        }

        context.translate(Tower.SIZE/2 , Tower.SIZE/2)         
        
        if(this.lastAngle != null){
            context.rotate(this.lastAngle)
        }             

        context.translate(-(Tower.SIZE/2),-(Tower.SIZE/2))    
        this.sprites[this.currentFrame].render(0,0)
        context.restore()
        //super.render()

    }
}
