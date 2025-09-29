import { gameLoop } from "/snake/run_game.js";

setInterval(() => {
    gameLoop();
}, 1000 / 20);