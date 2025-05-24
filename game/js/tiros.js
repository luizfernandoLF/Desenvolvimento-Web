import { space } from "./space.js";
import { getTAMY } from "./config.js"; 

const bullets = [];

const LARGURA_LASER_VERDE = 10; 
export const createBullet = (centroXNave) => {
  const bullet = document.createElement("img"); 
  bullet.className = "bullet"; 
  bullet.src = "assets/png/laserRed.png"; 

  bullet.style.left = `${centroXNave - (LARGURA_LASER_VERDE / 2)}px`;

  bullet.style.bottom = "60px"; 

  space.element.appendChild(bullet);
  bullets.push(bullet);
};

export const moveBullets = () => {
  const alturaTela = getTAMY(); 
  bullets.forEach((b, index) => {
    b.style.bottom = `${parseInt(b.style.bottom) + 20}px`; 

    if (parseInt(b.style.bottom) > alturaTela) {
      b.remove();
      bullets.splice(index, 1);
    }
  });
};

export const getBullets = () => bullets;