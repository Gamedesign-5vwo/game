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
var spelbord;
var ctx;
var achtergrond;
var camera;
var entities = [];

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
    for (let i = 0; i < entities.length; i++) {
        entities[i].update();
    }
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
    for (let i = 0; i < entities.length; i++) {
        entities[i].render(ctx);
    }
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
    spelbord = document.getElementById("game");
    // De context van het spelbord opvragen
    ctx = spelbord.getContext("2d");

    // De achtergrond
    achtergrond = new Background(0, 0, 1025, 725, "#c2b280");

    //Add enities
    let player = new Player(50, 50, "red", inputManager, entities);

    entities.push(
        new Puzzle(
            25 * 3,
            25 * 3,
            player,
            new Key(25 * 3, 25 * 3, "level_1"),
            entities,
            [5, 6]
        )
    );
    entities.push(player);
    entities.push(new PuzzlePart(25 * 6, 25 * 6, 0));
    entities.push(new PuzzlePart(25 * 8, 25 * 6, 1));
    entities.push(new PuzzlePart(25 * 9, 25 * 7, 2));
    entities.push(new PuzzlePart(25 * 10, 25 * 5, 3));
    entities.push(new PuzzlePart(25 * 12, 25 * 7, 4));
    entities.push(new PuzzlePart(25 * 14, 25 * 9, 7));
    entities.push(new PuzzlePart(25 * 7, 25 * 2, 8));

    //Walls
    //boven
    entities.push(new Wall(0, 0, 41, 1, "blue"));
    //onder
    entities.push(new Wall(0, 25 * 28, 41, 1, "blue"));
    //links
    entities.push(new Wall(0, 25, 1, 27, "blue"));
    //rechts
    entities.push(new Wall(25 * 40, 25, 1, 27, "blue"));

    //Camera
    camera = new Camera(player);

    // start de game loop
    gameloop();
};
