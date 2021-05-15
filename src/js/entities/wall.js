import { Entity } from "../entity.js";

/**************************************************
 * Klasse: Wall
 * x, y (positie van de linkerbovenhoek)
 * width, height (de grootte van de muur per tile (25))
 * color (de kleur van de speler)
 **************************************************/
export class Wall extends Entity {
    constructor(x, y, width, height, color) {
        super(x, y, 25 * width, 25 * height);

        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
