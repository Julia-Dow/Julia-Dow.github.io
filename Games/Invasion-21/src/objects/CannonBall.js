import Vector from "../../lib/Vector.js";
import { canvas, context } from "../globals.js";
import Bullet from "./Bullet.js";
import GameObject from "./GameObject.js";

export default class CannonBall extends Bullet{
    static SIZE = 5
    static DAMAGE = 2
    constructor(dimensions,positon,targetPosition){
        super(dimensions,positon,targetPosition)
        this.radius = CannonBall.SIZE; 
        this.damage = CannonBall.DAMAGE
    }
}