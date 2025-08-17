// Get canvas and 2D drawing context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

// Player object
let player;
let obstacle;
let score;
let gameOver;

function initGame() {
  player = {
    x: 50,
    y: 150,
    width: 30,
    height: 30,
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    grounded: true
  };

  obstacle = {
    x: 600,
    y: 150,
    width: 30,
    height: 30,
    speed: 5
  };

  score = 0;
  gameOver = false;
  restartBtn.style.display = "none"; // hide button
  update();
}

// Draw player
function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw obstacle
function drawObstacle() {
  ctx.fillStyle = "red";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Draw score
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Check collision
function checkCollision() {
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    gameOver = true;
  }
}

// Update game each frame
function update() {
  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over! Score: " + score, 150, 100);
    restartBtn.style.display = "inline-block"; // show button
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen

  // Apply gravity to player
  player.y += player.dy;
  player.dy += player.gravity;

  // Stop player at ground
  if (player.y >= 150) {
    player.y = 150;
    player.dy = 0;
    player.grounded = true;
  }

  // Move obstacle
  obstacle.x -= obstacle.speed;

  // Reset obstacle & increase score
  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = canvas.width;
    score++;
  }

  // Check collision
  checkCollision();

  // Draw everything
  drawPlayer();
  drawObstacle();
  drawScore();

  requestAnimationFrame(update); // keep looping
}

// Jump when Space is pressed
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && player.grounded && !gameOver) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }
});

// Restart button event
restartBtn.addEventListener("click", () => {
  initGame();
});

// Start first game
initGame();
