import { Camera } from "../camera.js";
import { Player } from "../entities/player.js";
import { SplashScreen } from "../hud/splash_screen.js";
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
         * @type {boolean}
         */
        this.started = false;

        /**
         * @type {number}
         */
        this.currentState;

        /**
         * @type {number}
         */
        this.lastTime = Date.now();

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

        this.setState(0);

        // Intro wanneer er op start is gedrukt (moet omdat we audio willen afspelen)
        const start = document.getElementById("start");
        start.addEventListener("click", () => {
            start.remove();
            const introSound = new Audio("./media/zandkasteel_intro.mp3");
            introSound.play();
            this.hudManager.add(
                new SplashScreen(
                    this,
                    [
                        "Hallo bewoner van het Zandkasteel!",
                        "Er is een probleem. Het water staat hoog en gaat binnenkort het zandkasteel overstromen.",
                        "De rest van het zandkasteel is al lang weg alleen jij hebt je verslapen en ligt nog in je bed. Het water is bijna hier dus je moet hier zo snel mogelijk weg!",
                        "Daarvoor moet je eerst door een paar kamers heen. De deur van je slaapkamer zit op slot dus je moet eerst de sleutel vinden.",
                        "Je hebt nog 5 minuten om van het eiland af te komen dus schiet op! Als de 5 minuten om zijn moet je namelijk weer opnieuw beginnen.",
                        "Je mag drie pogingen doen, daarna ben je game over. Je speelt met de toetsen WASD en je pakt dingen op met de toets E. Als je wilt springen over rotsen doe je dat met je muis.",
                        "Veel plezier!",
                    ],
                    5,
                    "./images/welkom.png",
                    () => {
                        // Start timer na splash screen
                        this.hudManager.add(new Timer(this, 60 * 5));

                        // Start achtergrond muziek
                        const music = new Audio("./media/background.mp3");
                        music.volume = 0.3;
                        music.play();

                        this.started = true;
                    }
                )
            );
        });
    }

    /**
     * @param {number} state
     */
    setState(state) {
        this.currentState = state;
    }

    update() {
        const dt = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        this.camera.update();
        this.entityManager.update(dt);
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
