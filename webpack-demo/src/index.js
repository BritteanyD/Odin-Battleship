import { Game } from "./game";
import { Ship } from "./ship";
import "./styles.css";

//const ships = document.querySelectorAll(".ship");
//const displayGrid = document.querySelector('.grid-display');
const userGrid = document.querySelector(".battleship-user");
const computerGrid = document.querySelector(".battleship-computer");
const rotateBtn = document.getElementById("rotate");
const destroyer = document.querySelector(".destroyer-container");
const submarine = document.querySelector(".submarine-container");
const cruiser = document.querySelector(".cruiser-container");
const battleship = document.querySelector(".battleship-container");
const carrier = document.querySelector(".carrier-container");
//const userSquare = [];
let isHorizontal = true;
let game = new Game();

// const ship10 = new Ship(10)
// game.player1.gameboard.placeShip(ship10, 0, 0)
// console.log("🚀 ~ game:", game)

// start();
// function start() {
//   const object = new HelloWorld();
//   object.hi();

//   game = new Game();
//   game.initializeGame();
//  console.log("START Game", game);

//   check(game.player1Gameboard);
// }

function attack(row, column) {
  console.log(game)
  // Check if the move is legal (not already attacked)
  if(game.computerGameboard.receiveAttack(row, column, "computer")){
    game.switchPlayer()
    game.computer.computerAttack()
    console.log(`attacks (${row}, ${column})`);
    return true; // Valid attack
  } else {
    console.log(`already attacked (${row}, ${column})`);
    return false; // Invalid attack
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const rows = 10;
  const columns = 10;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // Create a grid item element
      const userSquare = document.createElement("div");
      userSquare.className = `square player-${i}-${j}`;
      const computerSquare = document.createElement("div");
      computerSquare.className = `square computer-${i}-${j}`;

      // Assign row and column as custom attributes only to the computer squares
      computerSquare.dataset.row = i;
      computerSquare.dataset.column = j;

      // Add click event listener to computer squares only
      computerSquare.addEventListener("click", () => {
        const row = parseInt(computerSquare.dataset.row);
        const column = parseInt(computerSquare.dataset.column);
        // Call the attack function for the computer's grid
        attack(row, column);
      });

      userGrid.appendChild(userSquare);
      computerGrid.appendChild(computerSquare);
    }
  }
});

//Rotate the ships
function rotate() {
  if (isHorizontal) {
    destroyer.classList.toggle("destroyer-container-vertical");
    submarine.classList.toggle("submarine-container-vertical");
    cruiser.classList.toggle("cruiser-container-vertical");
    battleship.classList.toggle("battleship-container-vertical");
    carrier.classList.toggle("carrier-container-vertical");
    isHorizontal = false;
    return;
  }
  if (!isHorizontal) {
    destroyer.classList.toggle("destroyer-container-vertical");
    submarine.classList.toggle("submarine-container-vertical");
    cruiser.classList.toggle("cruiser-container-vertical");
    battleship.classList.toggle("battleship-container-vertical");
    carrier.classList.toggle("carrier-container-vertical");
    isHorizontal = true;
    return;
  }
}
rotateBtn.addEventListener("click", rotate);
