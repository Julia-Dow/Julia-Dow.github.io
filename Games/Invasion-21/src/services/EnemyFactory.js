import SmallSpider from "../entities/SmallSpider.js";
import StrongSpider from "../entities/StrongSpider.js";
import EnemyType from "../enums/EnemyType.js";

export default class EnemyFactory{
    static createInstance(type, dimension, position,level) {
		switch (type) {
			case EnemyType.SmallSpider:
				return new SmallSpider(dimension, position,level);
			case EnemyType.StrongSpider:
				return new StrongSpider(dimension,position,level);
		}
	}
}