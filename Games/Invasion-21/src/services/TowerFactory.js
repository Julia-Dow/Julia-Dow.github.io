import SingleShooter from "../entities/SingleShooter.js";
import TowerType from "../enums/TowerType.js";
import Vector from "../../lib/Vector.js";
import Tower from "../entities/Tower.js";
import Cannon from "../entities/Cannon.js";
import AOE from "../entities/AOE.js";

export default class TowerFactory{
    static createInstance(type, x, y, level) {
		switch (type) {
			case TowerType.SingleShooter:
				return new SingleShooter(new Vector(Tower.SIZE,Tower.SIZE), new Vector(x,y),level);

			case TowerType.Cannon:
				return new Cannon(new Vector(Tower.SIZE,Tower.SIZE), new Vector(x,y),level);

			case TowerType.AOE:
				return new AOE(new Vector(Tower.SIZE,Tower.SIZE), new Vector(x,y),level)
		}
	}
}