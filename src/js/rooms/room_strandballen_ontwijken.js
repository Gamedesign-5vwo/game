import { Background } from "../entities/background.js";
import { Rock } from "../entities/rock.js";
import { Strandbal } from "../entities/strandbal.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

const random = (min, max) => {
    return Math.floor(Math.random() * max) + min;
};

/**************************************************
 * Klasse: RoomStrandballenOntwijken
 * gameManager (gameManager)
 **************************************************/
export class RoomStrandballenOntwijken extends Room {
    init() {
        //Muren
        //links
        this.entities.push(new Wall(-25, 0, 1, 1525 / 25));

        //rechts
        this.entities.push(new Wall(1025, 0, 1, 1525 / 25));

        // Vloer
        this.entities.push(
            new Background(0, -1500, 1025, 1525, "./images/sand.png")
        );
        this.entities.push(
            (this.gameManager.ontwijkStrandballen = new Background(
                0,
                0,
                1025,
                1525,
                "./images/sand.png"
            ))
        );

        super.init();
    }

    addNewStrandballen() {
        let speed = 0.2;
        for (let i = 0; i < 10; i++) {
            const strandbal = new Strandbal(
                random(10, 900),
                0,
                speed,
                this.gameManager
            );
            this.entities.push(strandbal);
            strandbal.x += this.x;
            strandbal.y += this.y;
            this.gameManager.entityManager.add(strandbal);

            speed -= random(0.006, 0.03);
        }
    }
}
