const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;

// create the unit

// images
const groundImg = new Image();
groundImg.src = "/img/ground.png";

const foodImg = new Image();
foodImg.src = "/img/food.png";

// audio

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "/audio/dead.mp3";
eat.src = "/audio/eat.mp3";
up.src = "/audio/up.mp3";
right.src = "/audio/right.mp3";
left.src = "/audio/right.mp3";
down.src = "/audio/down.mp3";

let snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box
};

// create the food

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

// create the score var

let score = 0;

//control the snake

let dir;

document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && dir != "RIGHT") {
    left.play();
    dir = "LEFT";
  } else if (key == 38 && dir != "DOWN") {
    dir = "UP";
    up.play();
  } else if (key == 39 && dir != "LEFT") {
    dir = "RIGHT";
    right.play();
  } else if (key == 40 && dir != "UP") {
    dir = "DOWN";
    down.play();
  }
}

// // cheack collision function
function collision(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      return true;
    }
  }
  return false;
}

// draw everything to the canvas

function draw() {
  // void ctx.drawImage(image, dx, dy);
  // void ctx.drawImage(image, dx, dy, dWidth, dHeight);
  ctx.drawImage(groundImg, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "blue" : "red";
    // ctx.fillRect(x, y, width, height);
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  // var food = getRandomFood();
  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // // which direction
  if (dir == "LEFT") snakeX -= box;
  if (dir == "RIGHT") snakeX += box;

  if (dir == "UP") snakeY -= box;
  if (dir == "DOWN") snakeY += box;

  // // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    // new food generate.
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
    // we don't remove the tail
  } else {
    snake.pop();
    // remove the tail
  }

  // // add new Head

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // // game over
  // left se bade mai snakeX < box
  // right ki cond hai snakeX > 17 * box
  // up ki con hai snakeY < 3 * box
  // down ki hai snakeY > 17 * box
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
    setTimeout(location.reload.bind(location), 1000);
  }
  // Javascript arr unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Times New Roman";
  ctx.fillText(score, 2.5 * box, 1.6 * box);
}

// call draw function every 100 ms

let game = setInterval(draw, 100);
