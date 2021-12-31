import Vector from "../../lib/Vector.js";
import { canvas, context } from "../globals.js";
import GameObject from "./GameObject.js";

export default class Bullet extends GameObject{
    static SIZE = 2;
    static DEFAULT_DAMAGE = 1;
    constructor(dimensions,positon,targetPosition){
        super(dimensions,positon)
        //put this for the bullet to follow target (Like a heat seeking missile)
        //this.targetPosition = targetPosition;
        //put this for the bullet to follow initial position
        this.targetPosition = new Vector(targetPosition.x,targetPosition.y)     
        this.radius = Bullet.SIZE;   
        this.speed = 150
        this.xspeed=0;
        this.yspeed=this.speed;
        this.calculateSpeeds()
        this.damage = Bullet.DEFAULT_DAMAGE
        
    }

    calculateSpeeds(){
        if(this.targetPosition == null){
            return
        }

        let deltax = Math.abs(this.position.x - this.targetPosition.x);
        let deltay = Math.abs(this.position.y - this.targetPosition.y);
        let total = deltax + deltay;
        this.xspeed = (deltax * this.speed) / total
        this.yspeed = (deltay * this.speed) / total

        if(this.position.x > this.targetPosition.x){
            this.xspeed *= -1
        }

        if(this.position.y > this.targetPosition.y){
            this.yspeed *= -1
        }

    }

    update(dt){
        //heat seeking
        //this.calculateSpeeds()
        this.position.x += (this.xspeed * dt);
        this.position.y += (this.yspeed * dt);

        if(this.position.x < 0 || this.position.x > canvas.width){
            this.cleanUp = true
        }

        if(this.position.y < 0 || this.position.y > canvas.height){
            this.cleanUp = true
        }
    }

    render(){
        context.beginPath();
        context.fillStyle = "Black"
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
}