import { Background } from '../entities/background.js';
import { Wall } from '../entities/wall.js';
import { Room } from '../room.js';
import { EntitySprite } from '../entity.js';
import { RENDER_LAYERS } from '../managers/entity_manager.js';
import { PuzzlePart } from '../entities/items/puzzle_part.js';

/**************************************************
 * Klasse: MazeRoomTwo
 * gameManager (gameManager)
 **************************************************/
export class MazeRoomTwo extends Room {
    init() {
        //Add room two
        //Muren

        //boven
        this.entities.push(new Wall(0, 0, 17, 1));
        //onder
        this.entities.push(new Wall(0, 25 * 16, 7, 1));
        this.entities.push(new Wall(25 * 10, 25 * 16, 7, 1));
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
                25 * 13,
                25 * 14.9,
                3,
                './images/puzzles/sandcastle.png'
            )
        );
        this.entities.push(
            new PuzzlePart(
                25 * 12.4,
                25 * 1.5,
                8,
                './images/puzzles/sandcastle.png'
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 10,
                25 * 1,
                75,
                75,
                './images/desk/paper_with_chair.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 13,
                25 * 13,
                75,
                60,
                './images/bed/right.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 6,
                25 * 8,
                100,
                75,
                './images/rug/rug.png',
                RENDER_LAYERS.floor_decoration,
                false //als je er overheen kunt lopen
            )
        );

        super.init();
    }
}
