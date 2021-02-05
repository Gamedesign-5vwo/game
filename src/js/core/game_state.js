/**
 * Basic state
 */
export class GameState {
    /**
     * Create a new gameState with the given id
     * @param {string} id
     */
    constructor(id) {
        this.id = id;

        /**
         * @type {import("./game_state_manager").GameStateManager}
         */
        this.gameStateManager = null;
    }

    /**
     * Returns the state id
     * @returns {string}
     */
    getId() {
        return this.id;
    }

    /**
     * Returns the html element of the state
     * @returns {HTMLElement}
     */
    getElement() {
        return document.getElementById("state_" + this.id);
    }

    /**
     * Returns the html code of the state.
     * @returns {string}
     */
    getHtml() {
        return "";
    }

    /**
     * Update game state
     */
    update() {}

    /**
     * Render game state
     */
    render() {}

    /*** Events ***/
    /**
     * Callback when game state is set active
     * @param {import("./game_state_manager").GameStateManager} gameStateManager
     */
    onInit(gameStateManager) {
        this.gameStateManager = gameStateManager;
    }

    /**
     * Callback when entering the state
     * @param {any} payload Data from previous state
     */
    onEnter(payload) {}

    /**
     * Callback when leaving the state
     */
    onLeave() {}

    /**
     * Callback before leaving the game state or when the page is unloaded
     */
    onBeforeExit() {}
}