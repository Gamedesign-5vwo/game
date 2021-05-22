import { Entity } from "../entity.js";

export const RENDER_LAYERS = {
    background: 0,
    floor: 1,
    floor_decoration: 2,
    wall: 3,
    furniture: 4,
    furniture_decoration: 5,
    player: 6,
    inhand: 7,
};

/**************************************************
 * Klasse: EntityManager
 **************************************************/
export class EntityManager {
    constructor() {
        this.entities = [];
    }

    /**
     * @param {Entity} entity
     * @param {number} layer
     */
    add(entity, layer = -1) {
        if (layer !== -1) entity.layer = layer;
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
        const layers = this.entities.reduce((prev, curr) => {
            if (!prev[curr.layer]) {
                prev[curr.layer] = [];
            }

            prev[curr.layer].push(curr);
            return prev;
        }, {});

        for (const layerName in RENDER_LAYERS) {
            if (!layers[RENDER_LAYERS[layerName]]) continue;
            for (let i = 0; i < layers[RENDER_LAYERS[layerName]].length; i++) {
                layers[RENDER_LAYERS[layerName]][i].render(ctx);
            }
        }
    }
}
