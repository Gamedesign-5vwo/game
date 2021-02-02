import { GameStateManager } from "./game_state_manager";

/**
 * Main of game
 */
export class App {
    constructor() {
        /** @type {GameStateManager} */
        this.gameStateManager = new GameStateManager();
    }

    /**
     * Calls render and update on animation frame
     */
    gameLoop() {
        update();
        render();
        requestAnimationFrame(this.gameLoop);
    }

    /**
     * Update
     */
    update() {
        this.gameStateManager.update();
    }

    /**
     * Render
     */
    render() {
        this.gameStateManager.render();
    }
}