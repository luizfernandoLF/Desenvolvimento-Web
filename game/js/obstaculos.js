
import { getTAMX, getTAMY } from "./config.js";
import { space } from "./space.js";
import { hud } from "./tela.js";
import { getBullets } from "./tiros.js";

const CAMINHO_IMAGEM_EXPLOSAO = "assets/png/laserRedShot.png";
const LARGURA_EXPLOSAO = 50; 
const ALTURA_EXPLOSAO = 50; 
const DURACAO_EXPLOSAO = 150;

const OBSTACLES = [
  { src: "assets/png/enemyUFO.png",    points: 20,  prob: 0.003, width: 50, height: 50 },
  { src: "assets/png/meteorBig.png",  points: 10,  prob: 0.005, width: 80, height: 80 },
  { src: "assets/png/meteorSmall.png",points: 100, prob: 0.002, width: 40, height: 40 },
  { src: "assets/png/enemyShip.png",  points: 50,  prob: 0.003, width: 60, height: 60 }

];
let speedMultiplier = 1;
const obstacles = [];


export const createObstacles = () => {
  const currentTAMX = getTAMX();

  OBSTACLES.forEach((type) => {
    if (Math.random() < type.prob) {
      const el = document.createElement("img"); 
      el.src = type.src;
      el.className = "enemy-ship";
      el.dataset.points = type.points;
      el.style.position = "absolute";  
      if (type.width) el.style.width = `${type.width}px`;
      if (type.height) el.style.height = `${type.height}px`;

      el.style.top = `-${type.height || 40}px`; 

      const enemyWidth = type.width || 40; 
      const randomLeftValue = Math.random() * (currentTAMX - enemyWidth);
      el.style.left = `${randomLeftValue}px`;

      console.log(`Criando IMG ${type.src}: Left = ${el.style.left}, Top = ${el.style.top}, Pontos: ${type.points}`);

      el.dataset.speed = (1.2 + Math.random() * 2 * speedMultiplier).toFixed(2);

      space.element.appendChild(el);
      obstacles.push(el);
    }
  });
};

export const moveObstacles = () => {
  const currentTAMY = getTAMY();

  obstacles.forEach((el, i) => {
    el.style.top = `${parseFloat(el.style.top) + parseFloat(el.dataset.speed)}px`;

    const elRect = el.getBoundingClientRect(); 

    const bulletHit = getBullets().find(b => {
      const bRect = b.getBoundingClientRect();
      return !(
        bRect.right < elRect.left ||
        bRect.left > elRect.right ||
        bRect.bottom < elRect.top ||
        bRect.top > elRect.bottom
      );
    });

    if (bulletHit) {
      const explosion = document.createElement("img");
      explosion.src = CAMINHO_IMAGEM_EXPLOSAO;
      explosion.style.position = "absolute";
      explosion.style.width = `${LARGURA_EXPLOSAO}px`;
      explosion.style.height = `${ALTURA_EXPLOSAO}px`;


      explosion.style.left = `${elRect.left + (elRect.width / 2) - (LARGURA_EXPLOSAO / 2)}px`;
      explosion.style.top = `${elRect.top + (elRect.height / 2) - (ALTURA_EXPLOSAO / 2)}px`;
      
      explosion.style.zIndex = "6"; 

      space.element.appendChild(explosion);

      setTimeout(() => {
        if (explosion.parentNode) {
          explosion.remove();
        }
      }, DURACAO_EXPLOSAO);

      hud.addPoints(parseInt(el.dataset.points));
      bulletHit.remove(); 
      el.remove();        
      obstacles.splice(i, 1);

    } else if (elRect.top > currentTAMY) { 
      el.remove();
      obstacles.splice(i, 1);
    }
  });
};



export const increaseDifficulty = () => {
  speedMultiplier += 0.5;
  console.log(`MINUTO SEGUINTE - DIFICULDADE AUMENTADA: speedMultiplier agora é ${speedMultiplier.toFixed(2)}`);
};