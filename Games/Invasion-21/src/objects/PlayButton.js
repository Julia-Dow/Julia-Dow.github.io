import Vector from "../../lib/Vector.js";
import { context, images,mouse,stateMachine,tiles } from "../globals.js";
import SelectableObject from "./SelectableObject.js";

export default class PlayButton extends SelectableObject {
    static SIZE = 15;
    static BORDER = 2;

	constructor(level,position,UIposition) {
        //will set properties later on
        super()
            
        this.Level = level;

        this.renderPosition = position;
        this.position = new Vector(position.x + UIposition.x, position.y + UIposition.y)
        
        //Setting selectable properties
        this.Sposition = new Vector( this.position.x,this.position.y)
        this.Sdimentions = new Vector ( PlayButton.SIZE ,PlayButton.SIZE)

	}

    update(){
        super.update()

        if(this.mouseOver() && mouse.isClick && stateMachine.currentState.paused){
            mouse.isClick = false;
            stateMachine.currentState.paused=false;
            stateMachine.currentState.canPlayWave=false;
            stateMachine.currentState.playing=true;
        }
        else if(this.mouseOver() && mouse.isClick && stateMachine.currentState.canPlayWave && this.Level.lives>0){
            mouse.isClick = false;
            stateMachine.currentState.canPlayWave=false;
            this.Level.play();
            stateMachine.currentState.playing=true;
            stateMachine.currentState.paused=false;
        }
    }

    render(){
        if(stateMachine.currentState.canPlayWave){
            context.font = "12px retganon"
            context.fillText(`▶️`,this.renderPosition.x+2,this.renderPosition.y+13)
        }
        else{
            context.font = "12px retganon"
            context.fillText(`⏳`,this.renderPosition.x+4,this.renderPosition.y+12)
        }
    }
    renderSelection(){
        
    }
}