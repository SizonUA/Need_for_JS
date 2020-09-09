const score = document.querySelector(".score"),
  start = document.querySelector(".start"),
  gameArea = document.querySelector(".game-area"),
  car = document.createElement("div");

car.classList.add("car");

// Object
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3,
};

// Function
const getQuantityElements = (heightElement) => {
  return document.documentElement.clientHeight / heightElement + 1;
};

const startGame = () => {
  start.classList.add("hide");

  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.style.top = i * 100 + "px";
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.background = "transparent url(\"./image/enemy2.png\") center / cover no-repeat";
    gameArea.appendChild(enemy);
  }

  setting.start = true;
  gameArea.appendChild(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
};

const playGame = () => {
  if (setting.start) {
    moveRoad();
    moveEnemy();

    if (keys.ArrowLeft && setting.x > 3) {
      setting.x -= setting.speed;
    }
    if (
      keys.ArrowRight &&
      setting.x < gameArea.offsetWidth - car.offsetWidth - 3
    ) {
      setting.x += setting.speed;
    }
    if (
      keys.ArrowDown &&
      setting.y < gameArea.offsetHeight - car.offsetHeight - 10
    ) {
      setting.y += setting.speed;
    }
    if (keys.ArrowUp && setting.y > 10) {
      setting.y -= setting.speed;
    }

    car.style.left = setting.x + "px";
    car.style.top = setting.y + "px";

    requestAnimationFrame(playGame);
  }
};

const startRun = (event) => {
  const key = event.key;
  event.preventDefault();
  keys[key] = true;
};

const stopRun = (event) => {
  const key = event.key;
  event.preventDefault();
  keys[key] = false;
};

const moveRoad = () => {
  let lines = document.querySelectorAll(".line");

  lines.forEach((line) => {
    line.y += setting.speed;
    line.style.top = line.y + "px";

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
};

const moveEnemy = () => {
  let enemys = document.querySelectorAll(".enemy");

  enemys.forEach((enemy) => {
    enemy.y += setting.speed / 2;
    enemy.style.top = enemy.y + "px";

    if (enemy.y >= document.documentElement.clientHeight) {
      enemy.y = -100 * setting.traffic;
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    }
  });
};

// Event Listener
start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);
