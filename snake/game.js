import { Snake, Fruit, InputHandler, CollisionChecker } from "/snake/entity.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 10;
const FRUIT_SIZE = 6;
const MIN_WIDTH = 0;
const MIN_HEIGHT = 0;
const MAX_WIDTH = canvas.clientWidth;
const MAX_HEIGHT = canvas.clientHeight;

// min and max possible fruit positions
const FRUIT_START = 2;
const FRUIT_END = 8;
const MIN_FRUIT_WIDTH = MIN_WIDTH + FRUIT_START;
const MAX_FRUIT_WIDTH = MAX_WIDTH - FRUIT_END;
const MIN_FRUIT_HEIGHT = MIN_HEIGHT + FRUIT_START;
const MAX_FRUIT_HEIGHT = MAX_HEIGHT - FRUIT_END;



const gameState = {
    snake: new Snake(),
    fruit: new Fruit(MIN_FRUIT_WIDTH, MAX_FRUIT_WIDTH, MIN_FRUIT_HEIGHT, MAX_FRUIT_HEIGHT, FRUIT_START, FRUIT_END),
    score: 0,
    gameOver: false,
}
const input = new InputHandler();
const cc = new CollisionChecker();
let lastTime = performance.now();

function update(gameState) {
    const snake = gameState.snake;
    const head = snake.segments[0];

    if (input.keys["ArrowUp"]) {
        if (snake.x_axis) {
            snake.x_axis = false;
            snake.is_forward = true;
        }
    }

    if (input.keys["ArrowDown"]) {
        if (snake.x_axis) {
            snake.x_axis = false;
            snake.is_forward = false;
        }
    }

    if (input.keys["ArrowLeft"]) {
        if (!snake.x_axis) {
            snake.x_axis = true;
            snake.is_forward = false;
        }
    }

    if (input.keys["ArrowRight"]) {
        if (!snake.x_axis) {
            snake.x_axis = true;
            snake.is_forward = true;
        }
    }

    if (snake.x_axis) {
        if (snake.is_forward) {
            snake.move(head.x + CELL_SIZE, head.y);
        } else {
            snake.move(head.x - CELL_SIZE, head.y);
        }
    } else {
        if (snake.is_forward) {
            snake.move(head.x, head.y - CELL_SIZE);
        } else {
            snake.move(head.x, head.y + CELL_SIZE);
        }
    }
}

function draw(gameState) {
    // Draw Snake
    ctx.fillStyle = "white";
    const snake = gameState.snake;
    for (let i = 0; i < snake.segments.length; i++) {
        const segment = snake.segments[i];
        ctx.fillRect(segment.x, segment.y, CELL_SIZE, CELL_SIZE);
    }

    // Draw Fruit
    ctx.fillStyle = "red";
    const fruit = gameState.fruit;
    ctx.fillRect(fruit.x, fruit.y, FRUIT_SIZE, FRUIT_SIZE);
}

function checkCollisions(gameState) {
    const snake = gameState.snake;
    const fruit = gameState.fruit;

    if (cc.checkWalls(snake, MIN_WIDTH, MAX_WIDTH) || cc.checkBody(snake)) {
        gameState.gameOver = true;
    }

    if (cc.checkFruit(snake, fruit)) {
        gameState.score++;
        document.getElementById("score").innerText = gameState.score;
        snake.extend();
        fruit.generatePos();
    }
}

export function gameLoop() {
    if (gameState.gameOver) return;

    // const currentTime = performance.now();
    // const deltaTime = (currentTime - lastTime) / 1000;
    // lastTime = currentTime;

    ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    update(gameState);
    checkCollisions(gameState);
    draw(gameState);
}


