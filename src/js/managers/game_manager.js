import { Camera } from "../camera.js";
import { Player } from "../entities/player.js";
import { Timer } from "../hud/timer.js";
import { Room } from "../room.js";
import { MazeRoomOne } from "../rooms/maze_room_one.js";
import { PuzzleRoom } from "../rooms/puzzle_room.js";
import { RoomHallway } from "../rooms/room_hallway.js";
import { EntityManager } from "./entity_manager.js";
import { HudManager } from "./hud_manager.js";
import { InputManager } from "./input_manager.js";

export class GameManager {
    constructor() {
        /**
         * @type {number}
         */
        this.currentState;

        /**
         * @type {HudManager}
         */
        this.hudManager = new HudManager(this);

        /**
         * @type {EntityManager}
         */
        this.entityManager = new EntityManager();

        /**
         * @type {InputManager}
         */
        this.inputManager = new InputManager();

        /**
         * @type {Camera}
         */
        this.camera = new Camera(this);

        /**
         * @type {Player}
         */
        this.player = new Player(50, 50, this);
        this.entityManager.add(this.player);

        /**
         * @type {Array<typeof Room>}
         */
        this.rooms = [PuzzleRoom, RoomHallway, MazeRoomOne];

        for (let i = 0; i < this.rooms.length; i++) {
            const room = new this.rooms[i](this);
            room.init();
        }

        this.hudManager.add(new Timer(this, 60 * 5));

        this.setState(0);
    }

    /**
     * @param {number} state
     */
    setState(state) {
        this.currentState = state;
    }

    update() {
        this.camera.update();
        this.entityManager.update();
        this.hudManager.update();
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        this.camera.render(ctx);
        this.entityManager.render(ctx);
        this.camera.render(ctx, true);
        this.hudManager.render(ctx);
    }
}
