window.addEventListener("projectsLoaded", () => {
    const canvas = document.getElementById("fullpage-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = document.body.scrollWidth;
    canvas.height = document.body.scrollHeight;

    // Snake game variables
    const gridSize = 10;
    const snakeColor = "green";
    const foodColor = "red";

    // Snake game state
    let snake = [{ x: 0, y: 0 }];
    let food = { x: 20, y: 20 };
    let direction = "right";

    // Function to draw the snake
    function drawSnake() {
        ctx.fillStyle = snakeColor;
        snake.forEach((segment) => {
            ctx.fillRect(
                segment.x * gridSize,
                segment.y * gridSize,
                gridSize,
                gridSize
            );
        });
    }

    // Function to draw the food
    function drawFood() {
        ctx.fillStyle = foodColor;
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    // Function to update the game state
    function update() {
        // Move the snake
        const head = { x: snake[0].x, y: snake[0].y };
        switch (direction) {
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
            case "left":
                head.x--;
                break;
            case "right":
                head.x++;
                break;
        }
        snake.unshift(head);

        // Check if the snake ate the food
        if (head.x === food.x && head.y === food.y) {
            // Generate new food
            food.x = Math.floor((Math.random() * canvas.width) / gridSize);
            food.y = Math.floor((Math.random() * canvas.height) / gridSize);
        } else {
            // Remove the tail segment
            snake.pop();
        }

        // Check for game over conditions
        if (
            head.x < 0 ||
            head.x >= canvas.width / gridSize ||
            head.y < 0 ||
            head.y >= canvas.height / gridSize ||
            snake
                .slice(1)
                .some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
            // Game over
            alert("Game over!");
            snake = [{ x: 0, y: 0 }];
            direction = "right";
        }

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the snake and food
        drawSnake();
        drawFood();

        // Schedule the next update
        requestAnimationFrame(update);
    }

    // Event listener for keyboard input
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    });

    // Start the game
    /* update(); */

    update();
});
