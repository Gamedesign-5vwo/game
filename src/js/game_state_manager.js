import { GameState } from "./game_state";
import { removeAllChildren } from "./utils";

/**
 * Keeps track of states
 */
export class GameStateManager {
    constructor() {
        /** @type {GameState} */
        this.currentState = null;

        /** @type {Object.<string, new() => GameState>} */
        this.stateCache = {};
    }

    /**
     * Registers a new state
     * @param {GameState} gameStateClass
     */
    registerGameState(gameStateClass) {
        const instance = new gameStateClass();
        const id = instance.getId();
        this.stateCache[id] = gameStateClass;
    }

    /**
     * Creates an instace of a gamestate
     * @param {string} id
     * @returns {GameState}
     */
    getStateInstance(id) {
        if (this.stateCache[id]) return new this.stateCache[id]();
        return null;
    }

    /**
     * Moves to a given state
     * @param {string} id
     * @param {Object} payload
     */
    moveToState(id, payload = {}) {
        if (this.currentState) {
            //Already active state
            if (key === this.currentState.getId()) {
                console.error(`State '${id}' is already active`);
                return false;
            }
            this.currentState.onLeave();

            //Delete current state references
            for (const key in this.currentState) {
                if (!this.currentState.hasOwnProperty(key)) continue;
                delete this.currentState[key];
            }

            //Clear current state
            this.currentState = null;
        }

        //Set current state
        this.currentState = this.getStateInstance(id);
        this.currentState.onInit(this);

        //Clear body
        removeAllChildren(document.body);

        //Set body
        document.body.id = `gameState_${key}`;
        document.body.className = `gameState`;
        document.body.innerHTML = this.currentState.getHtml();

        //Update history
        window.history.pushState({
                id,
            },
            id
        );

        return true;
    }

    /**
     * Returns the current state of the game
     * @returns {GameState}
     */
    getCurrentState() {
        return this.currentState;
    }

    /**
     * Update
     */
    update() {
        this.currentState.update();
    }

    /**
     * Render
     */
    render() {
        this.currentState.render();
    }
}