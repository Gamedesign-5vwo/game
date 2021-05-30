import { Hud } from "../hud.js";
import { GameManager } from "../managers/game_manager.js";

/**************************************************
 * Klasse: Timer
 * gameManager (gameManager)
 * time (tijd in seconden)
 **************************************************/
export class Timer extends Hud {
    /**
     * @param {GameManager} gameManager
     * @param {number} time
     * @param {Function} done
     */
    constructor(gameManager, time, done) {
        super(gameManager);
        this.time = time;
        this.done = done;
        this.lastTime = Date.now();
    }

    init() {}
    update() {
        this.time -= (Date.now() - this.lastTime) / 1000;
        this.lastTime = Date.now();

        if (this.time <= 0) {
            this.gameManager.hudManager.remove(this);
            this.done();
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        let minutes = Math.floor(this.time / 60);
        let second = Math.floor(this.time - minutes * 60).toString();
        if (second.length < 2) {
            second = "0" + second;
        }
        const timeString = minutes + ":" + second;
        ctx.font = "50px Arial";
        const size = ctx.measureText(timeString);

        ctx.fillStyle = "#F2D16B";
        ctx.strokeStyle = "#a52a2a";
        ctx.miterLimit = 2;
        ctx.lineWidth = 10;
        ctx.strokeText(timeString, 1025 / 2 - size.width / 2, 47);
        ctx.fillText(timeString, 1025 / 2 - size.width / 2, 47);
    }
}
