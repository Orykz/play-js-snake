import { gameLoop } from "./snake/game.js";
import { Snake, Fruit, InputHandler, CollisionChecker } from "./snake/entity.js";


const canvas = document.getElementById("gameCanvas");
const CELL_SIZE = 10;
const MIN_WIDTH = 0;
const MAX_WIDTH = canvas.clientWidth;
const MIN_HEIGHT = 0;
const MAX_HEIGHT = canvas.clientHeight;

// Fruit Variables
const START_POS = 2;
const END_POS = 8;
const FRUIT_VARS = {
    size: 6,
    minWidthPos: MIN_WIDTH + START_POS,
    maxWidthPos: MAX_WIDTH - END_POS,
    minHeightPos: MIN_HEIGHT + START_POS,
    maxHeightPos: MAX_HEIGHT - END_POS,
}

function createStartBtn(text) {
    const start = document.getElementById("start");
    const startBtn = document.createElement("button");
    startBtn.textContent = text;
    startBtn.id = "startGame";
    startBtn.addEventListener("click", startGame);
    start.appendChild(startBtn);
}

function deleteStartBtn() {
    const start = document.getElementById("start");
    const startBtn = document.getElementById("startGame");
    if (start && startBtn) {
        start.removeChild(startBtn);
    }
}

function startGame() {
    deleteStartBtn();
    run();
}

function retry() {
    createStartBtn("Retry");
}

function run() {
    const gameState = {
        snake: new Snake(CELL_SIZE),
        fruit: new Fruit(FRUIT_VARS),
        score: 0,
        gameOver: false,
    }
    const settings = {
        input: new InputHandler(),
        cc: new CollisionChecker(),
        ctx: canvas.getContext("2d"),
        cellSize: CELL_SIZE,
        minWidth: MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        minHeight: MIN_HEIGHT,
        maxHeight: MAX_HEIGHT,
    }

    const interval = setInterval(() => {
        gameLoop(gameState, settings);
        if (gameState.gameOver) {
            clearInterval(interval);
            retry();
        }
    }, 1000 / 20);
}


createStartBtn("Start");