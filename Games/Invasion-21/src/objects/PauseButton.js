import Vector from "../../lib/Vector.js";
import GameStateName from "../enums/GameStateName.js";
import { context, images,mouse,stateMachine,tiles } from "../globals.js";
import SelectableObject from "./SelectableObject.js";

export default class PauseButton extends SelectableObject {
    static SIZE = 12;
    static BORDER = 2;

	constructor(level,position,UIposition) {
        //will set properties later on
        super()
            
        this.Level = level;

        this.renderPosition = position;
        this.position = new Vector(position.x + UIposition.x, position.y + UIposition.y)
        
        //Setting selectable properties
        this.Sposition = new Vector( this.position.x,this.position.y)
        this.Sdimentions = new Vector ( PauseButton.SIZE ,PauseButton.SIZE)

	}

    update(){
        super.update()

        if(this.mouseOver() && mouse.isClick && stateMachine.currentState.playing){
            mouse.isClick = false;
            stateMachine.change(GameStateName.Pause,{level:this.Level});

        }
    }

    render(){
        if(!stateMachine.currentState.canPlayWave){
            context.font = "12px retganon"
            context.fillText(`⏸`,this.renderPosition.x+2,this.renderPosition.y+6)
        }
    }
    renderSelection(){
        
    }
}