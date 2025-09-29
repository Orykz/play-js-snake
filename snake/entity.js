class Segment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


export class Snake {
    constructor(size) {
        this.size = size;
        this.segments = [
            new Segment(200, 200),
            new Segment(190, 200),
            new Segment(180, 200),
            new Segment(170, 200)
        ];
        this.x_axis = true;
        this.is_forward = true;
        this.tail = this.segments[this.segments.length - 1];
    }

    extend() {
        this.segments.push(this.tail);
    }

    move(x, y) {
        this.segments.unshift(new Segment(x, y));
        this.tail = this.segments.pop();
    }
}

export class Fruit {
    constructor(fruitVar) {
        this.size = fruitVar.size;
        this.minWidth = fruitVar.minWidthPos;
        this.maxWidth = fruitVar.maxWidthPos;
        this.minHeight = fruitVar.minHeightPos;
        this.maxHeight = fruitVar.maxHeightPos;
        this.generatePos();
    }

    generatePos() {
        this.x = this.generateNum(this.minWidth, this.maxWidth);
        this.y = this.generateNum(this.minHeight, this.maxHeight);
    }

    generateNum(min, max) {
        const numRange = (max - min) / 10;
        const randomNum = Math.floor(Math.random() * (numRange + 1));
        const result = min + randomNum * 10;

        return result;
    }
}


export class InputHandler {
    constructor() {
        this.keys = {};
        window.addEventListener("keydown", e => this.keys[e.key] = true);
        window.addEventListener("keyup", e => this.keys[e.key] = false);
    }
}

export class CollisionChecker {
    checkBoundsX(snake, minBounds, maxBounds) {
        const head = snake.segments[0];
        return head.x < minBounds || head.x >= maxBounds;
    }

    checkBoundsY(snake, minBounds, maxBounds) {
        const head = snake.segments[0];
        return head.y < minBounds || head.y >= maxBounds;
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
        return head.x + fruit.minWidth === fruit.x && head.y + fruit.minHeight === fruit.y;
    }
}