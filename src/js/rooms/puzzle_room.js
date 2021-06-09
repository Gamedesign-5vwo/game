import { Background } from '../entities/background.js';
import { Door } from '../entities/door.js';
import { Key } from '../entities/items/key.js';
import { PuzzlePart } from '../entities/items/puzzle_part.js';
import { Puzzle } from '../entities/puzzle.js';
import { Wall } from '../entities/wall.js';
import { EntitySprite } from '../entity.js';
import { RENDER_LAYERS } from '../managers/entity_manager.js';
import { Room } from '../room.js';

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
                new Key(25 * 3, 25 * 3, 'level_1'),
                this.gameManager.entityManager,
                './images/puzzles/bucket.png',
                {
                    x: this.x,
                    y: this.y,
                },
                [5, 6]
            )
        );
        this.entities.push(
            new PuzzlePart(25 * 11, 25 * 3.5, 0, './images/puzzles/bucket.png')
        );
        this.entities.push(
            new PuzzlePart(25 * 1.5, 25 * 16, 1, './images/puzzles/bucket.png')
        );
        this.entities.push(
            new PuzzlePart(25 * 3, 25 * 24.8, 2, './images/puzzles/bucket.png')
        );
        this.entities.push(
            new PuzzlePart(25 * 10, 25 * 5, 3, './images/puzzles/bucket.png')
        );
        this.entities.push(
            new PuzzlePart(25 * 30, 25 * 21.5, 4, './images/puzzles/bucket.png')
        );
        this.entities.push(
            new PuzzlePart(25 * 17, 25 * 14.8, 7, './images/puzzles/bucket.png')
        );
        this.entities.push(
            new PuzzlePart(25 * 30, 25 * 1, 8, './images/puzzles/bucket.png')
        );
        this.entities.push(
            new PuzzlePart(25 * 35, 25 * 3.6, 8, './images/meloen.png')
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
        
        if(!this.gameManager.finishedPuzzle){
            this.entities.push(
                new Door(
                    25 * 40,
                    25 * 13,
                    1,
                    3,
                    'level_1',
                    () => {
                        this.gameManager.setState(1);
                    },
                    this.gameManager
                )
            );
        }
        this.entities.push(new Wall(25 * 40, 25 * 16, 1, 12));

        // Decorations
        this.entities.push(
            new EntitySprite(
                25 * 15,
                25 * 15,
                100,
                75,
                './images/rug/rug.png',
                RENDER_LAYERS.floor_decoration,
                false //als je er overheen kunt lopen
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 30,
                25 * 1,
                75,
                75,
                './images/desk/apple_with_chair.png',
                RENDER_LAYERS.furniture
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 35,
                25 * 1,
                50,
                75,
                './images/bed/front.png',
                RENDER_LAYERS.furniture
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 30,
                25 * 22,
                75,
                50,
                './images/table/long.png',
                RENDER_LAYERS.furniture
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 10,
                25 * 1,
                50,
                75,
                './images/closet/front.png',
                RENDER_LAYERS.furniture
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 1,
                25 * 15,
                25,
                75,
                './images/bookcase/left.png',
                RENDER_LAYERS.furniture
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 1,
                25 * 25,
                100,
                75,
                './images/rug/rug.png',
                RENDER_LAYERS.floor_decoration,
                false //als je er overheen kunt lopen
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 33,
                25 * 22,
                25,
                50,
                './images/chair/left.png',
                RENDER_LAYERS.furniture
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 29,
                25 * 22,
                25,
                50,
                './images/chair/right.png',
                RENDER_LAYERS.furniture
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 31,
                25 * 20,
                25,
                50,
                './images/chair/front.png',
                RENDER_LAYERS.furniture
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 31,
                25 * 23,
                25,
                50,
                './images/chair/rear.png',
                RENDER_LAYERS.furniture
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 5,
                25 * 24,
                50,
                100,
                './images/bed.png',
                RENDER_LAYERS.furniture
            )
        );

        super.init();
    }
}
