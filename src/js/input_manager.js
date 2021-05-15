/**************************************************
 * Klasse: InputManager
 **************************************************/
export class InputManager {
    constructor() {
        this.keysdown = [];
        this.listeners = {};
        this.listenerId = 0;

        window.addEventListener("keydown", (e) =>
            this.keysdown.push(e.keyCode)
        );

        window.addEventListener("keyup", (e) => {
            this.keysdown.splice(this.keysdown.indexOf(e.keyCode));
            const list = this.listeners[e.keyCode];
            if (list) {
                list.forEach(({ id, listener }) => listener(e.keyCode));
            }
        });
    }

    /**
     * Voer functie uit als toets wordt ingedrukt
     * @param {number} code
     * @param {Function} listener
     * @returns {number}
     */
    addListener(code, listener) {
        if (!this.listeners[code]) this.listeners[code] = [];
        const id = this.listenerId++;
        this.listeners[code].push({
            id: id,
            listener: listener,
        });
        return id;
    }

    /**
     * Verwijder listener
     * @param {number} id
     * @returns {boolean}
     */
    removeListener(id) {
        for (const key in this.listeners) {
            const index = this.listeners[key].findIndex((x) => x.id === id);
            if (index > -1) {
                this.listeners[key].splice(index, 1);
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
