/**************************************************
 * Constanten
 *
 * Hieronder de variabelen die in het gehele
 * spel dezelfde waarden houden
 **************************************************/
/**************************************************
 * Globale variabelen
 *
 * Dit zijn variabelen die in het
 * gehele spel beschikbaar zijn
 **************************************************/
/**
 * @type {HTMLCanvasElement}
 */
var spelbord;

/**
 * @type {CanvasRenderingContext2D}
 */
var ctx;

/**
 * @type {Background}
 */
var achtergrond;

/**
 * @type {Camera}
 */
var camera;

/**
 * @type {EntityManager}
 */
var entityManager;

/**************************************************
 * Event listeners
 *
 * Een event listener is een stukje programma dat
 * reageert op een gebeurtenis.
 * Bijvoorbeeld het aanraken van een toets.
 **************************************************/
/**************************************************
 * Klassen
 *
 * Klassen zijn de bouwstenen van het spel.
 * Bijvoorbeeld een achtergrond, poppetjes, blokjes
 * autootjes en wat je maar wilt.
 * Hieronder een klasse om de achtergrond te tekenen.
 **************************************************/
import { Player } from "./entities/player.js";
import { Background } from "./background.js";
import { InputManager } from "./input_manager.js";
import { Camera } from "./camera.js";
import { Wall } from "./entities/wall.js";
import { PuzzlePart } from "./entities/items/puzzle_part.js";
import { Puzzle } from "./entities/puzzle.js";
import { Key } from "./entities/items/key.js";
import { EntityManager } from "./entity_manager.js";

/**************************************************
 * Game loop
 **************************************************/
/**
 * Update alle objecten, maak het spelbord schoon,
 * teken de elementen opnieuw en herhaal de game loop.
 */
function gameloop() {
    update();
    clearSpelbord();
    render(ctx);
    requestAnimationFrame(gameloop);
}

/**
 * Ververst de (waarden van de) objecten.
 */
function update() {
    entityManager.update();
}

// canvas schoonmaken
function clearSpelbord() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative
    ctx.clearRect(0, 0, spelbord.width, spelbord.height);
}

/**
 * De render functie tekent het canvas opnieuw met daarin de objecten
 * @param {CanvasRenderingContext2D} ctx
 */
function render(ctx) {
    // camera.render(ctx);
    achtergrond.render(ctx);
    entityManager.render(ctx);
}

/**************************************************
 * Initialisatie
 *
 * Hier begint dan het eigenlijke programma zodra de
 * webpagina in de browser geladen is
 **************************************************/
window.onload = function () {
    const inputManager = new InputManager();

    // Het canvas element voor het spelbord ophalen
    spelbord = /** @type {HTMLCanvasElement} */ (
        document.getElementById("game")
    );

    // De context van het spelbord opvragen
    ctx = spelbord.getContext("2d");

    entityManager = new EntityManager();

    // De achtergrond
    achtergrond = new Background(0, 0, 1025, 725, "#c2b280");

    //Add enities
    let player = new Player(50, 50, "red", inputManager, entityManager);

    entityManager.add(
        new Puzzle(
            25 * 3,
            25 * 3,
            player,
            new Key(25 * 3, 25 * 3, "level_1"),
            entityManager,
            [5, 6]
        )
    );
    entityManager.add(new PuzzlePart(25 * 6, 25 * 6, 0));
    entityManager.add(new PuzzlePart(25 * 8, 25 * 6, 1));
    entityManager.add(new PuzzlePart(25 * 9, 25 * 7, 2));
    entityManager.add(new PuzzlePart(25 * 10, 25 * 5, 3));
    entityManager.add(new PuzzlePart(25 * 12, 25 * 7, 4));
    entityManager.add(new PuzzlePart(25 * 14, 25 * 9, 7));
    entityManager.add(new PuzzlePart(25 * 7, 25 * 2, 8));

    entityManager.add(player);

    //Walls
    //boven
    entityManager.add(new Wall(0, 0, 41, 1, "blue"));
    //onder
    entityManager.add(new Wall(0, 25 * 28, 41, 1, "blue"));
    //links
    entityManager.add(new Wall(0, 25, 1, 27, "blue"));
    //rechts
    entityManager.add(new Wall(25 * 40, 25, 1, 27, "blue"));

    //Camera
    camera = new Camera(player);

    // start de game loop
    gameloop();
};
