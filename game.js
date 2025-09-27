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


const snake = new Snake();

function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.fillStyle = "white";
    for (let i = 0; i < snake.segments.length; i++) {
        let segment = snake.segments[i];
        ctx.fillRect(segment.x, segment.y, CELL_SIZE, CELL_SIZE);
    }

    let segment = snake.segments[0];
    if (snake.x_axis) {
        if (snake.is_forward) {
            snake.move(segment.x + CELL_SIZE, segment.y);
        } else {
            snake.move(segment.x - CELL_SIZE, segment.y);
        }
    } else {
        if (snake.is_forward) {
            snake.move(segment.x, segment.y - CELL_SIZE);
        } else {
            snake.move(segment.x, segment.y + CELL_SIZE);
        }
    }
}


draw();

setInterval(() => {
    draw();
}, DRAW_SPEED);

