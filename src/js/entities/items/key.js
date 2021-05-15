import { Item } from "../item.js";
import { PUZZLE_SIZE, renderPuzzlePart } from "../puzzle.js";

/**************************************************
 * Klasse: Key
 * x, y (positie van de linkerbovenhoek)
 * id (welke deur)
 **************************************************/
export class Key extends Item {
    /**
     * @param {number} x
     * @param {number} y
     * @param {string} id
     */
    constructor(x, y, id) {
        super(x, y);
        this.id = id;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        const keyImg = new Image();
        keyImg.src = "./images/key.png";
        ctx.drawImage(keyImg, this.x, this.y, this.width, this.height);
    }
}
