import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import SmallSpider from "../entities/SmallSpider.js";
import ImageName from "../enums/ImageName.js";
import { CANVAS_HEIGHT, images,keys,mouse,tiles, timer } from "../globals.js";
import TowerType from "../enums/TowerType.js";
import TowerFactory from "../services/TowerFactory.js";
import UserInterface from "./UserInterface.js";
import Tile from "./Tile.js";
import StrongSpider from "../entities/StrongSpider.js";
import EnemyFactory from "../services/EnemyFactory.js";
import EnemyType from "../enums/EnemyType.js";

export default class Level {
    static WIDTH = 256;
    static HEIGHT = 256;
    static WAVE=1;

	constructor() {
        this.lives = 21;
        this.coins = 50;

        this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Map),
			Level.WIDTH,
			Level.HEIGHT
		);
		this.Tiles = this.getTileMap();
        this.Spiders = []
        this.Towers = []
        this.userInterface = new UserInterface(this)

        this.waveStartCoins=this.coins;
        this.waveStartHealth=this.lives;
        this.waveStartTowers=[];
	}

    update(dt){

        //unselects tower if clicked off tower
        if(mouse.isClick){
            this.Towers.forEach(tower => tower.selected = false)
        }

        this.userInterface.update();

        this.Spiders.forEach(spider => {
            spider.update(dt)
        })

        this.Towers.forEach(tower => tower.update(dt))   

        this.Spiders = this.Spiders.filter((entity) => !entity.cleanUp);

        //removes mouse click VERY IMPORTANT
        mouse.isClick = false;
    }

    render(){
        this.sprites[0].render(0,0)
        this.Tiles.forEach(tile => tile.render())
        this.Spiders.forEach(spider => spider.render())
        this.Towers.forEach(tower => tower.render())
        this.userInterface.render()
    }

    getTileMap(){
        return tiles.tiles
    }

    play(){
        this.addSpiders();
        for(let i=0;i<this.Spiders.length;i++){
            this.Spiders[i].runPath(i);
        }
    }
    pause(){

    }

    // levelUp(){
    //     Level.WAVE++;
    //     this.addSpiders();
        
    // }

    addSpiders(){
        let count=1;
        let backStep=-32;
        let offset=8;
        let xPosition;
        let yPosition=Tile.SIZE+offset;

        //get num SmallSpiders
        let numSpiders=Level.WAVE*5;

        //get num StrongSpiders
        let numStrongSpiders=0;
        if(Level.WAVE>4){
            numStrongSpiders=Level.WAVE*2;
        }

        this.Spiders=[];

        //add SmallSpiders (red)
        for(let i=0;i<numSpiders;i++){
            xPosition=(backStep*count)+offset;
            this.Spiders.push(EnemyFactory.createInstance(EnemyType.SmallSpider,SmallSpider.SIZE,new Vector(xPosition,yPosition),this));
            count++;
        }

        //add StrongSpiders (blue)
        for(let i=0;i<numStrongSpiders;i++){
            xPosition=(backStep*count)+offset;
            this.Spiders.push(EnemyFactory.createInstance(EnemyType.StrongSpider,SmallSpider.SIZE,new Vector(xPosition,yPosition),this));
            count++;
        }
    }



}