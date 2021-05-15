import { Entity } from "./entity.js";
/**************************************************
 * Klasse: Background
 * x, y (positie van de linkerbovenhoek)
 * color (de kleur van de background)
 **************************************************/
export class Background extends Entity {
    constructor(x, y, width, height, color) {
        super(x, y, width, height);
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
