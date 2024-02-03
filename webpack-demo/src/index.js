import { Game } from "./game";
import "./styles.css";

const userGrid = document.querySelector(".battleship-user");
const computerGrid = document.querySelector(".battleship-computer");
const restartBtn = document.getElementById("restart");
const randomBtn = document.getElementById("random");
const rows = 10;
const columns = 10;
const userSquares = [];
let game;
setTimeout(startGame, 500);

function startGame() {
  game = new Game();
  paintPlayerShips();
  const displayTurn = document.getElementById("whose-go");
  displayTurn.innerHTML =
    "When you're ready, click on the computer's board to make an attack";
}

function paintPlayerShips() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const curCell = game.playerGameboard.grid[i][j];
      if (!curCell && typeof curCell == "object") {
        console.log("Value of x is null");
      } else {
        console.log("Value of x is not null", i, j);
        const cell = document.querySelector(`.square.player-${i}-${j}`);
        cell.classList.add("playerShip");
      }
    }
  }
}

function disableGameBoard() {
  //add class disabled to container
  let box = document.querySelector(".container");
  box.classList.add("disabled");
}

randomBtn.addEventListener("click", () => {
  location.reload();
});

restartBtn.addEventListener("click", () => {
  location.reload();
});

function attack(row, column) {
  console.log(game);
  // Check if the move is legal (not already attacked)
  if (game.computerGameboard.receiveAttack(row, column, "computer")) {
    const displayTurn1 = document.getElementById("whose-go");
    displayTurn1.innerHTML = "Computer's Turn";
    console.log("AFTER PLAYER ATTACK", game);
    if (game.checkGameOver()) {
      disableGameBoard();
      restartBtn.style.display = "block";
      return;
    }
    setTimeout(() => {
      game.computer.computerAttack(game.playerGameboard);
      console.log(`attacks (${row}, ${column})`);
      const displayTurn2 = document.getElementById("whose-go");
      displayTurn2.innerHTML = "Your Turn";
      console.log("AFTER COMPUTER ATTACK", game);
      if (game.checkGameOver()) {
        disableGameBoard();
        restartBtn.style.display = "block";
        return;
      }
      return true; // Valid attack
    }, 1000);
  } else {
    console.log(`already attacked (${row}, ${column})`);
    return false; // Invalid attack
  }
}

document.addEventListener("DOMContentLoaded", () => {
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
        randomBtn.style.display = "none";
      });

      userGrid.appendChild(userSquare);
      computerGrid.appendChild(computerSquare);

      userSquares.push(userSquare);
    }
  }
});
