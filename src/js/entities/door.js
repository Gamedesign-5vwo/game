import { Entity } from "../entity.js";
import { EntityManager } from "../managers/entity_manager.js";
import { StateManager } from "../managers/state_manager.js";
import { Key } from "./items/key.js";
import { Player, STOP_PLAYER_ITEM } from "./player.js";

/**************************************************
 * Klasse: Door
 * x, y (positie van de linkerbovenhoek)
 * width, height (de grootte van de muur per tile (25))
 * color (de kleur van de deur)
 * id (welke deur)
 * stateManager (de stateManager)
 **************************************************/
export class Door extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} color
     * @param {string} id
     * @param {Function} onOpened
     * @param {StateManager} stateManager
     */
    constructor(x, y, width, height, color, id, onOpened, stateManager) {
        super(x, y, 25 * width, 25 * height);

        this.color = color;
        this.id = id;
        this.onOpened = onOpened;
        this.stateManager = stateManager;

        // Als item wordt losgelaten kijk of het de juist sleutel is
        this.preItemCheckId = this.stateManager.player.addPreItemCheck(() => {
            if (
                !this.collides(this.stateManager.player) ||
                !this.stateManager.player.inhand ||
                !(this.stateManager.player.inhand instanceof Key) ||
                this.stateManager.player.inhand.id !== this.id
            ) {
                return;
            }

            // Verwijder deur en sleutel
            this.stateManager.entityManager.remove(
                this.stateManager.player.inhand
            );
            this.stateManager.entityManager.remove(this);
            this.stateManager.player.inhand = null;

            //Voer onopend uit
            this.onOpened();

            return STOP_PLAYER_ITEM;
        });
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
