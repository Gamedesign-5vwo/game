import { Hud } from '../hud.js';
import { GameManager } from '../managers/game_manager.js';

/**************************************************
 * Klasse: Lifes
 * gameManager (gameManager)
 * time (tijd in seconden)
 **************************************************/
export class Lifes extends Hud {
    /**
     * @param {GameManager} gameManager
     */
    constructor(gameManager) {
        super(gameManager);
        this.hart = new Image();
        this.hart.src = './images/hart.png';

        // Zo dat het niet elke keer opnieuw wordt berekend
        this.x = 1025 / 2 - 34 * 1.5;
    }

    init() {}
    update() {}

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        ctx.fillStyle = '#00bfff';
        for (let i = 0; i < this.gameManager.lifes; i++) {
            ctx.drawImage(this.hart, this.x + 35 * i, 60, 30, 30);
        }
    }
}
