import { Background } from "../entities/background.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

/**************************************************
 * Klasse: RoomHallwayTwo
 * gameManager (gameManager)
 **************************************************/
export class RoomHallwayTwo extends Room {
    init() {
        //Add room hallway two
        //Eerste gang
        //links
        this.entities.push(new Wall(0, -15 * 25, 1, 15));
        //recht
        this.entities.push(new Wall(4 * 25, -19 * 25, 1, 19));
        //boven
        this.entities.push(new Wall(19 * 25, 33 * 25, 5, 1));
        // Vloer
        this.entities.push(new Background(0 * 25, -15 * 25, 25 * 5, 25 * 16));

        //S-bocht
        //onder,onder
        this.entities.push(new Wall(-14 * 25, -15 * 25, 14, 1));
        //onder,boven
        this.entities.push(new Wall(-10 * 25, -19 * 25, 15, 1));
        //links
        this.entities.push(new Wall(-14 * 25, -34 * 25, 1, 20));
        //rechts
        this.entities.push(new Wall(-10 * 25, -30 * 25, 1, 12));
        //boven,boven
        this.entities.push(new Wall(-14 * 25, -34 * 25, 18, 1));
        //boven,onder
        this.entities.push(new Wall(-10 * 25, -30 * 25, 18, 1));
        // Vloer
        this.entities.push(new Background(-14 * 25, -19 * 25, 25 * 19, 25 * 5));
        this.entities.push(new Background(-14 * 25, -34 * 25, 25 * 5, 25 * 15));
        this.entities.push(new Background(-14 * 25, -34 * 25, 25 * 23, 25 * 5));

        //Tweede gang
        //rechts
        this.entities.push(new Wall(8 * 25, -52 * 25, 1, 23));
        //links
        this.entities.push(new Wall(4 * 25, -48 * 25, 1, 15));
        //onder
        this.entities.push(new Wall(-20 * 25, -48 * 25, 24, 1));
        //boven
        this.entities.push(new Wall(-6 * 25, -52 * 25, 14, 1));
        //rechts2
        this.entities.push(new Wall(-6 * 25, -65 * 25, 1, 14));
        //links2
        this.entities.push(new Wall(-10 * 25, -65 * 25, 1, 14));
        //boven2
        this.entities.push(new Wall(-24 * 25, -52 * 25, 15, 1));
        //links3
        this.entities.push(new Wall(-24 * 25, -52 * 25, 1, 20));
        //rechts3
        this.entities.push(new Wall(-20 * 25, -48 * 25, 1, 16));
        //onder2
        this.entities.push(new Wall(-24 * 25, -32 * 25, 5, 1));
        //vloer
        this.entities.push(new Background(-24 * 25, -52 * 25, 25 * 30, 25 * 5));
        this.entities.push(new Background(-24 * 25, -52 * 25, 25 * 5, 25 * 20));
        this.entities.push(new Background(4 * 25, -52 * 25, 25 * 5, 25 * 19));
        this.entities.push(new Background(-10 * 25, -65 * 25, 25 * 5, 25 * 18));

        super.init();
    }
}
