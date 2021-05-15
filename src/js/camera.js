import { StateManager } from "./managers/state_manager.js";

function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

/**************************************************
 * Klasse: Camera
 * stateManager (statemanager)
 **************************************************/
export class Camera {
    /**
     * @param {StateManager} stateManager
     */
    constructor(stateManager) {
        this.stateManager = stateManager;

        /**
         * @type {{
         *  [state: number]: {
         *      minX: number,
         *      minY: number,
         *      maxX: number,
         *      maxY: number
         *  }
         * }}
         */
        this.sizes = {
            0: {
                minX: 0,
                minY: 0,
                maxX: 1025,
                maxY: 725,
            },
        };
    }

    //TODO: interpolate
    update() {}

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        let camX = clamp(
            this.stateManager.player.x - 1025 / 2,
            this.sizes[this.stateManager.currentState.getId()].minX,
            this.sizes[this.stateManager.currentState.getId()].maxX - 1025
        );

        let camY = clamp(
            this.stateManager.player.y - 725 / 2,
            this.sizes[this.stateManager.currentState.getId()].minY,
            this.sizes[this.stateManager.currentState.getId()].maxY - 725
        );

        ctx.translate(-camX, -camY);
    }
}
