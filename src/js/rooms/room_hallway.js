import { Background } from "../entities/background.js";
import { Rock } from "../entities/rock.js";
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
        this.entities.push(new Wall(0, 0, 1, 4));
        this.entities.push(new Wall(0, 25 * 33, 1, 4));

        //rechts
        this.entities.push(new Wall(25 * 10, 0, 1, 37));

        ///Vloer
        this.entities.push(new Background(0, 0, 25 * 11, 25 * 37));

        super.init();
    }
}
