import GameEntity from "./GameEntity.js";
import { timer,context } from "../globals.js";
import Vector from "../../lib/Vector.js";
import Paths from "../enums/Paths.js";

const DEFAULT_HEALTH=1;
const INITIAL_SPEED=5;
const DEFAULT_VALUE=2
export default class Enemy extends GameEntity{
    static SIZE = 16;
    static POSITION_STEP=32;
    constructor(dimensions,position,level){
        super(dimensions,position);
        this.health=DEFAULT_HEALTH;
        this.speed=INITIAL_SPEED;
        this.value=DEFAULT_VALUE; 
        this.centerPosition = new Vector(position.x+Enemy.SIZE/2,position.x+Enemy.SIZE/2)
        this.level = level
    }

    update(){
        if(this.health <= 0){
            this.cleanUp = true
            this.level.coins += this.value;
        }
    }

    getCenterPosition(){
        this.centerPosition.set(this.position.x+Enemy.SIZE/2,this.position.y+Enemy.SIZE/2)
        return this.centerPosition
    }

    clearDirection(){
        this.travelRight=false;
        this.travelDown=false;
        this.travelUp=false;
        this.travelLeft=false;
    }

    render(){
        /*
        context.beginPath();
        context.strokeStyle = "White"
        context.arc(this.position.x + Enemy.SIZE/2 , this.position.y + Enemy.SIZE/2 , Enemy.SIZE/2, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();     */   
        
        context.save()        
        context.translate(this.position.x,this.position.y)

        if(this.travelRight){
            this.sprites[this.currentFrame].render(0,0)                 
        }
        else if(this.travelLeft){            
            context.rotate( 180 * Math.PI / 180)      
            this.sprites[this.currentFrame].render(-Enemy.SIZE,-Enemy.SIZE)
        }
        else if(this.travelDown){
            context.rotate( 90 * Math.PI / 180)
            this.sprites[this.currentFrame].render(0,-Enemy.SIZE)
        }
        else{
            context.rotate( 270 * Math.PI / 180)
            this.sprites[this.currentFrame].render(-Enemy.SIZE,0)
        }

        context.restore()
    }

    runPath(index){
        this.moveRight(Paths.Trail1+index);
    }

    moveRight(iteration){
        this.clearDirection();
        this.travelRight=true;
        if(iteration>0){
            iteration--;
            timer.tween(this.position,["x"],[this.position.x+Enemy.POSITION_STEP],this.speed,()=>{this.moveRight(iteration);});
        }
        else{
            this.moveDown(Paths.Trail2);
        }
    }
    moveLeft(iteration){
        this.clearDirection();
        this.travelLeft=true;
        if(iteration>0){
            iteration--;
            timer.tween(this.position,["x"],[this.position.x-Enemy.POSITION_STEP],this.speed,()=>{this.moveLeft(iteration);});
        }
        else{
            this.moveUp(Paths.Trail4);
        }
    }
    moveUp(iteration){
        this.clearDirection();
        this.travelUp=true;
        if(iteration>0){
            iteration--;
            timer.tween(this.position,["y"],[this.position.y-Enemy.POSITION_STEP],this.speed,()=>{this.moveUp(iteration);});
        }
        else{
            this.moveLeft2(Paths.Trail5);
        }
    }
    moveDown(iteration){
        this.clearDirection();
        this.travelDown=true;
        if(iteration>0){
            iteration--;
            timer.tween(this.position,["y"],[this.position.y+Enemy.POSITION_STEP],this.speed,()=>{this.moveDown(iteration);});
        }
        else{
            this.moveLeft(Paths.Trail3);
        }
    }
    moveLeft2(iteration){
        this.clearDirection();
        this.travelLeft=true;
        if(iteration>0){
            iteration--;
            timer.tween(this.position,["x"],[this.position.x-Enemy.POSITION_STEP],this.speed,()=>{this.moveLeft2(iteration);});
        }
        else{
            this.moveDown2(Paths.Trail6);
        }
    }
    moveDown2(iteration){
        this.clearDirection();
        this.travelDown=true;
        if(iteration>0){
            iteration--;
            timer.tween(this.position,["y"],[this.position.y+Enemy.POSITION_STEP],this.speed,()=>{this.moveDown2(iteration);});
        }
        else{
            this.moveRight(Paths.Trail7);
        }
    }

}