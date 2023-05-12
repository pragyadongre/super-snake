

// Game constants and variables

let inputDir = { x:0, y:0};
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
  { x:13, y: 15}
];

let score = 0;

let food = {x:6, y:7};
let board = document.getElementById("board");

// Game functions

function main(ctime){
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snakeArr){
  // if you bump into yourself
  for (let index = 1; index < snakeArr.length; index++) {
    if(snakeArr[index].x === snakeArr[0].x && snakeArr[index].y === snakeArr[0].y){
      return true;
    }
    }
  // if you bump into the wall
    if (snakeArr[0].x>=18 || snakeArr[0].x <=0  || snakeArr[0].y>=18 || snakeArr[0].y <=0 ) {
      return true;
    }

}

function gameEngine(){
  // part-1   updating the snake array & food

  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x:0, y:0 };
    alert("Game over. Press any key to play again.");
    snakeArr = [ {x: 13, y: 15}];
    musicSound.play();
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score ;
  }

  // if you have eaten the food, increment the score and regenerate the food

  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score = score + 1;
    if(score>hiScoreval){
      hiScoreval = score;
      localStorage.setItem("hiScore", JSON.stringify(hiScoreval));
      document.getElementById("hiscore").innerHTML = "HiScore: " + hiScoreval ;
    }
    document.getElementById("score").innerHTML = "Score: " + score ;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round( a+ (b-a)* Math.random()) , y: Math.round( a+ (b-a)* Math.random())};
  }

  // moving the snake

  for (let i = snakeArr.length-2; i >= 0; i--) {
    snakeArr[i+1]= {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part-2 display the snake and food
  // displaying snake
  board.innerHTML = "";
  snakeArr.forEach((e, index)=>{
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index === 0){
      snakeElement.classList.add("head");
    }
    else{
    snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // displaying food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// main logic starts here

let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
  hiScoreval= 0;
  localStorage.setItem("hiScore", JSON.stringify(hiScoreval));
}
else{
  hiScoreval = JSON.parse(hiScore);
  document.getElementById("hiscore").innerHTML = "HiScore: " + hiScoreval;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e=>{
  // inputDir = { x:0, y:1} // start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
         console.log("ArrowUp");
         inputDir.x = 0 ;
         inputDir.y = -1;
      break;


    case "ArrowDown":
         console.log("ArrowDown");
         inputDir.x = 0 ;
         inputDir.y = 1 ;
      break;


    case "ArrowLeft":
         console.log("ArrowLeft");
         inputDir.x = -1;
         inputDir.y = 0 ;
      break;


    case "ArrowRight":
         console.log("ArrowRight");
         inputDir.x = 1;
         inputDir.y = 0 ;
      break;
    default:
    break;
  }
});
