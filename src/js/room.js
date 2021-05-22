import { GameManager } from "./managers/game_manager.js";

/**************************************************
 * Klasse: Room
 * gameManager (gameManager)
 **************************************************/
export class Room {
    /**
     * @param {GameManager} gameManager
     */
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.entities = [];
    }

    init() {
        for (let i = 0; i < this.entities.length; i++) {
            this.gameManager.entityManager.add(this.entities[i]);
        }
    }
}
