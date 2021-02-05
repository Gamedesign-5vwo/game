import { GameState } from "../core/game_state";

export class MainMenuState extends GameState {
    constructor() {
        super("MainMenu");
    }

    getHtml() {
        return `test`;
    }
}