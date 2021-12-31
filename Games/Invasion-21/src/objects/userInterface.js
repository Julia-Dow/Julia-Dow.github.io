import Vector from "../../lib/Vector.js";
import { context, images,mouse,stateMachine,tiles } from "../globals.js";
import TowerType from "../enums/TowerType.js";
import ButtonFactory from "../services/ButtonFactory.js";
import HighScoreManager from "../services/HighScoreManager.js";
import Level from "./Level.js";
import SingleShooter from "../entities/SingleShooter.js";
import Cannon from "../entities/Cannon.js";
import PlayButton from "./PlayButton.js";
import PauseButton from "./PauseButton.js";

export default class UserInterface {
    static WIDTH = 128;
    static HEIGHT = 512;
	constructor(level) {
        this.level = level;        
        this.position = new Vector(256,0)
        this.buttons = []
        this.makeButtons();
        this.highscore=HighScoreManager.loadHighScore();
	}
    
    makeButtons(){
        this.buttons.push(ButtonFactory.createInstance(this.level,TowerType.SingleShooter, 20, 150,this.position));
        this.buttons.push(ButtonFactory.createInstance(this.level,TowerType.Cannon, 55, 150,this.position));
        this.buttons.push(ButtonFactory.createInstance(this.level,TowerType.AOE, 90, 150,this.position));
        this.buttons.push(new PlayButton(this.level,new Vector(94,220),this.position));
        this.buttons.push(new PauseButton(this.level,new Vector(94,240),this.position));
    }

    update(){
        document.body.style.cursor = 'default'; 
        this.buttons.forEach(button => button.update())

    }

    render(){

        context.beginPath()
        context.save()
        context.translate(this.position.x,this.position.y)

        //Background
        this.renderBackground();

        //border
        this.renderBorders();

        //text
        this.renderText();

        //Buttons
        this.buttons.forEach(button => button.render())
        
        context.restore()

        this.buttons.forEach(button => button.renderSelection())
    }


    renderBackground(){
        context.fillStyle = "#535254"
        context.fillRect(0,0,128,512)
        context.stroke();
    }

    renderBorders(){
        context.strokeStyle = "#313131";
        context.rect(10, 5, 110, 20);
        context.stroke();

        context.rect(10, 30, 110, 20);
        context.stroke();
        
        context.rect(10, 55, 110, 60);
        context.stroke();   
        
        context.rect(10, 120, 110, 95);
        context.stroke();
        
        context.rect(10,220, 110, 30);
        context.stroke();
    }

    renderText(){
        context.font = "15px retganon"
        context.fillStyle = "BLACK" 

        context.fillText(`🏆 HIGHSCORE : ${this.highscore}`, 15,21);
        context.fillText(`🕸️ WAVE : ${Level.WAVE}`, 15,45);

        context.fillText(`Player Stats:`, 30 ,70)  
        context.fillText(`❤️ HEALTH : ${this.level.lives}`, 15 ,90)        
        context.fillText(`​💵 CASH : ${this.level.coins}`, 15,105)  

        context.fillText(`BUY TOWERS:`, 30 ,140)  

        context.font = "15px retganon"
        context.fillText(`START WAVE:`, 25 ,235)
        context.fillText(`PAUSE WAVE:`,25,249)
    }


}