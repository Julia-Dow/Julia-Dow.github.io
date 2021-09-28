import {context,CANVAS_WIDTH} from "./globals.js"

/**
 * Represents a ball which will bounce back and forth between the sides
 * of the world space, the player's paddle, and the bricks laid out above
 * the paddle. The ball can have a colour, which is chosen at random, just
 * for visual variety.
 */
export default class Ball {
	constructor(baseScore) {
        this.x = CANVAS_WIDTH - 30;
        this.y = 40;
        this.width = 10;
        this.height = 110;
        this.score = baseScore;
        this.milestone = 100;
	}

    update(score){
        if(score >= this.milestone){
            this.milestone  *= 2
        }

        this.score = score
    }

	render() {
        //draw border
		context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = "white";
        context.rect(this.x,this.y , this.width, this.height);
        context.fillStyle = "DarkBlue"
        context.fill();
        context.stroke();

        //draw progress
        context.beginPath();
        context.strokeStyle = "white";
        context.rect(this.x, this.y + this.height-this.calculateBarHeight(), this.width, this.calculateBarHeight());
        context.fillStyle = "white"
        context.fill();
        context.stroke();
	}

    calculateBarHeight(){
        return (this.score*this.height)/this.milestone
    }
}