import { Background } from "../entities/background.js";
import { Wall } from "../entities/wall.js";
import { Room } from "../room.js";
import { EntitySprite } from "../entity.js";
import { RENDER_LAYERS } from "../managers/entity_manager.js";

/**************************************************
 * Klasse: MazeRoomThree
 * gameManager (gameManager)
 **************************************************/
export class MazeRoomThree extends Room {
    init() {
        //Add room two
        //Muren

        //boven
        this.entities.push(new Wall(0, 0, 7, 1));
        this.entities.push(new Wall(10 * 25, 0, 7, 1));
        //onder
        this.entities.push(new Wall(0, 25 * 16, 7, 1));
        this.entities.push(new Wall(25 * 10, 25 * 16, 7, 1));
        //links
        this.entities.push(new Wall(0, 0, 1, 13));

        //rechts
        this.entities.push(new Wall(16 * 25, 0, 1, 7));
        this.entities.push(new Wall(16 * 25, 10 * 25, 1, 7));

        //vloer
        this.entities.push(new Background(0, 0, 25 * 17, 25 * 17));

        this.entities.push(
            new EntitySprite(
                25 * 13,
                25 * 13,
                75,
                60,
                "./images/bed/right.png",
                RENDER_LAYERS.floor_decoration
            )
        );
        
        this.entities.push(
            new EntitySprite(
                25 * 4,
                25 * 4,
                75,
                50,
                "./images/table/long.png",
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 7,
                25 * 4,
                25,
                50,
                "./images/chair/left.png",
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 3,
                25 * 4,
                25,
                50,
                "./images/chair/right.png",
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 5,
                25 * 2,
                25,
                50,
                "./images/chair/front.png",
                RENDER_LAYERS.floor_decoration
            )
        );

        this.entities.push(
            new EntitySprite(
                25 * 5,
                25 * 5,
                25,
                50,
                "./images/chair/rear.png",
                RENDER_LAYERS.floor_decoration
            )
        );

        
        this.entities.push(
            new EntitySprite(
                25 * 14,
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
