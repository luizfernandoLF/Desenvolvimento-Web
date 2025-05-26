import { FPS, getTAMX } from "./config.js";
import { space } from "./space.js";
import { ship } from "./ship.js";
import { createBullet, moveBullets } from "./tiros.js";
import { createObstacles, moveObstacles, increaseDifficulty } from "./obstaculos.js";
import { hud } from "./tela.js";

let paused = true;
let gameOver = false;
let gameHasStartedOnce = false;
let spacebarPressionadaAtualmente = false;

const gameOverEl = document.getElementById("game-over");
const restartBtn = document.getElementById("restart");

const keyStates = {
  arrowLeft: false,
  arrowRight: false,
};

function updateShipDirection() {

  if (gameOver) {
    ship.direction = 1;
    return;
  }

  if (paused) {
    ship.changeDirection(1);
    return;
  }

  // Lógica normal de mudança de direção se não estiver pausado nem game over
  if (keyStates.arrowRight && !keyStates.arrowLeft) {
    ship.changeDirection(2);
  } else if (keyStates.arrowLeft && !keyStates.arrowRight) {
    ship.changeDirection(0);
  } else {
    ship.changeDirection(1);
  }
}

function init() {
  hud.reset();
  ship.resetStateForNewGame(); 
  ship.element.style.left = `${getTAMX() / 2 - 50}px`;

  paused = true;
  gameOver = false;
  gameHasStartedOnce = false;
  spacebarPressionadaAtualmente = false;
  keyStates.arrowLeft = false;
  keyStates.arrowRight = false;
 

  gameOverEl.classList.add("hidden");
  setInterval(run, 1000 / FPS);
  setInterval(() => {
    if (!paused && !gameOver && gameHasStartedOnce) {
      increaseDifficulty();
    }
  }, 60000);
}

function checkCollisions() {

  if (gameOver) return;

  const shipRect = ship.element.getBoundingClientRect();
  document.querySelectorAll(".enemy-ship").forEach((obst) => {
 
    if (!obst.parentNode) return;

    const obstRect = obst.getBoundingClientRect();
    const intersect = !(
      obstRect.bottom < shipRect.top ||
      obstRect.top > shipRect.bottom ||
      obstRect.right < shipRect.left ||
      obstRect.left > shipRect.right
    );

    if (intersect) {
      obst.remove();
      const remaining = hud.loseLife();

      if (remaining > 0) {
        ship.damage(); 
      } else {
        // Perdeu a última vida
        paused = true;
        gameOver = true;
        ship.setFinalDamageState(); 

        keyStates.arrowLeft = false;
        keyStates.arrowRight = false;
        gameOverEl.classList.remove("hidden");
      }
    }
  });
}


window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === "p") {
    if (gameOver) return;
    if (gameHasStartedOnce) {
      paused = !paused;
      if (paused) {
        keyStates.arrowLeft = false;
        keyStates.arrowRight = false;
      }
      updateShipDirection(); 
    }
    return;
  }

  if (key === " ") {
    if (gameOver) return;

    if (!gameHasStartedOnce && paused) {
      paused = false;
      gameHasStartedOnce = true;
      updateShipDirection();
    } else if (gameHasStartedOnce && !paused) {
      if (!spacebarPressionadaAtualmente) {
        createBullet(parseInt(ship.element.style.left) + 40);
        spacebarPressionadaAtualmente = true;
      }
    }
    return;
  }

  if (paused || gameOver) return;

  let directionChanged = false;
  if (key === "arrowleft") {
    if (!keyStates.arrowLeft) {
      keyStates.arrowLeft = true;
      directionChanged = true;
    }
  } else if (key === "arrowright") {
    if (!keyStates.arrowRight) {
      keyStates.arrowRight = true;
      directionChanged = true;
    }
  }

  if (directionChanged) {
    updateShipDirection();
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();

  let directionPotentiallyChanged = false;
  if (key === "arrowleft") {
    if (keyStates.arrowLeft) {
      keyStates.arrowLeft = false;
      directionPotentiallyChanged = true;
    }
  } else if (key === "arrowright") {
    if (keyStates.arrowRight) {
      keyStates.arrowRight = false;
      directionPotentiallyChanged = true;
    }
  }

  if (directionPotentiallyChanged) {
    updateShipDirection();
  }

  if (key === " ") {
    spacebarPressionadaAtualmente = false;
  }
});

restartBtn.addEventListener("click", () => {
  location.reload();
});

function run() {
  if (paused || gameOver) return;
  space.move();
  ship.move();
  createObstacles();
  moveObstacles();
  moveBullets();
  checkCollisions();
}

init();
