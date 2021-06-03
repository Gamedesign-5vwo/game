import { Background } from "../entities/background.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

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

        super.init();
    }
}
