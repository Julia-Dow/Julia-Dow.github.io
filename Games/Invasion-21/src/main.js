/**
 * Game Name
 *
 * Authors
 *
 * Brief description
 *
 * Asset sources
 */

import GameStateName from "./enums/GameStateName.js";
import Game from "../lib/Game.js";
import {
	canvas,
	context,
	fonts,
	images,
	keys,
	mouse,
	sounds,
	stateMachine,
	tiles,
	timer,
} from "./globals.js";
import PlayState from "./states/PlayState.js";
import GameOverState from "./states/GameOverState.js";
import TitleScreenState from "./states/TitleScreenState.js";
import TransitionState from "./states/TransitionState.js";
import PauseState from "./states/PauseState.js";
import VictoryState from "./states/VictoryState.js";

// Fetch the asset definitions from config.json.
const {
	images: imageDefinitions,
	fonts: fontDefinitions,
	sounds: soundDefinitions,
	// @ts-ignore
} = await fetch('./src/config.json').then((response) => response.json());

// Fetch the asset definitions from TyleMap.json.
const {
	tiles : tileMapDefinition
	// @ts-ignore
} = await fetch('./src/TyleMap.json').then((response) => response.json());

// Load all the assets from their definitions.
images.load(imageDefinitions);
fonts.load(fontDefinitions);
sounds.load(soundDefinitions);
tiles.load(tileMapDefinition);

// Add all the states to the state machine.
stateMachine.add(GameStateName.TitleScreen, new TitleScreenState());
stateMachine.add(GameStateName.GameOver, new GameOverState());
stateMachine.add(GameStateName.Play, new PlayState());
stateMachine.add(GameStateName.Transition,new TransitionState());
stateMachine.add(GameStateName.Pause,new PauseState());
stateMachine.add(GameStateName.Victory,new VictoryState());

stateMachine.change(GameStateName.TitleScreen);

// Add event listeners for player input.
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

canvas.addEventListener("mousemove", setMousePosition, false)

canvas.addEventListener("click",function(){mouse.isClick = true})

function setMousePosition(event){
	const can = canvas.getBoundingClientRect(); 
	//Multiply by half because of canvas scaling
	mouse.x = (event.x - can.left) * 0.5
	mouse.y = (event.y - can.top) * 0.5
}

const game = new Game(stateMachine, context,timer, canvas.width, canvas.height);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();
