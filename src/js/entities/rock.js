import { EntitySprite } from '../entity.js';
import { RENDER_LAYERS } from '../managers/entity_manager.js';
import { GameManager } from '../managers/game_manager.js';

/**************************************************
 * Klasse: Rock
 * x, y (positie van de linkerbovenhoek)
 * minX, maxX minimuen en maximum x waarde
 * speed (snelheid van de steen)
 * gameManager (game manager)
 **************************************************/
export class Rock extends EntitySprite {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} minX
     * @param {number} maxX
     * @param {number} speed
     * @param {GameManager} gameManager
     */
    constructor(x, y, minX, maxX, speed, gameManager) {
        super(
            x,
            y,
            25 * 2,
            25 * 1,
            './images/rock.png',
            RENDER_LAYERS.wall,
            false
        );

        this.minX = minX;
        this.maxX = maxX - this.width;

        this.dx = speed;

        this.gameManager = gameManager;
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        super.update(dt);

        // Ga andere kant op
        if (!(this.x > this.minX && this.x < this.maxX)) {
            if (this.x < this.minX) this.x = this.minX;
            if (this.x > this.maxX) this.x = this.maxX;
            this.dx = -this.dx;
        }
    }
}
