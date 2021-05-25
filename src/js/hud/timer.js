import { Hud } from "../hud.js";

/**************************************************
 * Klasse: Timer
 * gameManager (gameManager)
 * time (tijd in seconden)
 **************************************************/
export class Timer extends Hud {
    constructor(gameManager, time) {
        super(gameManager);
        this.time = time;
        this.lastTime = Date.now();
    }

    init() {}
    update() {
        this.time -= (Date.now() - this.lastTime) / 1000;
        this.lastTime = Date.now();
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

        ctx.fillStyle = "yellow";
        ctx.font = "50px Arial";
        const size = ctx.measureText(timeString);
        ctx.fillText(timeString, 1025 / 2 - size.width / 2, 50);
    }
}
