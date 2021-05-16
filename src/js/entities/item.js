import { Entity } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";

/**************************************************
 * Klasse: Item
 * x, y (positie van de linkerbovenhoek)
 * width, height (de grootte van het item, default naar 20)
 **************************************************/
export class Item extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    constructor(x, y, width = 20, height = 20) {
        super(x, y, width, height, RENDER_LAYERS.furniture_decoration, false);
    }
}
