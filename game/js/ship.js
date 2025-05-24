import { getTAMX } from "./config.js";
import { space } from "./space.js";

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
];

class Ship {
  constructor() {
    this.element = document.createElement("img");
    this.element.id = "ship";
    this.direction = 1;
    this.element.src = directions[this.direction];
    this.element.style.bottom = "20px";

    space.element.appendChild(this.element);

    this.temporaryDamageTimeout = null;
    this.isPermanentlyDestroyed = false; 
  }

  changeDirection(giro) {
    if (this.isPermanentlyDestroyed) {
      if (giro >= 0 && giro <= 2) this.direction = giro;
      return;
    }

    if (this.temporaryDamageTimeout !== null) {
      clearTimeout(this.temporaryDamageTimeout);
      this.temporaryDamageTimeout = null;
    }

    if (giro >= 0 && giro <= 2) {
      this.direction = giro;
      this.element.src = directions[this.direction];
    }
  }

  damage() {
    if (this.isPermanentlyDestroyed) return;

    this.element.src = "assets/png/playerDamaged.png";

    clearTimeout(this.temporaryDamageTimeout);
    this.temporaryDamageTimeout = setTimeout(() => {

      if (!this.isPermanentlyDestroyed) {
        this.element.src = directions[this.direction];
      }
      this.temporaryDamageTimeout = null;
    }, 5000); 
  }

  setFinalDamageState() {
    this.isPermanentlyDestroyed = true;
    clearTimeout(this.temporaryDamageTimeout); 
    this.temporaryDamageTimeout = null;
    this.element.src = "assets/png/playerDamaged.png"; 
  }


  resetStateForNewGame() {
    this.direction = 1;
    this.isPermanentlyDestroyed = false;
    clearTimeout(this.temporaryDamageTimeout);
    this.temporaryDamageTimeout = null;
    this.element.src = directions[this.direction];
  }

  move() {
    if (this.isPermanentlyDestroyed) return;

    const left = parseInt(this.element.style.left);
    const currentTAMX = getTAMX();
    if (this.direction === 0 && left > 0) { 
      this.element.style.left = `${left - 5}px`;
    }
    if (this.direction === 2 && left < currentTAMX - 80) { 
      this.element.style.left = `${left + 5}px`;
    }
  }
}

export const ship = new Ship();