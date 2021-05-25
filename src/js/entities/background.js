import { EntitySprite } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";
/**************************************************
 * Klasse: Background
 * x, y (positie van de linkerbovenhoek)
 **************************************************/
export class Background extends EntitySprite {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    constructor(x, y, width, height) {
        super(
            x,
            y,
            width,
            height,
            "./images/planks.png",
            RENDER_LAYERS.background,
            false
        );
    }
}
