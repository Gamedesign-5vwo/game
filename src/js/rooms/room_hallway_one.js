import { Background } from '../entities/background.js';
import { Wall } from '../entities/wall.js';
import { Room } from '../room.js';

/**************************************************
 * Klasse: RoomHallwayOne
 * gameManager (gameManager)
 **************************************************/
export class RoomHallwayOne extends Room {
    init() {
        //Add room hallway
        //Eerste gang
        //boven
        this.entities.push(new Wall(0, 0, 24, 1));
        //onder
        this.entities.push(new Wall(0, 4 * 25, 20, 1));
        // Vloer
        this.entities.push(new Background(-1 * 25, 1 * 25, 25 * 21, 25 * 3));

        //Tweede gang
        //links
        this.entities.push(new Wall(19 * 25, 5 * 25, 1, 29));
        //recht
        this.entities.push(new Wall(23 * 25, 1 * 25, 1, 15));
        this.entities.push(new Wall(23 * 25, 19 * 25, 1, 15));
        //onder
        this.entities.push(new Wall(19 * 25, 33 * 25, 5, 1));
        // Vloer
        this.entities.push(new Background(19 * 25, 1 * 25, 25 * 5, 25 * 33));

        //Derde gang
        //boven
        this.entities.push(new Wall(23 * 25, 15 * 25, 23, 1));
        //onder
        this.entities.push(new Wall(23 * 25, 19 * 25, 23, 1));
        // Vloer
        this.entities.push(new Background(23 * 25, 16 * 25, 25 * 23, 25 * 3));

        super.init();
    }
}
