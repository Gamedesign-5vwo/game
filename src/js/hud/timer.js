import { Hud } from "../hud.js";

/**************************************************
 * Klasse: Timer
 * gameManager (gameManager)
 * time (tijd in seconden)
 **************************************************/
export class Timer extends Hud {
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

        ctx.fillStyle = "yellow";
        ctx.font = "50px Arial";
        const size = ctx.measureText(timeString);
        ctx.fillText(timeString, 1025 / 2 - size.width / 2, 50);
    }
}
