import { gameLoop } from "/snake/game.js";

setInterval(() => {
    gameLoop();
}, 1000 / 20);