import { Background } from '../entities/background.js';
import { Wall } from '../entities/wall.js';
import { Room } from '../room.js';
import { EntitySprite } from '../entity.js';
import { RENDER_LAYERS } from '../managers/entity_manager.js';
import { PuzzlePart } from '../entities/items/puzzle_part.js';

/**************************************************
 * Klasse: MazeRoomOne
 * gameManager (gameManager)
 **************************************************/
export class MazeRoomOne extends Room {
    init() {
        //Add room one
        //Muren

        //boven
        this.entities.push(new Wall(0, 0, 13, 1));
        //onder
        this.entities.push(new Wall(0, 25 * 16, 17, 1));
        //links
        this.entities.push(new Wall(0, 0, 1, 6));
        this.entities.push(new Wall(0, 11 * 25, 1, 6));
        //rechts
        this.entities.push(new Wall(16 * 25, 0, 1, 17));

        //vloer
        this.entities.push(new Background(0, 0, 25 * 17, 25 * 17));

        // Puzzle
        this.entities.push(
            new PuzzlePart(
                25 * 1.9,
                25 * 1.5,
                5,
                './images/puzzles/sandcastle.png'
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 10,
                25 * 12,
                75,
                50,
                './images/table/long.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 13,
                25 * 12,
                25,
                50,
                './images/chair/left.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 9,
                25 * 12,
                25,
                50,
                './images/chair/right.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 11,
                25 * 10,
                25,
                50,
                './images/chair/front.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 11,
                25 * 13,
                25,
                50,
                './images/chair/rear.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 2,
                25 * 1,
                50,
                100,
                './images/bed.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        super.init();
    }
}
