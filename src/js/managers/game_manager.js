import { Camera } from "../camera.js";
import { Background } from "../entities/background.js";
import { Player } from "../entities/player.js";
import { Lifes } from "../hud/lifes.js";
import { SplashScreen } from "../hud/splash_screen.js";
import { Timer } from "../hud/timer.js";
import { Room } from "../room.js";
import { MazeRoomOne } from "../rooms/maze_room_one.js";
import { PuzzleRoom } from "../rooms/puzzle_room.js";
import { RoomCrossingTheRoad } from "../rooms/room_crossing_the_road.js";
import { RoomHallway } from "../rooms/room_hallway.js";
import { EntityManager } from "./entity_manager.js";
import { HudManager } from "./hud_manager.js";
import { InputManager } from "./input_manager.js";

export class GameManager {
    constructor(spelbord) {
        /**
         * @type {HTMLCanvasElement}
         */
        this.spelbord = spelbord;

        /**
         * @type {boolean}
         */
        this.started = false;

        /**
         * @type {boolean}
         */
        this.gameOver = false;

        /**
         * @type {boolean}
         */
        this.won = false;

        /**
         * @type {number}
         */
        this.lifes = 3;

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
        this.inputManager = new InputManager(this);

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
         * @type {Background}
         */
        this.crossingTheRoad;

        /**
         * @type {Array<Room>}
         */
        this.rooms = [
            new PuzzleRoom(this, 0, 0),
            new RoomHallway(this, 25 * 40, 25 * -4),
            new MazeRoomOne(this, 25 * 30, 25 * 33),
            new RoomCrossingTheRoad(this, 25 * 30, 25 * -70),
        ];

        for (let i = 0; i < this.rooms.length; i++) {
            this.rooms[i].init();
        }

        this.setState(1);

        // Levens updaten vanuit link
        const lifes = new URL(window.location.href).searchParams.get("lifes");
        if (lifes) {
            // Pak het nummer uit de link als dat niet lukt maak het 3
            this.lifes = Number.parseInt(lifes) || 3;
        }

        const start = document.getElementById("start");
        if (this.lifes !== 3) {
            // Als al een keer gespeeld is geen intro en heb ook nog geluid
            start.remove();
            this.start();
        } else {
            // Intro wanneer er op start is gedrukt (moet omdat we audio willen afspelen)
            start.addEventListener("click", () => {
                start.remove();
                const introSound = new Audio("./media/zandkasteel_intro.mp3");
                introSound.volume = 0.3;
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
                            this.start();
                        }
                    )
                );
            });
        }
    }

    // Start
    start() {
        // Start timer na splash screen
        this.hudManager.add(
            new Timer(this, 60 * 5, () => {
                this.setGameOver();
            })
        );
        this.hudManager.add(new Lifes(this));

        // Start achtergrond muziek
        const music = new Audio("./media/background.mp3");
        music.volume = 0.1;
        music.play();

        this.music = music;

        this.started = true;
    }

    // Doe gewonnen
    setWon() {
        this.won = true;
        this.music.pause();

        const introSound = new Audio("./media/zandkasteel_intro.mp3");
        introSound.addEventListener("ended", () => {
            introSound.play();
        });
        introSound.volume = 0.3;
        introSound.play();

        this.hudManager.add(
            new SplashScreen(
                this,
                [
                    "Gefeliciteerd je bent van het eiland afgekomen zonder onder water komen te staan! Je bent nu weer veilig terug bij de andere inwoners van het zandkasteel.",
                ],
                10,
                "./images/gewonnen.png",
                () => {
                    this.hudManager.add(
                        new SplashScreen(
                            this,
                            [
                                "Waarom ben je nog steeds hier. Je hebt al gewonnen hoor!",
                            ],
                            60 * 2,
                            "./images/gewonnen.png",
                            () => {}
                        )
                    );
                },
                60 * 1
            )
        );
    }

    /**
     * Doe game over
     */
    setGameOver() {
        const canRetry = this.lifes === 1 ? false : true;

        this.gameOver = true;
        this.music.pause();

        this.hudManager.add(
            new SplashScreen(
                this,
                [
                    `Helaas, je hebt het niet gehaald. Het water is te hoog, je bent game over. ${
                        canRetry
                            ? "Begin nu opnieuw."
                            : "Al je levens zijn op en je bent verdronken."
                    }`,
                ],
                5,
                "./images/gameover.png",
                () => {
                    if (!canRetry) {
                        return;
                    }
                    const url = new URL(window.location.href);
                    url.searchParams.set("lifes", (this.lifes - 1).toString());
                    window.location.href = url.href;
                },
                60
            )
        );
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
