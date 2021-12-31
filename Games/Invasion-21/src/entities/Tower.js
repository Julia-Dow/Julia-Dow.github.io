import GameEntity from "./GameEntity.js";
import Sprite from "../../lib/Sprite.js";
import { context, images, mouse } from "../globals.js";
import ImageName from "../enums/ImageName.js";
import Vector from "../../lib/Vector.js";
import { isAABBCollision, isCircleCollision } from "../../lib/CollisionHelpers.js";
import Enemy from "./Enemy.js";
import { timer } from "../globals.js";

export default class Tower extends GameEntity {
    static DEFAULT_RADIUS = 40;
    static SIZE = 16;
    static SCALE = 1
    static DEFAULT_SPEED = 0.5
    constructor(dimensions, position, level) {
        super(dimensions,position);
        this.price=0;
        this.speed=Tower.DEFAULT_SPEED;
        this.enemiesInRadius = [];
        this.isSelected=false;
        this.radius = Tower.DEFAULT_RADIUS
        this.level = level

        this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Towers),
			Tower.SIZE,
			Tower.SIZE
		);
        this.currentFrame = 0;
        this.centerPosition = this.getCenterPosition()

        this.selectable = true;
        this.Sposition = position;
        this.Sdimentions = dimensions;
        this.CanAction = true;
    }

    getCenterPosition(){
        return new Vector(this.position.x + Tower.SIZE/2,this.position.y + Tower.SIZE/2  )
    }

    update(){
        super.update()

        this.getEnemiesInRadius()

        if(this.enemiesInRadius.length > 0 && this.CanAction){
            this.CanAction = false;
            timer.addTask(()=>{},0,this.speed,()=>{
                
                // @ts-ignore
                this.action()
                this.CanAction = true;
		    })
        }

        if(this.mouseOver() && mouse.isClick && !this.selected){
  
            mouse.isClick = false;

            this.selected = true
             
        }

    }

    bulletEnemyCollision(bullet,enemy){
        if(isCircleCollision(bullet.position.x,bullet.position.y,bullet.radius,enemy.getCenterPosition().x,enemy.getCenterPosition().y, Enemy.SIZE)){
            return true
        }
        return false
    }

    getEnemiesInRadius(){
        this.enemiesInRadius = []
        this.level.Spiders.forEach(enemy => {
            if(this.enemyRadiusCollision(enemy)){
                this.enemiesInRadius.push(enemy)
            }
        });
    }

    enemyRadiusCollision(enemy){
        var dx = (enemy.position.x + Enemy.SIZE/2) - (this.centerPosition.x );
        var dy = (enemy.position.y + Enemy.SIZE/2) - (this.centerPosition.y);
        var distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < Enemy.SIZE/2 + this.radius) {
            // collision detected!
            return true
        } else {
            // no collision
            return false
        }
    }

    render(){        
        
        context.save()
        context.translate(this.position.x,this.position.y)
        if(this.selected){       
            this.drawRadius()
        }

        this.sprites[this.currentFrame].render(0,0)
        context.restore()
    }

    drawRadius(){
        context.beginPath();
        context.strokeStyle = "White"
        context.arc(Tower.SIZE/2, Tower.SIZE/2, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }

    calculateAngle(x2,y2){
        let ourPosition = this.getCenterPosition()
        let x = x2 - ourPosition.x
        let y = y2 - ourPosition.y

        let rightAngle;
        rightAngle =  (Math.atan2(x,y))*-1

        return rightAngle



    }

   

}