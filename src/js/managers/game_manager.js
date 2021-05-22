import { Camera } from "../camera.js";
import { Player } from "../entities/player.js";
import { Room } from "../room.js";
import { RoomOne } from "../rooms/room_one.js";
import { RoomTwo } from "../rooms/room_two.js";
import { EntityManager } from "./entity_manager.js";
import { InputManager } from "./input_manager.js";

export class GameManager {
    constructor() {
        /**
         * @type {number}
         */
        this.currentState;

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
        this.player = new Player(50, 50, "red", this);
        this.entityManager.add(this.player);

        /**
         * @type {Array<typeof Room>}
         */
        this.rooms = [RoomOne, RoomTwo];

        for (let i = 0; i < this.rooms.length; i++) {
            const room = new this.rooms[i](this);
            room.init();
        }

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
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        this.camera.render(ctx);
        this.entityManager.render(ctx);
        this.camera.render(ctx, true);
    }
}
