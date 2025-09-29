const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 10;
const FRUIT_SIZE = 6;
const DRAW_SPEED = 500;
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

document.addEventListener("keyup", (e) => {
    console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            snake.x_axis = false;
            snake.is_forward = true;
            break;
        case "ArrowDown":
            snake.x_axis = false;
            snake.is_forward = false;
            break;
        case "ArrowLeft":
            snake.x_axis = true;
            snake.is_forward = false;
            break;
        case "ArrowRight":
            snake.x_axis = true;
            snake.is_forward = true;
            break;
    }
});

class Fruit {
    constructor() {
        this.generatePos();
    }

    generatePos() {
        this.x = this.generateNum(MIN_FRUIT_WIDTH, MAX_FRUIT_WIDTH);
        this.y = this.generateNum(MIN_FRUIT_HEIGHT, MAX_FRUIT_HEIGHT);
    }

    generateNum(min, max) {
        const numRange = (max - min) / 10;
        const randomNum = Math.floor(Math.random() * (numRange + 1));
        const result = min + randomNum * 10;

        return result;
    }
}

class Segment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Snake {
    constructor() {
        // snake starts with 4 segments
        this.segments = [
            new Segment(200, 200),
            new Segment(190, 200),
            new Segment(180, 200),
            new Segment(170, 200)
        ];
        this.x_axis = true;
        this.is_forward = true;
    }

    extend(x, y) {
        this.segments.unshift(new Segment(x, y));
    }

    move(x, y) {
        this.segments.unshift(new Segment(x, y));
        this.segments.pop();
    }
}

class InputHandler {
    constructor() {
        this.keys = {};
        window.addEventListener("keydown", e => this.keys[e.key] = true);
        window.addEventListener("keyup", e => this.keys[e.key] = false);
    }
}

class CollisionChecker {
    checkWalls(snake, minBounds, maxBounds) {
        const head = snake.segments[0];
        return (head.x < minBounds || head.x >= maxBounds) || (head.y < minBounds || head.y >= maxBounds);
    }

    checkBody(snake) {
        const segments = snake.segments;
        const head = segments[0];

        for (let i = 1; i < segments.length; i++) {
            if (head.x === segments[i].x && head.y === segments[i].y) {
                return true;
            }
        }
        return false;
    }

    checkFruit(snake, fruit) {
        const head = snake.segments[0];
        return head.x + FRUIT_START === fruit.x && head.y + FRUIT_START === fruit.y;
    }
}

const gameState = {
    snake: new Snake(),
    fruit: new Fruit(),
    score: 0,
    gameOver: false,
}
const input = new InputHandler();
const cc = new CollisionChecker();

let gameOver = false;
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

    console.log()
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
        fruit.generatePos();
    }
}

function gameLoop() {
    if (gameState.gameOver) return;

    // const currentTime = performance.now();
    // const deltaTime = (currentTime - lastTime) / 1000;
    // lastTime = currentTime;

    ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    update(gameState);
    checkCollisions(gameState);
    draw(gameState);
}

setInterval(() => {
    gameLoop();
}, 1000 / 20);
