import { EntitySprite } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";
import { GameManager } from "../managers/game_manager.js";
import { Item } from "./item.js";

export const STOP_PLAYER_ITEM = "stop_player_item";

/**************************************************
 * Klasse: Player
 * x, y (positie van de linkerbovenhoek)
 * gameManager (de state manager)
 **************************************************/
export class Player extends EntitySprite {
    /**
     * @param {number} x
     * @param {number} y
     * @param {GameManager} gameManager
     */
    constructor(x, y, gameManager) {
        super(x, y, 25, 25 * 2, "./images/player.png", RENDER_LAYERS.player);

        this.gameManager = gameManager;

        this.listeners = { pre_item_check: [], post_item_check: [] };
        this.listenerId = 0;

        this.inhand = null;
        // Als E wordt losgelaten verwissel item
        this.gameManager.inputManager.addListener(69, () => {
            for (let i = 0; i < this.listeners.pre_item_check.length; i++) {
                if (
                    this.listeners.pre_item_check[i].listener() ===
                    STOP_PLAYER_ITEM
                ) {
                    return;
                }
            }

            const entities = this.gameManager.entityManager.entities.filter(
                (entity) => entity instanceof Item
            );

            let collidingEntity;
            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i];
                if (this.inhand && entity === this.inhand.entity) continue;
                if (!this.collides(entity)) continue;

                collidingEntity = entity;
                break;
            }

            if (this.inhand) this.inhand.entity.layer = this.inhand.layer;
            if (collidingEntity) {
                const layer = collidingEntity.layer;
                collidingEntity.layer = RENDER_LAYERS.inhand;
                // Verwissel/Pak op
                this.inhand = { entity: collidingEntity, layer: layer };
            } else {
                // Leg neer
                this.inhand = null;
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
            this.gameManager.inputManager.isKeydown(87) &&
            !this.gameManager.inputManager.isKeydown(83)
        ) {
            this.dy = -this.speed;
        } else if (
            this.gameManager.inputManager.isKeydown(83) &&
            !this.gameManager.inputManager.isKeydown(87)
        ) {
            this.dy = this.speed;
        } else {
            this.dy = 0;
        }

        if (
            this.gameManager.inputManager.isKeydown(68) &&
            !this.gameManager.inputManager.isKeydown(65)
        ) {
            this.dx = this.speed;
        } else if (
            this.gameManager.inputManager.isKeydown(65) &&
            !this.gameManager.inputManager.isKeydown(68)
        ) {
            this.dx = -this.speed;
        } else {
            this.dx = 0;
        }

        // Collision check
        const entities = this.gameManager.entityManager.entities.filter(
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
            this.inhand.entity.x = this.x;
            this.inhand.entity.y = this.y;
        }
    }
}
