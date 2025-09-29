
function update(gameState, input) {
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
            snake.move(head.x + snake.size, head.y);
        } else {
            snake.move(head.x - snake.size, head.y);
        }
    } else {
        if (snake.is_forward) {
            snake.move(head.x, head.y - snake.size);
        } else {
            snake.move(head.x, head.y + snake.size);
        }
    }
}

function draw(gameState, ctx) {
    // Draw Snake
    ctx.fillStyle = "white";
    const snake = gameState.snake;
    for (let i = 0; i < snake.segments.length; i++) {
        const segment = snake.segments[i];
        ctx.fillRect(segment.x, segment.y, snake.size, snake.size);
    }

    // Draw Fruit
    ctx.fillStyle = "red";
    const fruit = gameState.fruit;
    ctx.fillRect(fruit.x, fruit.y, fruit.size, fruit.size);
}

function checkCollisions(gameState, settings) {
    const cc = settings.cc;
    const snake = gameState.snake;
    const fruit = gameState.fruit;

    if (
        cc.checkBoundsX(snake, settings.minWidth, settings.maxWidth) ||
        cc.checkBoundsY(snake, settings.minHeight, settings.maxHeight) ||
        cc.checkBody(snake)
    ) {
        gameState.gameOver = true;
    }

    if (cc.checkFruit(snake, fruit)) {
        gameState.score++;
        document.getElementById("score").innerText = gameState.score;
        snake.extend();
        fruit.generatePos();
    }
}

export function gameLoop(gameState, settings) {
    if (gameState.gameOver) return;

    settings.ctx.clearRect(settings.minWidth, settings.minHeight, settings.maxWidth, settings.maxHeight);
    update(gameState, settings.input);
    checkCollisions(gameState, settings);
    draw(gameState, settings.ctx);
}


