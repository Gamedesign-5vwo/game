import { Entity } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";

/**************************************************
 * Klasse: Wall
 * x, y (positie van de linkerbovenhoek)
 * width, height (de grootte van de muur per tile (25))
 * color (de kleur van de muur)
 **************************************************/
export class Wall extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} color
     */
    constructor(x, y, width, height, color) {
        super(x, y, 25 * width, 25 * height, RENDER_LAYERS.wall);

        this.color = color;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
