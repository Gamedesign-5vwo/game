import { Background } from '../entities/background.js';
import { Wall } from '../entities/wall.js';
import { Room } from '../room.js';
import { EntitySprite } from '../entity.js';
import { RENDER_LAYERS } from '../managers/entity_manager.js';
import { Door } from '../entities/door.js';
import { Key } from '../entities/items/key.js';
import { Puzzle } from '../entities/puzzle.js';
import { PuzzlePart } from '../entities/items/puzzle_part.js';

/**************************************************
 * Klasse: MazeRoomFive
 * gameManager (gameManager)
 **************************************************/
export class MazeRoomFive extends Room {
    init() {
        //Add room two
        //Muren

        //boven
        this.entities.push(new Wall(0, 0, 7, 1));
        this.entities.push(new Wall(10 * 25, 0, 7, 1));
        //onder
        this.entities.push(new Wall(0, 25 * 16, 17, 1));
        //links
        this.entities.push(new Wall(0, 0, 1, 8));
        if(!this.gameManager.finishedMaze){
            this.entities.push(
                new Door(
                    25 * 0,
                    25 * 8,
                    1,
                    3,
                    'level_2',
                    () => {
                        this.gameManager.finishedMaze = true;
                    },
                    this.gameManager
                )
            );
        }
        
        this.entities.push(new Wall(0, 11 * 25, 1, 6));

        //rechts
        this.entities.push(new Wall(16 * 25, 0, 1, 17));

        //vloer
        this.entities.push(new Background(0, 0, 25 * 17, 25 * 17));

        //Puzzle
        this.entities.push(
            new Puzzle(
                25 * 2,
                25 * 8,
                this.gameManager.player,
                new Key(25 * 2, 25 * -21, 'level_2'),
                this.gameManager.entityManager,
                './images/puzzles/sandcastle.png',
                {
                    x: this.x,
                    y: this.y,
                },
                [ 2, 7]
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 13,
                25 * 1,
                75,
                100,
                './images/kast.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 2,
                25 * 2,
                50,
                100,
                './images/bed.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 12,
                25 * 12,
                50,
                75,
                './images/bed/front.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 6,
                25 * 8,
                100,
                75,
                './images/rug/rug.png',
                RENDER_LAYERS.floor_decoration,
                false //als je er overheen kunt lopen
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 1,
                25 * 14,
                43,
                44,
                './images/bush.png',
                RENDER_LAYERS.floor_decoration
            )
        );

        super.init();
    }
}
