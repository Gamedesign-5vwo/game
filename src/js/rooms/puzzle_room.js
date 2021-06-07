import { Background } from "../entities/background.js";
import { Door } from "../entities/door.js";
import { Key } from "../entities/items/key.js";
import { PuzzlePart } from "../entities/items/puzzle_part.js";
import { Puzzle } from "../entities/puzzle.js";
import { Wall } from "../entities/wall.js";
import { EntitySprite } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";
import { Room } from "../room.js";

/**************************************************
 * Klasse: PuzzleRoom
 * gameManager (gameManager)
 **************************************************/
export class PuzzleRoom extends Room {
    init() {
        //Add enities
        this.entities.push(new Background(0, 0, 1025, 725));

        //Puzzle
        this.entities.push(
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
        this.entities.push(
            new PuzzlePart(25 * 6, 25 * 6, 0, "./images/meloen.png")
        );
        this.entities.push(
            new PuzzlePart(25 * 8, 25 * 6, 1, "./images/meloen.png")
        );
        this.entities.push(
            new PuzzlePart(25 * 9, 25 * 7, 2, "./images/meloen.png")
        );
        this.entities.push(
            new PuzzlePart(25 * 10, 25 * 5, 3, "./images/meloen.png")
        );
        this.entities.push(
            new PuzzlePart(25 * 12, 25 * 7, 4, "./images/meloen.png")
        );
        this.entities.push(
            new PuzzlePart(25 * 14, 25 * 9, 7, "./images/meloen.png")
        );
        this.entities.push(
            new PuzzlePart(25 * 7, 25 * 2, 8, "./images/meloen.png")
        );
        this.entities.push(
            new PuzzlePart(25 * 5, 25 * 2, 8, "./images/meloen2.png")
        );

        //Muren
        //boven
        this.entities.push(new Wall(0, 0, 41, 1));
        //onder
        this.entities.push(new Wall(0, 25 * 28, 41, 1));
        //links
        this.entities.push(new Wall(0, 25, 1, 27));
        //rechts
        this.entities.push(new Wall(25 * 40, 25, 1, 12));
        //TODO: terug plaatsen
        // this.entities.push(
        //     new Door(
        //         25 * 40,
        //         25 * 13,
        //         1,
        //         3,
        //         "brown",
        //         "level_1",
        //         () => {
        //             this.gameManager.setState(1);
        //         },
        //         this.gameManager
        //     )
        // );
        this.entities.push(new Wall(25 * 40, 25 * 16, 1, 12));

        // Decorations
        this.entities.push(
            new EntitySprite(
                25 * 2,
                25 * 2,
                100,
                75,
                "./images/rug/rug.png",
                RENDER_LAYERS.floor_decoration,
                false //als je er overheen kunt lopen
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 15,
                25 * 15,
                75,
                75,
                "./images/desk/apple_with_chair.png",
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 17,
                25 * 17,
                50,
                75,
                "./images/bed/front.png",
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 18,
                25 * 18,
                75,
                50,
                "./images/table/long.png",
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 10,
                25 * 10,
                100,
                75,
                "./images/rug/rug.png",
                RENDER_LAYERS.floor_decoration,
                false //als je er overheen kunt lopen
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 10,
                25 * 1,
                50,
                75,
                "./images/closet/front.png",
                RENDER_LAYERS.floor_decoration
            )
        );

        super.init();
    }
}