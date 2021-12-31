import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import { context, keys, stateMachine,CANVAS_WIDTH } from "../globals.js";

export default class PauseState extends State {
	static SCORE=0;
	constructor() {
		super();
		this.canPlayWave=true;
		this.playing=false;
	}

	enter(parameters){
		this.level=parameters.level;
	}

	update(){
        if(keys.Enter){
            stateMachine.change(GameStateName.Play,{new:"old"});
        }
	}
	
	render(){
		this.level.render();
        context.save();
        context.font = '50px Invasion';
		context.textAlign = 'center';
		context.fillStyle = "White";
		context.fillText('PAUSED', CANVAS_WIDTH / 2, 105);
        context.font = '30px retganon';
		context.fillText('Press Enter to Continue', CANVAS_WIDTH / 2, 150);
        context.restore();
	}
}


