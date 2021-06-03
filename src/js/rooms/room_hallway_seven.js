import { Background } from "../entities/background.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

/**************************************************
 * Klasse: RoomHallwaySeven
 * gameManager (gameManager)
 **************************************************/
export class RoomHallwaySeven extends Room {
    init() {
        //Add room hallway
        //Eerste gang
        //boven
        this.entities.push(new Wall(-57 * 25, 0, 57, 1));
        //onder
        this.entities.push(new Wall(-61 * 25, 4 * 25, 61, 1));

        //links
        this.entities.push(new Wall(-61 * 25, -6 * 25, 1, 11));
        //rechts
        this.entities.push(new Wall(-57 * 25, -6 * 25, 1, 7));

        // Vloer
        this.entities.push(new Background(-61 * 25, 0, 62 * 25, 5 * 25));
        this.entities.push(new Background(-61 * 25, -6 * 25, 5 * 25, 7 * 25));

        super.init();
    }
}
