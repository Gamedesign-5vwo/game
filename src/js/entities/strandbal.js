import { Entity } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";
import { GameManager } from "../managers/game_manager.js";
import { Player } from "./player.js";

/**************************************************
 * Klasse: Strandbal
 * x, y (positie van de linkerbovenhoek)
 * fallingSpeed (snelheid)
 * gameManager (game manager)
 **************************************************/
export class Strandbal extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} fallingSpeed
     * @param {GameManager} gameManager
     */
    constructor(x, y, fallingSpeed, gameManager) {
        super(x, y, 25, 25, RENDER_LAYERS.furniture);
        this.gameManager = gameManager;
        this.dy = fallingSpeed;

        this.image = new Image();
        this.image.src = "./images/strandbal.png";
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        super.update(dt);

        if (!this.collides(this.gameManager.ontwijkStrandballen)) {
            this.gameManager.entityManager.remove(this);
        }
        const entities = this.gameManager.entityManager.entities.filter(
            (entity) => entity.canCollide && entity !== this
        );
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            if (this.collides(entity)) {
                if (entity instanceof Player) this.gameManager.setGameOver();

                this.gameManager.entityManager.remove(this);
                break;
            }
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
