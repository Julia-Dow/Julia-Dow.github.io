import State from "../../lib/State.js";
import Level from "../objects/Level.js";
import GameStateName from "../enums/GameStateName.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	images,
	keys,
	timer,
	stateMachine,
	canvas,
} from "../globals.js";
import HighScoreManager from "../services/HighScoreManager.js";
import PersistentStateManager from "../services/PersistentStateManager.js";
import SingleShooter from "../entities/SingleShooter.js";
import TowerType from "../enums/TowerType.js";
import Cannon from "../entities/Cannon.js";
import TowerFactory from "../services/TowerFactory.js";

export default class PlayState extends State {
	static SCORE=0;
	constructor() {
		super();
		this.level = new Level()
		this.canPlayWave=true;
		this.playing=false;
	}

	enter(parameters){
		if(parameters.new=="new" || parameters=="new"){
			this.level = new Level()
			this.canPlayWave=true;
			this.playing=false;
			Level.WAVE=1;
			this.level.lives=21;
			
		}
		else if(parameters.new=="old")
			return;
		else{
			Level.WAVE=parameters.wave;
			this.level.coins=parameters.coins;
			this.level.lives=parameters.lives;
			this.level.Towers=this.setTowers(parameters.towers);
		}
	}

	update(dt){
		this.level.update(dt);
		if(this.playing){
			if(this.level.Spiders.length==0 || this.level.Spiders.every(spider=>spider.position.y>CANVAS_HEIGHT && this.playing)){
				this.canPlayWave=true;
				if(this.level.lives>0){
					Level.WAVE++;
					this.playing=false;
					this.level.waveStartCoins=this.level.coins;
        			this.level.waveStartHealth=this.level.lives;
					this.level.waveStartTowers=this.getTowers();
					PersistentStateManager.addData(this.level.waveStartHealth,this.level.waveStartCoins,Level.WAVE,this.level.waveStartTowers);

				}
			}

			for(let i=0;i<this.level.Spiders.length;i++){
				if(this.level.Spiders[i].position.y>256){
					this.level.Spiders.splice(i,1);
					this.level.lives--;
					this.checkGameOver();
					this.checkVictory();
				}
			}
		}
		this.checkVictory();

	}
	
	render(){
		this.level.render()
	}

	getTowers(){
		let arr = []
		this.level.Towers.forEach(tower => {
			let type;
			if(tower instanceof SingleShooter)
				type=TowerType.SingleShooter;
			else if(tower instanceof Cannon)
				type=TowerType.Cannon;
			else
				type=TowerType.AOE;

			arr.push({
				type:type,
				x:tower.position.x,
				y:tower.position.y
				})
		});

		return arr
	}

	setTowers(towers){

		let arr=[];
		towers.forEach(tower => {
			arr.push(TowerFactory.createInstance(tower.type,tower.x,tower.y,this.level));
		});
		return arr;
	}

	checkGameOver(){
		if(this.level.lives<=0){
			//check if this is a highscore and update highscore
			this.calculateScore();
			HighScoreManager.addHighScore(PlayState.SCORE);
			
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.GameOver]
			});
		}
	}

	checkVictory(){
		if(Level.WAVE==10){
			this.calculateScore();
			HighScoreManager.addHighScore(PlayState.SCORE);
			
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.Victory]
			});
		}
	}

	calculateScore(){
		PlayState.SCORE=Level.WAVE+this.level.coins+this.level.lives;
	}
}


