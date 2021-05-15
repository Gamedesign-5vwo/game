import { Item } from "../item.js";
import { PUZZLE_SIZE, renderPuzzlePart } from "../puzzle.js";

/**************************************************
 * Klasse: PuzzlePart
 * x, y (positie van de linkerbovenhoek)
 * type (welke puzzle stuk)
 **************************************************/
export class PuzzlePart extends Item {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} type
     */
    constructor(x, y, type) {
        super(x, y, PUZZLE_SIZE.width, PUZZLE_SIZE.height);
        this.type = type;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        renderPuzzlePart(ctx, this);
    }
}
