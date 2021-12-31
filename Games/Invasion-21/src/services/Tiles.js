import Tile from "../objects/Tile.js";

export default class Tiles {
	constructor() {
		this.tiles = [];
	}

	load(tileDefinitions) {
		tileDefinitions.forEach((tileDefinition) => {
			this.tiles.push(new Tile(
				tileDefinition.Type,
				tileDefinition.X,
				tileDefinition.Y
			))
        });
	}

}