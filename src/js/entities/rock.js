import { EntitySprite } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";
import { GameManager } from "../managers/game_manager.js";

/**************************************************
 * Klasse: Rock
 * x, y (positie van de linkerbovenhoek)
 * gameManager (game manager)
 **************************************************/
export class Rock extends EntitySprite {
    /**
     * @param {number} x
     * @param {number} y
     * @param {GameManager} gameManager
     */
    constructor(x, y, gameManager) {
        super(
            x,
            y,
            25 * 2,
            25 * 1,
            "./images/rock.png",
            RENDER_LAYERS.wall,
            false
        );

        this.gameManager = gameManager;
        this.hasPlayer = false;

        this.gameManager.inputManager.addMouseListener((entities, event) => {
            if (!entities.includes(this)) return;

            /** @type {Array<Rock>}*/ (
                this.gameManager.entityManager.entities.filter(
                    (entity) => entity instanceof Rock && entity.hasPlayer
                )
            ).forEach((rock) => {
                rock.hasPlayer = false;
            });

            this.hasPlayer = true;
        });
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        super.update(dt);

        if (!this.hasPlayer) return;

        this.gameManager.player.x = this.centerX;
        this.gameManager.player.y = this.centerY;
    }
}
