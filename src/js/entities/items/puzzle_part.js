import { Item } from "../item.js";
import { PUZZLE_SIZE, renderPuzzlePart } from "../puzzle.js";

/**************************************************
 * Klasse: PuzzlePart
 * x, y (positie van de linkerbovenhoek)
 * type (welke puzzle stuk)
 * puzzleImg (welke afbeelding)
 **************************************************/
export class PuzzlePart extends Item {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} type
     * @param {string} puzzleImg
     */
    constructor(x, y, type, puzzleImg) {
        super(x, y, PUZZLE_SIZE.width, PUZZLE_SIZE.height);
        this.type = type;
        this.puzzleImg = puzzleImg;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        renderPuzzlePart(ctx, this);
    }
}
