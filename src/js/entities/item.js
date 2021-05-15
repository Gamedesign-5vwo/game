import { Entity } from "../entity.js";

/**************************************************
 * Klasse: Item
 * x, y (positie van de linkerbovenhoek)
 * width, height (de grootte van het item, default naar 20)
 **************************************************/
export class Item extends Entity {
    constructor(x, y, width = 20, height = 20) {
        super(x, y, width, height, false);
    }
}
