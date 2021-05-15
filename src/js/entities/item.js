import { Entity } from "../entity.js";

/**************************************************
 * Klasse: Item
 * x, y (positie van de linkerbovenhoek)
 **************************************************/
export class Item extends Entity {
    constructor(x, y) {
        super(x, y, 20, 20, false);
    }
}
