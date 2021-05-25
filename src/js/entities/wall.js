import { EntitySprite } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";

/**************************************************
 * Klasse: Wall
 * x, y (positie van de linkerbovenhoek)
 * width, height (de grootte van de muur per tile (25))
 **************************************************/
export class Wall extends EntitySprite {
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
            25 * width,
            25 * height,
            "./images/sand.png",
            RENDER_LAYERS.wall
        );
    }
}
