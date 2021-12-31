import Sprite from "../../lib/Sprite.js";
import Level from "./Level.js";
import SmallSpider from "../entities/SmallSpider.js";
import Vector from "../../lib/Vector.js";
import ImageName from "../enums/ImageName.js";
import TowerFactory from "../services/TowerFactory.js"
import { context, images,mouse,tiles } from "../globals.js";
import { isAABBCollision } from "../../lib/CollisionHelpers.js";
import SelectableObject from "./SelectableObject.js";
import TowerType from "../enums/TowerType.js";
import SingleShooter from "../entities/SingleShooter.js";
import Cannon from "../entities/Cannon.js";
import Tile from "./Tile.js";
import Tower from "../entities/Tower.js";
import Button from "./Button.js";

export default class TowerButton extends SelectableObject {
    static SIZE = 16;
    static BORDER = 2;

	constructor(level,Type,frame,position,UIposition,price) {
        //will set properties later on
        super()
            
        this.type = Type; 
        this.level = level;
        this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Towers),
			TowerButton.SIZE,
			TowerButton.SIZE
		);	

        this.currentFrame = frame

        this.renderPosition = position
        this.position = new Vector(position.x + UIposition.x, position.y + UIposition.y)
        
        //Setting selectable properties
        this.Sposition = new Vector( this.position.x - TowerButton.BORDER,this.position.y - TowerButton.BORDER)
        this.Sdimentions = new Vector ( TowerButton.SIZE +(TowerButton.BORDER*2) , TowerButton.SIZE + (TowerButton.BORDER*2) )

        this.price = price

        this.tower = TowerFactory.createInstance(this.type,mouse.x-(TowerButton.SIZE/2),mouse.y-(TowerButton.SIZE/2),this.level)

	}

    update(){
        super.update()

        if(this.selected && this.placable()){
            document.body.style.cursor = 'pointer'; 
        }

        let canBuy=this.level.coins>=this.price;
        if(this.mouseOver() && mouse.isClick && !this.selected && canBuy){
  
            mouse.isClick = false;

            this.selected = true
             
        }
        else if( mouse.isClick && this.selected){
            mouse.isClick = false;
            this.placeTower()
        }
    }

    render(){
        context.save()
        context.translate(this.renderPosition.x,this.renderPosition.y)
        if(this.level.coins>=this.price){
            context.fillStyle = "#99989c" 
        }
        else{
            context.fillStyle = "#910000"   
        }
        context.fillRect(-TowerButton.BORDER,-TowerButton.BORDER,TowerButton.SIZE+(TowerButton.BORDER*2),TowerButton.SIZE+(TowerButton.BORDER*2))
        context.stroke();

        //render price
        context.fillText(`${this.tower.price}`, 0 ,TowerButton.BORDER + TowerButton.SIZE* 2 )
        
        this.sprites[this.currentFrame].render(0,0,{x:1,y:1})  
        context.restore()
    }

    renderSelection(){
        if(this.selected){
            context.save()            
            context.translate(mouse.x-(TowerButton.SIZE/2),mouse.y-(TowerButton.SIZE/2))

            //Drawing radius
            context.beginPath();
            context.strokeStyle = "Red"
            if(this.placable()){
                context.strokeStyle = "White"
            } 
            context.arc(Tower.SIZE/2, Tower.SIZE/2, this.tower.radius, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            
            this.sprites[this.currentFrame].render(0,0,{x:1,y:1}) 
            


            context.restore()
        }
    }

    placeTower(){
        if(this.placable()){

            this.level.Towers.push(TowerFactory.createInstance(this.type,mouse.x-(TowerButton.SIZE/2),mouse.y-(TowerButton.SIZE/2),this.level))
            this.selected = false;
            this.level.coins-=this.price;
        }

    }

    placable(){
        let border = 16
        let notOnTile = true;
        if(!isAABBCollision(
            mouse.x-(TowerButton.SIZE/2),
            mouse.y-(TowerButton.SIZE/2),
            TowerButton.SIZE,
            TowerButton.SIZE,
            border,
            border,
            Level.WIDTH-(border*2),
            Level.HEIGHT-(border*2)                     
            ))
            { return false}
        
        this.level.Tiles.forEach(tile => {
            if(isAABBCollision(
            mouse.x-(TowerButton.SIZE/2),
            mouse.y-(TowerButton.SIZE/2),
            TowerButton.SIZE,
            TowerButton.SIZE,
            tile.renderPosition.x,
            tile.renderPosition.y,
            Tile.SIZE,
            Tile.SIZE                     
            ))
            {   notOnTile = false;
                return false}
        });

        return notOnTile

        return true

    }


}