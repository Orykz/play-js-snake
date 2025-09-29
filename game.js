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
const MIN_FRUIT_WIDTH = MIN_WIDTH + 2;
const MAX_FRUIT_WIDTH = MAX_WIDTH - 8;
const MIN_FRUIT_HEIGHT = MIN_HEIGHT + 2;
const MAX_FRUIT_HEIGHT = MAX_HEIGHT - 8;

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
}


const snake = new Snake();
const cc = new CollisionChecker();
const f = new Fruit();
let gameOver = false;

function draw() {
    ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    ctx.fillStyle = "white";
    for (let i = 0; i < snake.segments.length; i++) {
        let segment = snake.segments[i];
        ctx.fillRect(segment.x, segment.y, CELL_SIZE, CELL_SIZE);
    }

    let segment = snake.segments[0];
    if (snake.x_axis) {
        if (snake.is_forward) {
            snake.move(segment.x + CELL_SIZE, segment.y);
            if (cc.checkWalls(snake, MIN_WIDTH, MAX_WIDTH) || cc.checkBody(snake)) {
                gameOver = true;
            }
        } else {
            snake.move(segment.x - CELL_SIZE, segment.y);
            if (cc.checkWalls(snake, MIN_HEIGHT, MAX_HEIGHT) || cc.checkBody(snake)) {
                gameOver = true;
            }
        }
    } else {
        if (snake.is_forward) {
            snake.move(segment.x, segment.y - CELL_SIZE);
            if (cc.checkWalls(snake, MIN_WIDTH, MAX_WIDTH) || cc.checkBody(snake)) {
                gameOver = true;
            }
        } else {
            snake.move(segment.x, segment.y + CELL_SIZE);
            if (cc.checkWalls(snake, MIN_HEIGHT, MAX_HEIGHT) || cc.checkBody(snake)) {
                gameOver = true;
            }
        }
    }

    // Fruit creation
    ctx.fillStyle = "red";
    ctx.fillRect(f.x, f.y, FRUIT_SIZE, FRUIT_SIZE);
}

draw();

setInterval(() => {
    if (!gameOver) {
        draw();
    }
}, DRAW_SPEED);

