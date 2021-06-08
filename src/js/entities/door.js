import { Entity } from '../entity.js';
import { RENDER_LAYERS } from '../managers/entity_manager.js';
import { GameManager } from '../managers/game_manager.js';
import { Key } from './items/key.js';
import { STOP_PLAYER_ITEM } from './player.js';

/**************************************************
 * Klasse: Door
 * x, y (positie van de linkerbovenhoek)
 * width, height (de grootte van de muur per tile (25))
 * id (welke deur)
 * gameManager (de gameManager)
 **************************************************/
export class Door extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} id
     * @param {Function} onOpened
     * @param {GameManager} gameManager
     */
    constructor(x, y, width, height, id, onOpened, gameManager) {
        super(x, y, 25 * width, 25 * height, RENDER_LAYERS.wall);

        //Horizontal
        if (width > height) {
            this.imgClosed = new Image();
            this.imgClosed.src = './images/doors/h_closed.png';
            this.imgOpened = new Image();
            this.imgOpened.src = './images/doors/h_open_t.png';
        } else {
            // Vertical
            this.imgClosed = new Image();
            this.imgClosed.src = './images/doors/v_closed.png';
            this.imgOpened = new Image();
            this.imgOpened.src = './images/doors/v_open_l.png';
        }

        this.id = id;
        this.onOpened = onOpened;
        this.gameManager = gameManager;

        // Als item wordt losgelaten kijk of het de juist sleutel is
        this.preItemCheckId = this.gameManager.player.addPreItemCheck(() => {
            if (
                !this.collides(this.gameManager.player) ||
                !this.gameManager.player.inhand ||
                !(this.gameManager.player.inhand.entity instanceof Key) ||
                this.gameManager.player.inhand.entity.id !== this.id
            ) {
                return;
            }

            // Verwijder deur en sleutel
            this.gameManager.entityManager.remove(
                this.gameManager.player.inhand.entity
            );
            this.canCollide = false;
            this.gameManager.player.inhand = null;

            //Voer onopend uit
            this.onOpened();

            return STOP_PLAYER_ITEM;
        });
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        ctx.drawImage(
            this.canCollide ? this.imgClosed : this.imgOpened,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
