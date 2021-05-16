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
 * @type {GameManager}
 */
var gameManager;

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
import { GameManager } from "./managers/game_manager.js";

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
    gameManager.update();
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
    gameManager.render(ctx);
}

/**************************************************
 * Initialisatie
 *
 * Hier begint dan het eigenlijke programma zodra de
 * webpagina in de browser geladen is
 **************************************************/
window.onload = function () {
    // Het canvas element voor het spelbord ophalen
    spelbord = /** @type {HTMLCanvasElement} */ (
        document.getElementById("game")
    );

    // De context van het spelbord opvragen
    ctx = spelbord.getContext("2d");

    gameManager = new GameManager();

    // start de game loop
    gameloop();
};
