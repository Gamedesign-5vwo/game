import { GameManager } from "./managers/game_manager.js";

/**************************************************
 * Klasse: Room
 * gameManager (gameManager)
 * x,y (waar de kamer komt)
 **************************************************/
export class Room {
    /**
     * @param {GameManager} gameManager
     * @param {number} x
     * @param {number} y
     */
    constructor(gameManager, x, y) {
        this.gameManager = gameManager;
        this.x = x;
        this.y = y;
        this.entities = [];
    }

    init() {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            entity.x += this.x;
            entity.y += this.y;
            this.gameManager.entityManager.add(entity);
        }
    }
}
