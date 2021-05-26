import { Background } from "../entities/background.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

/**************************************************
 * Klasse: MazeRoomOne
 * gameManager (gameManager)
 **************************************************/
export class MazeRoomOne extends Room {
    init() {
        //Add room hallway
        //Muren

        //boven
        this.entities.push(new Wall(25 * 30, 25 * 33, 14, 1));
        this.entities.push(new Wall(25 * 47, 25 * 33, 14, 1));
        //onder
        this.entities.push(new Wall(25 * 30, 25 * 63, 31, 1));
        //links
        this.entities.push(new Wall(25 * 30, 25 * 33, 1, 30));
        //rechts
        this.entities.push(new Wall(25 * 60, 25 * 33, 1, 30));

        //vloer
        this.entities.push(new Background(25 * 30, 25 * 33, 25 * 30, 25 * 30));

        super.init();
    }
}
