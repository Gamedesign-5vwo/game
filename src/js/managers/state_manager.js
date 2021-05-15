import { Camera } from "../camera.js";
import { Background } from "../entities/background.js";
import { Player } from "../entities/player.js";
import { State } from "../state.js";
import { StateOne } from "../states/state_one.js";
import { EntityManager } from "./entity_manager.js";
import { InputManager } from "./input_manager.js";

export class StateManager {
    constructor() {
        /**
         * @type {State}
         */
        this.currentState;

        /**
         * @type {Player}
         */
        this.player;

        /**
         * @type {Background}
         */
        this.background;

        /**
         * @type {Camera}
         */
        this.camera;

        /**
         * @type {EntityManager}
         */
        this.entityManager = new EntityManager();

        /**
         * @type {InputManager}
         */
        this.inputManager = new InputManager();

        this.setState(StateOne);
    }

    /**
     * @param {typeof State} state
     */
    setState(state) {
        this.currentState = new state(this);
        this.currentState.init();
    }

    init() {
        this.currentState.init();
    }

    update() {
        this.currentState.update();
        this.camera.update();
        this.entityManager.update();
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        this.camera.render(ctx);
        this.background.render(ctx);
        this.entityManager.render(ctx);
        this.currentState.render(ctx);
    }
}
