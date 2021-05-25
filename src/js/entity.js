import { RENDER_LAYERS } from "./managers/entity_manager.js";

/**************************************************
 * Klasse: Entity
 * x, y (positie van de linkerbovenhoek)
 * width, height (de grootte van de entity)
 * layer (welke render layer is de entity)
 * canCollide (heeft de entity collision default naar true)
 **************************************************/
export class Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} layer
     * @param {boolean} canCollide
     */
    constructor(
        x,
        y,
        width,
        height,
        layer = RENDER_LAYERS.floor_decoration,
        canCollide = true
    ) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.width = width;
        this.height = height;
        this.layer = layer;
        this.canCollide = canCollide;
    }

    // Getters voor collision (https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/square-collision-response/response.js)
    get centerX() {
        return this.x + this.width * 0.5;
    }
    get centerY() {
        return this.y + this.height * 0.5;
    }
    get bottom() {
        return this.y + this.height;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.width;
    }
    get top() {
        return this.y;
    }

    /**
     * Check of de entity collides met een andere
     * @param {Entity} entity
     * @returns {boolean}
     */
    collides(entity) {
        if (
            this.top > entity.bottom ||
            this.right < entity.left ||
            this.bottom < entity.top ||
            this.left > entity.right
        ) {
            return false;
        }

        return true;
    }

    /**
     * Reactie op collision
     * @param {Entity} entity
     */
    collide(entity) {
        // afstand tussen twee middens + correctie voor groote
        let vector_x =
            (this.centerX - entity.centerX) / entity.width / this.width;
        let vector_y =
            (this.centerY - entity.centerY) / entity.height / this.height;

        // is y vector langer dan x vector
        // in het qwadraat om de negative getallen weg te halen
        if (vector_y * vector_y > vector_x * vector_x) {
            // is vector y naar beneden aan het wijzen?
            if (vector_y > 0) {
                this.y = entity.bottom;
            } else {
                // de y vector wijst omhoog
                this.y = entity.y - this.height;
            }
        } else {
            //x vector is langer dan y vector
            // is de x vector naar rechts aan het wijzen?
            if (vector_x > 0) {
                this.x = entity.right;
            } else {
                // de x vector is naar links aan het wijzen
                this.x = entity.x - this.width;
            }
        }
    }

    //Verplaats de entity met dx,dy
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    /**
     * Is hier zodat alle entities een render functie hebben
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {}
}

/**************************************************
 * Klasse: EntitySprite
 * x, y (positie van de linkerbovenhoek)
 * width, height (de grootte van de entity)
 * image (de path naar de image)
 * layer (welke render layer is de entity)
 * canCollide (heeft de entity collision default naar true)
 **************************************************/
export class EntitySprite extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} image
     * @param {number} layer
     * @param {boolean} canCollide
     */
    constructor(
        x,
        y,
        width,
        height,
        image,
        layer = RENDER_LAYERS.floor_decoration,
        canCollide = true
    ) {
        super(x, y, width, height, layer, canCollide);

        // Laad image en als hij geladen is maak een pattern
        const img = new Image();
        img.src = image;
        img.addEventListener("load", () => {
            const patternCanvas = document.createElement("canvas");
            const patternContext = patternCanvas.getContext("2d");
            this.pattern = patternContext.createPattern(img, "repeat");
        });
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        if (!this.pattern) return;
        ctx.fillStyle = this.pattern;

        // We kunnen niet direct een x,y in voeren omdat het dan ook de locatie op het pattern aanpast.
        ctx.translate(this.x, this.y);
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.translate(-this.x, -this.y);
    }
}
