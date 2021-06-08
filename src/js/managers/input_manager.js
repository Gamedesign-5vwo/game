import { Entity } from '../entity.js';
import { GameManager } from './game_manager.js';

/**************************************************
 * Klasse: InputManager
 * gameManager (game manager)
 **************************************************/
export class InputManager {
    /**
     * @param {GameManager} gameManager
     */
    constructor(gameManager) {
        this.gameManager = gameManager;

        this.keysdown = [];
        this.keyListener = {};
        this.keyListenerId = 0;

        this.mouseListeners = {
            up: [],
            down: [],
            click: [],
        };
        this.mouseListenerId = 0;

        window.addEventListener('keydown', (e) =>
            this.keysdown.push(e.keyCode)
        );

        window.addEventListener('keyup', (e) => {
            this.keysdown.splice(this.keysdown.indexOf(e.keyCode));
            const list = this.keyListener[e.keyCode];
            if (list) {
                list.forEach(({ id, keyListener }) => keyListener(e.keyCode));
            }
        });

        window.addEventListener('mousedown', (e) => {
            const data = this.getDataFromMouse(e);
            this.mouseListeners.down.forEach(({ id, mouseListener }) => {
                mouseListener(data.x, data.y, data.entities, e);
            });
        });

        window.addEventListener('mouseup', (e) => {
            const data = this.getDataFromMouse(e);
            this.mouseListeners.up.forEach(({ id, mouseListener }) => {
                mouseListener(data.x, data.y, data.entities, e);
            });
        });

        window.addEventListener('click', (e) => {
            const data = this.getDataFromMouse(e);
            this.mouseListeners.click.forEach(({ id, mouseListener }) => {
                mouseListener(data.x, data.y, data.entities, e);
            });
        });
    }

    /**
     * @param {MouseEvent} mouseEvent
     */
    getDataFromMouse(mouseEvent) {
        const x =
            mouseEvent.clientX -
            this.gameManager.spelbord.parentElement.offsetLeft +
            this.gameManager.spelbord.parentElement.clientWidth / 2 -
            this.gameManager.camera.x;
        const y =
            mouseEvent.clientY -
            this.gameManager.spelbord.parentElement.offsetTop +
            this.gameManager.spelbord.parentElement.clientHeight / 2 -
            this.gameManager.camera.y;

        const entities = this.gameManager.entityManager.entities.filter(
            (entity) =>
                entity.left <= x &&
                entity.right >= x &&
                entity.top <= y &&
                entity.bottom >= y
        );

        return { x, y, entities };
    }

    /**
     * Voer functie uit als toets wordt ingedrukt
     * @param {number} code
     * @param {Function} keyListener
     * @returns {number}
     */
    addKeyListener(code, keyListener) {
        if (!this.keyListener[code]) this.keyListener[code] = [];
        const id = this.keyListenerId++;
        this.keyListener[code].push({
            id: id,
            keyListener: keyListener,
        });
        return id;
    }

    /**
     * Verwijder keyListener
     * @param {number} id
     * @returns {boolean}
     */
    removeKeyListener(id) {
        for (const key in this.keyListener) {
            const index = this.keyListener[key].findIndex((x) => x.id === id);
            if (index > -1) {
                this.keyListener[key].splice(index, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * @callback mouseListener
     * @param {number} x
     * @param {number} y
     * @param {Array<Entity>} entities
     * @param {MouseEvent} event
     */

    /**
     * Voer functie uit als muis actie
     * @param {string} action
     * @param {mouseListener} mouseListener
     * @returns {number}
     */
    addMouseListener(action, mouseListener) {
        if (!this.mouseListeners[action]) return null;

        const id = this.keyListenerId++;
        this.mouseListeners[action].push({
            id: id,
            mouseListener: mouseListener,
        });
        return id;
    }

    /**
     * Verwijder mouseListener
     * @param {number} id
     * @returns {boolean}
     */
    removeMouseListener(id) {
        for (const key in this.mouseListeners) {
            const index = this.mouseListeners[key].findIndex(
                (x) => x.id === id
            );
            if (index > -1) {
                this.mouseListeners[key].splice(index, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * @param {number} code
     * @returns {boolean}
     */
    isKeydown(code) {
        return this.keysdown.includes(code);
    }
}
