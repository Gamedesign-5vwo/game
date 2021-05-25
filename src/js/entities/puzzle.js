import { Entity } from "../entity.js";
import { EntityManager, RENDER_LAYERS } from "../managers/entity_manager.js";
import { Item } from "./item.js";
import { PuzzlePart } from "./items/puzzle_part.js";
import { Player, STOP_PLAYER_ITEM } from "./player.js";

export const PUZZLE_POSITION = {
    0: { x: 0, y: 0 },
    1: { x: 1, y: 0 },
    2: { x: 2, y: 0 },
    3: { x: 0, y: 1 },
    4: { x: 1, y: 1 },
    5: { x: 2, y: 1 },
    6: { x: 0, y: 2 },
    7: { x: 1, y: 2 },
    8: { x: 2, y: 2 },
};

export const PUZZLE_SIZE = 15;

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {PuzzlePart} part
 */
export function renderPuzzlePart(ctx, part) {
    const position = PUZZLE_POSITION[part.type];

    ctx.drawImage(
        part.puzzleImg,
        PUZZLE_SIZE * position.x,
        PUZZLE_SIZE * position.y,
        PUZZLE_SIZE,
        PUZZLE_SIZE,
        part.x,
        part.y,
        PUZZLE_SIZE,
        PUZZLE_SIZE
    );
}

/**************************************************
 * Klasse: Puzzle
 * x, y (positie van de linkerbovenhoek)
 * player (de speler)
 * entityManager (entity manager)
 * parts (Lijst van puzzle parts)
 **************************************************/
export class Puzzle extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {Player} player
     * @param {Item} reward
     * @param {EntityManager} entityManager
     * @param {Array<number>} parts
     */
    constructor(x, y, player, reward, entityManager, puzzleImg, parts = []) {
        super(
            x,
            y,
            PUZZLE_SIZE * 3 + 30,
            PUZZLE_SIZE * 3 + 30,
            RENDER_LAYERS.floor_decoration,
            false
        );
        this.player = player;
        this.reward = reward;
        this.puzzleImg = new Image();
        this.puzzleImg.src = puzzleImg;
        this.entityManager = entityManager;

        this.parts = parts.map((type) => {
            const position = this.typeToPosition(type);
            return new PuzzlePart(position.x, position.y, type, puzzleImg);
        });

        // Als item wordt losgelaten kijk of het puzzle stuk is
        this.preItemCheckId = this.player.addPreItemCheck(() => {
            if (
                !this.collides(this.player) ||
                (this.player.inhand &&
                    !(this.player.inhand.entity instanceof PuzzlePart))
            ) {
                return;
            }

            let rows = [];
            let columns = [];
            for (const type in PUZZLE_POSITION) {
                const position = this.typeToPosition(parseInt(type));
                rows.push(position.y + PUZZLE_SIZE / 2);
                columns.push(position.x + PUZZLE_SIZE / 2);
            }

            // Find dichtsbijzijnde plek (https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array)
            const closestRow =
                rows.reduce((prev, curr) => {
                    return Math.abs(curr - this.player.y) <
                        Math.abs(prev - this.player.y)
                        ? curr
                        : prev;
                }) -
                PUZZLE_SIZE / 2;

            const closestColumn =
                columns.reduce((prev, curr) => {
                    return Math.abs(curr - this.player.x) <
                        Math.abs(prev - this.player.x)
                        ? curr
                        : prev;
                }) -
                PUZZLE_SIZE / 2;

            // Is er al een part op die positie?
            const hasPartAtPosition = this.parts.find(
                (part) => part.x === closestColumn && part.y === closestRow
            );

            const puzzlePart = this.player.inhand
                ? this.player.inhand.entity
                : null;
            if (hasPartAtPosition) {
                // Verwissel de twee stukken
                const layer = hasPartAtPosition.layer;
                hasPartAtPosition.layer = RENDER_LAYERS.inhand;
                this.player.inhand = {
                    entity: hasPartAtPosition,
                    layer: layer,
                };
                this.entityManager.add(hasPartAtPosition);
                this.parts.splice(this.parts.indexOf(hasPartAtPosition), 1);
            } else {
                if (!puzzlePart) return;

                // Verwijder van speler hand
                this.player.inhand = null;
            }

            if (puzzlePart) {
                // Verwijder van entityManager lijst
                this.entityManager.remove(puzzlePart);

                // Zet positie
                puzzlePart.x = closestColumn;
                puzzlePart.y = closestRow;

                // Toevoegen aan parts lijst
                this.parts.push(puzzlePart);
            }

            // Zorg dat er verder niks wordt gedaan
            return STOP_PLAYER_ITEM;
        });
    }

    /**
     * @param {number} type
     * @returns {{x: number, y: number}}
     */
    typeToPosition(type) {
        return {
            x: PUZZLE_POSITION[type].x * PUZZLE_SIZE + this.x + PUZZLE_SIZE,
            y: PUZZLE_POSITION[type].y * PUZZLE_SIZE + this.y + PUZZLE_SIZE,
        };
    }

    isCompleted() {
        // Ga door alle types
        for (const typeString in PUZZLE_POSITION) {
            const type = parseInt(typeString);
            // Kijk of part er is
            const part = this.parts.find((part) => {
                return part.type === type;
            });
            if (!part) return false;

            // Kijk of het op de juise positie is
            const position = this.typeToPosition(type);
            if (part.x !== position.x || part.y !== position.y) return false;

            // Kijk of het onderdeel is van de juiste puzzle
            if (part.puzzleImg.src !== this.puzzleImg.src) return false;
        }
        // Anders true
        return true;
    }

    update() {
        super.update();
        if (!this.isCompleted()) return;

        this.player.removeListener(this.preItemCheckId);
        this.entityManager.remove(this);
        this.entityManager.add(this.reward);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        // Maak buiten kant (geen strokeRect omdat de lijn aan de binnenkant moet zitten)
        ctx.strokeStyle = "brown";
        ctx.lineWidth = PUZZLE_SIZE;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + ctx.lineWidth / 2);
        ctx.lineTo(this.x + this.width, this.y + ctx.lineWidth / 2);

        ctx.moveTo(
            this.x + this.width - ctx.lineWidth / 2,
            this.y + ctx.lineWidth / 2
        );
        ctx.lineTo(
            this.x + this.width - ctx.lineWidth / 2,
            this.y + this.height
        );

        ctx.moveTo(
            this.x + this.width,
            this.y + this.height - ctx.lineWidth / 2
        );
        ctx.lineTo(this.x, this.y + this.height - ctx.lineWidth / 2);

        ctx.moveTo(this.x + ctx.lineWidth / 2, this.y + this.height);
        ctx.lineTo(this.x + ctx.lineWidth / 2, this.y);
        ctx.stroke();

        for (let i = 0; i < this.parts.length; i++) {
            const part = this.parts[i];
            renderPuzzlePart(ctx, part);
        }
    }
}
