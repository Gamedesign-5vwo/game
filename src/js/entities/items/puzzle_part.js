import { Item } from "../item.js";

const PUZZLE_POSITION = {
    0: "0,0",
    1: "0,1",
    2: "0,2",
    3: "1,0",
    4: "1,1",
    5: "1,2",
    6: "2,0",
    7: "2,1",
    8: "2,2",
};

const PUZZLE_IMAGES = {
    0: "red",
    1: "orange",
    2: "yellow",
    3: "green",
    4: "cyan",
    5: "blue",
    6: "indigo",
    7: "purple",
    8: "magenta",
};

/**************************************************
 * Klasse: PuzzlePart
 * x, y (positie van de linkerbovenhoek)
 * type (welke puzzle stuk)
 **************************************************/
export class PuzzlePart extends Item {
    constructor(x, y, type) {
        super(x, y);
        this.type = type;
    }

    render(ctx) {
        ctx.fillStyle = PUZZLE_IMAGES[this.type];
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
