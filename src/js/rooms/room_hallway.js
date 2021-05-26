import { Background } from "../entities/background.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

/**************************************************
 * Klasse: RoomHallway
 * gameManager (gameManager)
 **************************************************/
export class RoomHallway extends Room {
    init() {
        //Add room hallway
        //Muren
        //links
        this.entities.push(new Wall(25 * 40, 25 * -4, 1, 4));
        this.entities.push(new Wall(25 * 40, 25 * 29, 1, 4));

        //rechts
        this.entities.push(new Wall(25 * 50, 25 * -4, 1, 37));

        ///Vloer
        this.entities.push(new Background(25 * 40, 25 * -4, 25 * 11, 25 * 37));

        super.init();
    }
}
