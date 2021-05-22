import { GameManager } from "./managers/game_manager.js";

function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

// https://www.febucci.com/2018/08/easing-functions/
function lerp(start, end, time) {
    return start + (end - start) * time;
}

/**************************************************
 * Klasse: Camera
 * gameManager (statemanager)
 **************************************************/
export class Camera {
    /**
     * @param {GameManager} gameManager
     */
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.x = 0;
        this.y = 0;

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
            1: {
                minX: 0,
                minY: 0,
                maxX: 2025,
                maxY: 725,
            },
        };
    }

    update() {
        let camX = clamp(
            this.gameManager.player.x - 1025 / 2,
            this.sizes[this.gameManager.currentState].minX,
            this.sizes[this.gameManager.currentState].maxX - 1025
        );

        let camY = clamp(
            this.gameManager.player.y - 725 / 2,
            this.sizes[this.gameManager.currentState].minY,
            this.sizes[this.gameManager.currentState].maxY - 725
        );

        this.x = lerp(this.x, camX, 0.03);
        this.y = lerp(this.y, camY, 0.03);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx, reset = false) {
        if (reset) ctx.translate(this.x, this.y);
        else ctx.translate(-this.x, -this.y);
    }
}
