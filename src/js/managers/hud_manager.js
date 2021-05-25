import { Hud } from "../hud.js";

/**************************************************
 * Klasse: HudManager
 * gameManager (game manager)
 **************************************************/
export class HudManager {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.huds = [];
    }

    /**
     * @param {Hud} huds
     */
    add(huds) {
        this.huds.push(huds);
    }

    /**
     * @param {Hud} hud
     */
    remove(hud) {
        const index = this.huds.indexOf(hud);
        if (index === -1) return false;

        this.huds.splice(index, 1);
        return true;
    }

    update() {
        for (let i = 0; i < this.huds.length; i++) {
            this.huds[i].update();
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        for (let i = 0; i < this.huds.length; i++) {
            this.huds[i].render(ctx);
        }
    }
}
