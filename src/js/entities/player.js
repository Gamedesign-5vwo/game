import { Entity } from "../entity.js";
import { Item } from "./item.js";

/**************************************************
 * Klasse: Player
 * x, y (positie van de linkerbovenhoek)
 * color (de kleur van de speler)
 * inputManager (de regelaar van inputs)
 * entities (Lijst van entities)
 **************************************************/
export class Player extends Entity {
    constructor(x, y, color, inputManager, entities) {
        super(x, y, 25, 25 * 2);

        this.color = color;
        this.inputManager = inputManager;
        this.entities = entities;

        this.inhand = null;
        // Als E wordt ingedrukt verwissel item
        this.inputManager.addListener(69, () => {
            if (this.inhand) this.inhand = null;
            else {
                const entities = this.entities.filter(
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
        });

        this.speed = 2;
    }

    update() {
        super.update();
        // Input check
        if (
            this.inputManager.isKeydown(87) &&
            !this.inputManager.isKeydown(83)
        ) {
            this.dy = -this.speed;
        } else if (
            this.inputManager.isKeydown(83) &&
            !this.inputManager.isKeydown(87)
        ) {
            this.dy = this.speed;
        } else {
            this.dy = 0;
        }

        if (
            this.inputManager.isKeydown(68) &&
            !this.inputManager.isKeydown(65)
        ) {
            this.dx = this.speed;
        } else if (
            this.inputManager.isKeydown(65) &&
            !this.inputManager.isKeydown(68)
        ) {
            this.dx = -this.speed;
        } else {
            this.dx = 0;
        }

        // Collision check
        const entities = this.entities.filter(
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

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
