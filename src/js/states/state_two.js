import { Camera } from "../camera.js";
import { Background } from "../entities/background.js";
import { Door } from "../entities/door.js";
import { Key } from "../entities/items/key.js";
import { PuzzlePart } from "../entities/items/puzzle_part.js";
import { Player } from "../entities/player.js";
import { Puzzle } from "../entities/puzzle.js";
import { Wall } from "../entities/wall.js";
import { State } from "../state.js";

/**************************************************
 * Klasse: StateTwo
 * stateManager (stateManager)
 **************************************************/
export class StateTwo extends State {
    getId() {
        return 1;
    }

    init() {
        //Add room two
    }
}
