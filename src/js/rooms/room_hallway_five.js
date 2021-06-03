import { Background } from "../entities/background.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

/**************************************************
 * Klasse: RoomHallwayFour
 * gameManager (gameManager)
 **************************************************/
export class RoomHallwayFive extends Room {
    init() {
        //Add room hallway
        //Eerste gang
        //boven
        this.entities.push(new Wall(-2 * 25, -47 * 25, 37, 1));
        //onder
        this.entities.push(new Wall(2 * 25, -43 * 25, 33, 1));
        //links
        this.entities.push(new Wall(-2 * 25, -47 * 25, 1, 47));
        //rechts
        this.entities.push(new Wall(2 * 25, -43 * 25, 1, 43));
        // Vloer
        this.entities.push(new Background(-2 * 25, -47 * 25, 5 * 25, 47 * 25));
        this.entities.push(new Background(-2 * 25, -47 * 25, 37 * 25, 5 * 25));

        super.init();
    }
}
