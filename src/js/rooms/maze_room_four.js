import { Background } from '../entities/background.js';
import { Wall } from '../entities/wall.js';
import { Room } from '../room.js';
import { EntitySprite } from '../entity.js';
import { RENDER_LAYERS } from '../managers/entity_manager.js';
import { PuzzlePart } from '../entities/items/puzzle_part.js';

/**************************************************
 * Klasse: MazeRoomFour
 * gameManager (gameManager)
 **************************************************/
export class MazeRoomFour extends Room {
    init() {
        //Add room two
        //Muren

        //boven
        this.entities.push(new Wall(0, 0, 7, 1));
        this.entities.push(new Wall(10 * 25, 0, 7, 1));
        //onder
        this.entities.push(new Wall(0, 25 * 16, 17, 1));
        //links
        this.entities.push(new Wall(0, 0, 1, 8));
        this.entities.push(new Wall(0, 11 * 25, 1, 6));

        //rechts
        this.entities.push(new Wall(16 * 25, 0, 1, 17));

        //vloer
        this.entities.push(new Background(0, 0, 25 * 17, 25 * 17));

        // Puzzle
        this.entities.push(
            new PuzzlePart(
                25 * 15,
                25 * 3.5,
                0,
                './images/puzzles/sandcastle.png'
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 14,
                25 * 1,
                50,
                75,
                './images/bookcase/front.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 2,
                25 * 2,
                50,
                75,
                './images/bed/front.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 12,
                25 * 12,
                50,
                100,
                './images/bed.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        super.init();
    }
}
