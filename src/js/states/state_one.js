import { Camera } from "../camera.js";
import { Background } from "../entities/background.js";
import { Door } from "../entities/door.js";
import { Key } from "../entities/items/key.js";
import { PuzzlePart } from "../entities/items/puzzle_part.js";
import { Player } from "../entities/player.js";
import { Puzzle } from "../entities/puzzle.js";
import { Wall } from "../entities/wall.js";
import { State } from "../state.js";

/**************************************************
 * Klasse: StateOne
 * stateManager (stateManager)
 **************************************************/
export class StateOne extends State {
    getId() {
        return 0;
    }

    init() {
        //Add enities
        this.stateManager.player = new Player(50, 50, "red", this.stateManager);

        this.stateManager.entityManager.add(
            new Puzzle(
                25 * 3,
                25 * 3,
                this.stateManager.player,
                new Key(25 * 3, 25 * 3, "level_1"),
                this.stateManager.entityManager,
                [5, 6]
            )
        );
        this.stateManager.entityManager.add(new PuzzlePart(25 * 6, 25 * 6, 0));
        this.stateManager.entityManager.add(new PuzzlePart(25 * 8, 25 * 6, 1));
        this.stateManager.entityManager.add(new PuzzlePart(25 * 9, 25 * 7, 2));
        this.stateManager.entityManager.add(new PuzzlePart(25 * 10, 25 * 5, 3));
        this.stateManager.entityManager.add(new PuzzlePart(25 * 12, 25 * 7, 4));
        this.stateManager.entityManager.add(new PuzzlePart(25 * 14, 25 * 9, 7));
        this.stateManager.entityManager.add(new PuzzlePart(25 * 7, 25 * 2, 8));

        this.stateManager.entityManager.add(this.stateManager.player);

        //Walls
        //boven
        this.stateManager.entityManager.add(new Wall(0, 0, 41, 1, "blue"));
        //onder
        this.stateManager.entityManager.add(
            new Wall(0, 25 * 28, 41, 1, "blue")
        );
        //links
        this.stateManager.entityManager.add(new Wall(0, 25, 1, 27, "blue"));
        //rechts
        this.stateManager.entityManager.add(
            new Wall(25 * 40, 25, 1, 12, "blue")
        );
        this.stateManager.entityManager.add(
            new Door(
                25 * 40,
                25 * 13,
                1,
                3,
                "brown",
                "level_1",
                this.stateManager
            )
        );
        this.stateManager.entityManager.add(
            new Wall(25 * 40, 25 * 16, 1, 12, "blue")
        );

        this.stateManager.camera = new Camera(this.stateManager);
        this.stateManager.background = new Background(
            0,
            0,
            1025,
            725,
            "#c2b280"
        );
    }
}
