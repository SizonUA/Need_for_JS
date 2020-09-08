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
};

// Function
const startGame = () => {
  start.classList.add("hide");
  setting.start = true;
  gameArea.appendChild(car);
  requestAnimationFrame(playGame);
};

const playGame = () => {
  console.log("playGame: ", playGame);

  if (setting.start) {
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

// Event Listener
start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);
