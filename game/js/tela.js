const scoreEl = document.getElementById("score")
const livesEl = document.getElementById("lives")
const lifeImg = "assets/png/life.png"

let score = 0
let lives = 3

export const hud = {
  reset() {
    score = 0
    lives = 3
    this.update()
  },
  addPoints(points) {
    score += points
    this.update()
  },
  loseLife() {
    lives--
    this.update()
    return lives
  },
  update() {
    scoreEl.textContent = `Score: ${score}`
    livesEl.innerHTML = ""
    for (let i = 0; i < lives; i++) {
      const img = document.createElement("img")
      img.src = lifeImg
      livesEl.appendChild(img)
    }
  },
  getScore() {
    return score
  }
}
