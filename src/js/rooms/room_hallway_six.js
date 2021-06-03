import { Background } from "../entities/background.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

/**************************************************
 * Klasse: RoomHallwaySix
 * gameManager (gameManager)
 **************************************************/
export class RoomHallwaySix extends Room {
    init() {
        //Add room hallway
        //Eerste gang
        //boven
        this.entities.push(new Wall(0, -40 * 25, 5, 1));
        //links
        this.entities.push(new Wall(0, -40 * 25, 1, 40));
        //rechts
        this.entities.push(new Wall(4 * 25, -40 * 25, 1, 40));

        // Vloer
        this.entities.push(new Background(0, -40 * 25, 5 * 25, 40 * 25));

        super.init();
    }
}
