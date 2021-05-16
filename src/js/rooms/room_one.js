import { Camera } from "../camera.js";
import { Background } from "../entities/background.js";
import { Door } from "../entities/door.js";
import { Key } from "../entities/items/key.js";
import { PuzzlePart } from "../entities/items/puzzle_part.js";
import { Player } from "../entities/player.js";
import { Puzzle } from "../entities/puzzle.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";

/**************************************************
 * Klasse: RoomOne
 * gameManager (gameManager)
 **************************************************/
export class RoomOne extends Room {
    init() {
        //Add enities
        this.gameManager.player = new Player(50, 50, "red", this.gameManager);

        //Puzzle
        this.gameManager.entityManager.add(
            new Puzzle(
                25 * 3,
                25 * 3,
                this.gameManager.player,
                new Key(25 * 3, 25 * 3, "level_1"),
                this.gameManager.entityManager,
                "./images/meloen.png",

                // [5, 6]
                //TODO: terug zetten na testen
                [0, 1, 2, 3, 4, 5, 6, 7]
            )
        );
        this.gameManager.entityManager.add(
            new PuzzlePart(25 * 6, 25 * 6, 0, "./images/meloen.png")
        );
        this.gameManager.entityManager.add(
            new PuzzlePart(25 * 8, 25 * 6, 1, "./images/meloen.png")
        );
        this.gameManager.entityManager.add(
            new PuzzlePart(25 * 9, 25 * 7, 2, "./images/meloen.png")
        );
        this.gameManager.entityManager.add(
            new PuzzlePart(25 * 10, 25 * 5, 3, "./images/meloen.png")
        );
        this.gameManager.entityManager.add(
            new PuzzlePart(25 * 12, 25 * 7, 4, "./images/meloen.png")
        );
        this.gameManager.entityManager.add(
            new PuzzlePart(25 * 14, 25 * 9, 7, "./images/meloen.png")
        );
        this.gameManager.entityManager.add(
            new PuzzlePart(25 * 7, 25 * 2, 8, "./images/meloen.png")
        );
        this.gameManager.entityManager.add(
            new PuzzlePart(25 * 5, 25 * 2, 8, "./images/meloen2.png")
        );

        this.gameManager.entityManager.add(this.gameManager.player);

        //Walls
        //boven
        this.gameManager.entityManager.add(new Wall(0, 0, 41, 1, "blue"));
        //onder
        this.gameManager.entityManager.add(new Wall(0, 25 * 28, 41, 1, "blue"));
        //links
        this.gameManager.entityManager.add(new Wall(0, 25, 1, 27, "blue"));
        //rechts
        this.gameManager.entityManager.add(
            new Wall(25 * 40, 25, 1, 12, "blue")
        );
        this.gameManager.entityManager.add(
            new Door(
                25 * 40,
                25 * 13,
                1,
                3,
                "brown",
                "level_1",
                () => {
                    this.gameManager.setState(1);
                },
                this.gameManager
            )
        );
        this.gameManager.entityManager.add(
            new Wall(25 * 40, 25 * 16, 1, 12, "blue")
        );

        this.gameManager.camera = new Camera(this.gameManager);
        this.gameManager.background = new Background(
            0,
            0,
            1025,
            725,
            "#c2b280"
        );
    }
}
