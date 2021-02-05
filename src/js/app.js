import { GameStateManager } from "./core/game_state_manager";
import { MainMenuState } from "./states/main_menu";

/**
 * Main of game
 */
export class App {
    constructor() {
        /** @type {GameStateManager} */
        this.gameStateManager = new GameStateManager();

        //Register states
        this.gameStateManager.registerGameState(MainMenuState);

        //Set start state
        this.gameStateManager.moveToState("MainMenu");
    }

    /**
     * Calls render and update on animation frame
     */
    gameLoop() {
        this.update();
        this.render();
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