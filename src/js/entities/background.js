import { Entity } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";
/**************************************************
 * Klasse: Background
 * x, y (positie van de linkerbovenhoek)
 * color (de kleur van de background)
 **************************************************/
export class Background extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} color
     */
    constructor(x, y, width, height, color) {
        super(x, y, width, height, RENDER_LAYERS.background, false);
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
