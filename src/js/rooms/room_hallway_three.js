import { Background } from '../entities/background.js';
import { PuzzlePart } from '../entities/items/puzzle_part.js';
import { Wall } from '../entities/wall.js';
import { Room } from '../room.js';

/**************************************************
 * Klasse: RoomHallwayThree
 * gameManager (gameManager)
 **************************************************/
export class RoomHallwayThree extends Room {
    init() {
        //Add room hallway
        //boven
        this.entities.push(new Wall(-4 * 25, 0, 5, 1));
        this.entities.push(new Wall(-44 * 25, 0, 37, 1));
        //onder
        this.entities.push(new Wall(-47 * 25, 4 * 25, 48, 1));
        //links
        this.entities.push(new Wall(-48 * 25, -15 * 25, 1, 20));
        //rechts
        this.entities.push(new Wall(-44 * 25, -15 * 25, 1, 15));

        //links
        this.entities.push(new Wall(-8 * 25, -22 * 25, 1, 22));
        this.entities.push(new Wall(-8 * 25, -47 * 25, 1, 22));
        this.entities.push(new Wall(-30 * 25, -50 * 25, 1, 3));
        //rechts
        this.entities.push(new Wall(-4 * 25, -50 * 25, 1, 50));
        //boven
        this.entities.push(new Wall(-30 * 25, -51 * 25, 27, 1));
        //onder
        this.entities.push(new Wall(-30 * 25, -47 * 25, 22, 1));

        //boven
        this.entities.push(new Wall(-38 * 25, -26 * 25, 30, 1));
        //onder
        this.entities.push(new Wall(-38 * 25, -22 * 25, 30, 1));

        // Vloer
        this.entities.push(new Background(-47 * 25, 1 * 25, 25 * 48, 25 * 3));
        this.entities.push(new Background(-47 * 25, -16 * 25, 25 * 3, 25 * 17));
        this.entities.push(new Background(-7 * 25, -50 * 25, 25 * 3, 25 * 52));
        this.entities.push(new Background(-30 * 25, -50 * 25, 25 * 24, 25 * 3));
        this.entities.push(new Background(-38 * 25, -25 * 25, 25 * 34, 25 * 3));

        // Puzzle
        this.entities.push(
            new PuzzlePart(
                -28 * 25,
                -49 * 25,
                6,
                './images/puzzles/sandcastle.png'
            )
        );

        super.init();
    }
}
