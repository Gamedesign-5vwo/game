import { EntitySprite } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";
/**************************************************
 * Klasse: Background
 * x, y (positie van de linkerbovenhoek)
 * width, height (groote achtergrond)
 * color (kleur)
 **************************************************/
export class Background extends EntitySprite {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} color
     */
    constructor(x, y, width, height, color = null) {
        super(
            x,
            y,
            width,
            height,
            "./images/planks.png",
            RENDER_LAYERS.background,
            false
        );
        this.color = color;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        if (!this.color) {
            super.render(ctx);
            return;
        }

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
