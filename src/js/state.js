import { StateManager } from "./managers/state_manager.js";

/**************************************************
 * Klasse: State
 * stateManager (stateManager)
 **************************************************/
export class State {
    /**
     * @param {StateManager} stateManager
     */
    constructor(stateManager) {
        this.stateManager = stateManager;
    }

    /**
     * @returns {number}
     */
    getId() {
        return null;
    }

    init() {}

    update() {}

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {}
}
