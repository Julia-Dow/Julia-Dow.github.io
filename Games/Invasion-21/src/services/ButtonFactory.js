import TowerButton from "../objects/TowerButton.js";
import TowerType from "../enums/TowerType.js";
import SingleShooter from "../entities/SingleShooter.js";
import Vector from "../../lib/Vector.js";
import Cannon from "../entities/Cannon.js";
import AOE from "../entities/AOE.js";

export default class ButtonFactory{
    static createInstance(level,type, x, y,UIposition) {
		switch (type) {
			case TowerType.SingleShooter:
				return new TowerButton(level,type,SingleShooter.FRAME,new Vector(x,y),UIposition,SingleShooter.PRICE);
			case TowerType.Cannon:
				return new TowerButton(level,type,Cannon.FRAME,new Vector(x,y),UIposition,Cannon.PRICE);
			case TowerType.AOE:
				return new TowerButton(level,type,AOE.FRAME,new Vector(x,y),UIposition,AOE.PRICE);
		}
	}
}