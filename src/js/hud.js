import { GameManager } from "./managers/game_manager.js";

/**************************************************
 * Klasse: Hud
 * gameManager (gameManager)
 **************************************************/
export class Hud {
    /**
     * @param {GameManager} gameManager
     */
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    init() {}
    update() {}

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {}
}
