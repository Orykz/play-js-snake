const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 10;
const DRAW_SPEED = 500;

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

class Segment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Snake {
    constructor() {
        this.segments = [
            new Segment(300, 300),
            new Segment(290, 300),
            new Segment(280, 300),
            new Segment(270, 300)
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

class collisionChecker {
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
const cc = new collisionChecker();
let gameOver = false;

function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = "white";
    for (let i = 0; i < snake.segments.length; i++) {
        let segment = snake.segments[i];
        ctx.fillRect(segment.x, segment.y, CELL_SIZE, CELL_SIZE);
    }

    let segment = snake.segments[0];
    if (snake.x_axis) {
        if (snake.is_forward) {
            snake.move(segment.x + CELL_SIZE, segment.y);
            if (cc.checkWalls(snake, 0, 600) || cc.checkBody(snake)) {
                gameOver = true;
            }
        } else {
            snake.move(segment.x - CELL_SIZE, segment.y);
            if (cc.checkWalls(snake, 0, 600) || cc.checkBody(snake)) {
                gameOver = true;
            }
        }
    } else {
        if (snake.is_forward) {
            snake.move(segment.x, segment.y - CELL_SIZE);
            if (cc.checkWalls(snake, 0, 600) || cc.checkBody(snake)) {
                gameOver = true;
            }
        } else {
            snake.move(segment.x, segment.y + CELL_SIZE);
            if (cc.checkWalls(snake, 0, 600) || cc.checkBody(snake)) {
                gameOver = true;
            }
        }
    }

    console.log(snake.segments[0].x)
}

draw();

setInterval(() => {
    if (!gameOver) {
        draw();
    }
}, DRAW_SPEED);

