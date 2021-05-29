import { Hud } from "../hud.js";

/**************************************************
 * Klasse: SplashScreen
 * gameManager (gameManager)
 * text (lijst van tekst)
 * showTime (seconden om text te laten zien)
 * background (string van locatie afbeelding)
 * done (functie die gecalled wordt als de splashscreen klaar is)
 * showImageLonger (laat de afbeelding zonder tekst langer zien)
 **************************************************/
export class SplashScreen extends Hud {
    constructor(
        gameManager,
        text,
        showTime,
        background,
        done,
        showImageLonger = 0
    ) {
        super(gameManager);
        /**
         * @type {Array<string>}
         */
        this.text = text;

        /**
         * @type {number}
         */
        this.showTime = showTime;

        /**
         * @type {HTMLImageElement}
         */
        this.background = new Image();
        this.background.src = background;

        /**
         * @type {Function}
         */
        this.done = done;

        /**
         * @type {number}
         */
        this.showImageLonger = showImageLonger;

        this.lastTime = Date.now();
        this.time = 0;
    }

    update() {
        this.time += (Date.now() - this.lastTime) / 1000;
        this.lastTime = Date.now();

        // Kijk of alle tekst is geweest en dan nog 5 seconden
        if (
            Math.floor(
                (this.time - 5 - this.showImageLonger) / this.showTime
            ) >= this.text.length
        ) {
            this.gameManager.hudManager.remove(this);
            this.done();
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth
     * @param {number} lineHeight
     */
    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const lines = [];
        const words = text.split(" ");
        let line = "";

        //Elk woord
        for (let n = 0; n < words.length; n++) {
            //Kijk of lijn past anders volgende lijn
            const testLine = line + words[n] + " ";
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + " ";
            } else {
                line = testLine;
            }
        }

        lines.push(line);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const width = ctx.measureText(line).width;
            ctx.strokeText(
                line,
                x - width / 2,
                y - (lines.length * lineHeight) / 2 + lineHeight * i
            );

            ctx.fillText(
                line,
                x - width / 2,
                y - (lines.length * lineHeight) / 2 + lineHeight * i
            );
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        const currentText = Math.floor(this.time / this.showTime);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1025, 725);

        ctx.globalAlpha =
            currentText >= this.text.length
                ? 1 -
                  (this.time -
                      this.text.length * this.showTime +
                      this.showImageLonger) /
                      this.showTime
                : 1;
        ctx.drawImage(this.background, 0, 0, 1025, 725);

        if (currentText >= this.text.length) {
            ctx.globalAlpha = 1;
            return;
        }

        const text = this.text[currentText];

        ctx.font = "50px Arial";
        ctx.strokeStyle = "#a52a2a";
        ctx.fillStyle = "#F2D16B";
        this.wrapText(ctx, text, 1025 / 2, 725 / 2, 900, 60);
    }
}
