import { Entity } from "../entity.js";
import { EntityManager } from "../managers/entity_manager.js";
import { InputManager } from "../managers/input_manager.js";
import { StateManager } from "../managers/state_manager.js";
import { Item } from "./item.js";

export const STOP_PLAYER_ITEM = "stop_player_item";

/**************************************************
 * Klasse: Player
 * x, y (positie van de linkerbovenhoek)
 * color (de kleur van de speler)
 * stateManager (de state manager)
 **************************************************/
export class Player extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {string} color
     * @param {StateManager} stateManager
     */
    constructor(x, y, color, stateManager) {
        super(x, y, 25, 25 * 2);

        this.color = color;
        this.stateManager = stateManager;

        this.listeners = { pre_item_check: [], post_item_check: [] };
        this.listenerId = 0;

        this.inhand = null;
        // Als E wordt losgelaten verwissel item
        this.stateManager.inputManager.addListener(69, () => {
            for (let i = 0; i < this.listeners.pre_item_check.length; i++) {
                if (
                    this.listeners.pre_item_check[i].listener() ===
                    STOP_PLAYER_ITEM
                ) {
                    return;
                }
            }

            if (this.inhand) this.inhand = null;
            else {
                const entities =
                    this.stateManager.entityManager.entities.filter(
                        (entity) => entity instanceof Item
                    );
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    if (this.collides(entity)) {
                        this.inhand = entity;
                        break;
                    }
                }
            }

            for (let i = 0; i < this.listeners.post_item_check.length; i++) {
                this.listeners.post_item_check[i].listener();
            }
        });

        this.speed = 2;
    }

    /**
     * Voer functie uit voordat item wordt verwisseld
     * @param {Function} listener
     * @returns {number}
     */
    addPreItemCheck(listener) {
        const id = this.listenerId++;
        this.listeners.pre_item_check.push({
            id: id,
            listener: listener,
        });
        return id;
    }

    /**
     * Voer functie uit na item verwisseld is
     * @param {Function} listener
     * @returns {number}
     */
    addPostItemCheck(listener) {
        const id = this.listenerId++;
        this.listeners.post_item_check.push({
            id: id,
            listener: listener,
        });
        return id;
    }

    /**
     * Verwijder listener
     * @param {number} id
     * @returns {boolean}
     */
    removeListener(id) {
        for (const key in this.listeners) {
            const index = this.listeners[key].findIndex((x) => x.id === id);
            if (index > -1) {
                this.listeners[key].splice(index, 1);
                return true;
            }
        }
        return false;
    }

    update() {
        super.update();
        // Input check
        if (
            this.stateManager.inputManager.isKeydown(87) &&
            !this.stateManager.inputManager.isKeydown(83)
        ) {
            this.dy = -this.speed;
        } else if (
            this.stateManager.inputManager.isKeydown(83) &&
            !this.stateManager.inputManager.isKeydown(87)
        ) {
            this.dy = this.speed;
        } else {
            this.dy = 0;
        }

        if (
            this.stateManager.inputManager.isKeydown(68) &&
            !this.stateManager.inputManager.isKeydown(65)
        ) {
            this.dx = this.speed;
        } else if (
            this.stateManager.inputManager.isKeydown(65) &&
            !this.stateManager.inputManager.isKeydown(68)
        ) {
            this.dx = -this.speed;
        } else {
            this.dx = 0;
        }

        // Collision check
        const entities = this.stateManager.entityManager.entities.filter(
            (entity) => entity.canCollide && entity !== this
        );
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            if (this.collides(entity)) {
                this.collide(entity);
            }
        }

        // Zet item naar speler locatie
        if (this.inhand) {
            this.inhand.x = this.x;
            this.inhand.y = this.y;
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
