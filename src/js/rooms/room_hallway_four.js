import { Background } from "../entities/background.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

/**************************************************
 * Klasse: RoomHallwayFour
 * gameManager (gameManager)
 **************************************************/
export class RoomHallwayFour extends Room {
    init() {
        //Add room hallway
        //Eerste gang
        //boven
        this.entities.push(new Wall(-48 * 25, 0, 47, 1));
        //onder
        this.entities.push(new Wall(-44 * 25, 4 * 25, 19, 1));
        this.entities.push(new Wall(-21 * 25, 4 * 25, 20, 1));
        //links
        this.entities.push(new Wall(-48 * 25, 0 * 25, 1, 20));
        //rechts
        this.entities.push(new Wall(-44 * 25, 4 * 25, 1, 16));
        //onder2
        this.entities.push(new Wall(-48 * 25, 20 * 25, 5, 1));
        //links2
        this.entities.push(new Wall(-25 * 25, 4 * 25, 1, 40));
        //rechts2
        this.entities.push(new Wall(-21 * 25, 4 * 25, 1, 40));
        // Vloer
        this.entities.push(new Background(-47 * 25, 1 * 25, 25 * 48, 25 * 3));
        this.entities.push(new Background(-48 * 25, 0 * 25, 25 * 5, 25 * 20));
        this.entities.push(new Background(-25 * 25, 0 * 25, 25 * 5, 25 * 46));

        super.init();
    }
}
