import { Entity } from "../entity.js";

/**************************************************
 * Klasse: EntityManager
 **************************************************/
export class EntityManager {
    constructor() {
        this.entities = [];
    }

    /**
     * @param {Entity} entity
     */
    add(entity) {
        this.entities.push(entity);
    }

    /**
     * @param {Entity} entity
     */
    remove(entity) {
        const index = this.entities.indexOf(entity);
        if (index === -1) return false;

        this.entities.splice(index, 1);
        return true;
    }

    update() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].render(ctx);
        }
    }
}
