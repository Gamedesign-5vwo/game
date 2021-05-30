import { Background } from "../entities/background.js";
import { Rock } from "../entities/rock.js";
import { Room } from "../room.js";

const random = (min, max) => {
    return Math.floor(Math.random() * max) + min;
};

/**************************************************
 * Klasse: RoomCrossingTheRoad
 * gameManager (gameManager)
 **************************************************/
export class RoomCrossingTheRoad extends Room {
    init() {
        // Start
        this.entities.push(
            (this.gameManager.crossingTheRoad = new Background(
                0,
                1525,
                1025,
                25,
                "#F2D16B"
            ))
        );

        // Vloer
        this.entities.push(new Background(0, 0, 1025, 1525, "#00bfff"));

        let speed = 0.3;
        for (let i = 0; i < 30; i++) {
            this.entities.push(
                new Rock(
                    random(100, 900),
                    50 * i + random(10, 25),
                    this.x + 25,
                    this.x + 1000,
                    speed,
                    this.gameManager
                )
            );
            speed -= random(0.006, 0.03);
        }

        super.init();
    }
}
