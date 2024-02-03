import { Game } from "./game";
import { Ship } from "./ship";
import "./styles.css";

const userGrid = document.querySelector(".battleship-user");
const computerGrid = document.querySelector(".battleship-computer");
const randomBtn = document.getElementById("random");
const destroyer = document.querySelector(".destroyer-container");
const submarine = document.querySelector(".submarine-container");
const cruiser = document.querySelector(".cruiser-container");
const battleship = document.querySelector(".battleship-container");
const carrier = document.querySelector(".carrier-container");
const restartBtn = document.getElementById("restart");
const ships = document.querySelectorAll(".ship");
const rows = 10;
const columns = 10;
const userSquares = [];
let isPlacingShip = false;
let isHorizontal = true;
let game;
setTimeout(startGame, 500);

function startGame() {
  game = new Game();
  paintPlayerShips();
}

function paintPlayerShips() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      console.log(`i, j: ${i}, ${j} ${game.playerGameboard.grid[i][j]}`);
      const curCell = game.playerGameboard.grid[i][j];
      if (!curCell && typeof curCell == "object") {
        console.log("Value of x is null");
      } else {
        console.log("Value of x is not null", i, j);
        const cell = document.querySelector(
          `.square.player-${i}-${j}`
        );
        console.log("CELL", cell);
        cell.style.backgroundColor = "yellow";
      }
    }
  }
}

//console.log(game);
// const ship10 = new Ship(1);
// game.player.gameboard.placeShip(ship10, 0, 0);
// console.log("🚀 ~ game:", game);

function disableGameBoard() {
  //add class disabled to container
  let box = document.querySelector(".container");
  box.classList.add("disabled");
}

restartBtn.addEventListener("click", () => {
  location.reload();
});

function attack(row, column) {
  console.log(game);
  // Check if the move is legal (not already attacked)
  if (game.computerGameboard.receiveAttack(row, column, "computer")) {
    console.log("AFTER PLAYER ATTACK", game);
    if (game.checkGameOver()) {
      disableGameBoard();
      restartBtn.style.display = "block";
      return;
    }
    game.computer.computerAttack(game.playerGameboard);
    console.log(`attacks (${row}, ${column})`);
    console.log("AFTER COMPUTER ATTACK", game);
    if (game.checkGameOver()) {
      disableGameBoard();
      restartBtn.style.display = "block";
      return;
    }
    return true; // Valid attack
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
      });

      userGrid.appendChild(userSquare);
      computerGrid.appendChild(computerSquare);

      userSquares.push(userSquare);
    }
  }
  console.log("ADDING SQUARES");
});

// //Rotate the ships
// rotateBtn.addEventListener('click', () => {
//   if (!isPlacingShip) {
//     if (isHorizontal) {
//       if (!destroyer.classList.contains("placed")) {
//         destroyer.classList.toggle("destroyer-container-vertical");
//       }
//       if (!submarine.classList.contains("placed")) {
//         submarine.classList.toggle("submarine-container-vertical");
//       }
//       if (!cruiser.classList.contains("placed")) {
//         cruiser.classList.toggle("cruiser-container-vertical");
//       }
//       if (!battleship.classList.contains("placed")) {
//         battleship.classList.toggle("battleship-container-vertical");
//       }
//       if (!carrier.classList.contains("placed")) {
//         carrier.classList.toggle("carrier-container-vertical");
//       }
//       isHorizontal = false;
//     } else {
//       if (!destroyer.classList.contains("placed")) {
//         destroyer.classList.toggle("destroyer-container-vertical");
//       }
//       if (!submarine.classList.contains("placed")) {
//         submarine.classList.toggle("submarine-container-vertical");
//       }
//       if (!cruiser.classList.contains("placed")) {
//         cruiser.classList.toggle("cruiser-container-vertical");
//       }
//       if (!battleship.classList.contains("placed")) {
//         battleship.classList.toggle("battleship-container-vertical");
//       }
//       if (!carrier.classList.contains("placed")) {
//         carrier.classList.toggle("carrier-container-vertical");
//       }
//       isHorizontal = true;
//     }
//   }
// });

// //Drag and drop player ships
// ships.forEach((ship) => {
//   ship.addEventListener("dragstart", (event) => {
//     event.dataTransfer.setData("text/plain", ship.id);
//     isPlacingShip = true;
//     console.log(event);
//   });
//   ship.addEventListener("dragend", () => {
//     isPlacingShip = false;
//   });
// });

// userGrid.addEventListener("dragover", function (event) {
//   event.preventDefault(); // Allow drop
// });

// function getShipLengthFromId(shipId) {
//   // Define a mapping of ship IDs to lengths
//   const shipIdToLength = {
//     "destroyer-container": 2,
//     "submarine-container": 3,
//     "cruiser-container": 3,
//     "battleship-container": 4,
//     "carrier-container": 5,
//   };

//   // Use the mapping to retrieve the length based on the shipId
//   const shipLength = shipIdToLength[shipId];

//   // Return the length or a default value if not found
//   return shipLength || 0;
// }

// userGrid.addEventListener("drop", (event) => {
//   event.preventDefault();

//   const shipId = event.dataTransfer.getData("text/plain");
//   const shipElement = document.getElementById(shipId);

//   // Calculate the row and column where the ship was dropped
//   const { top, left } = userGrid.getBoundingClientRect();
//   const gridBlock = 40; //each square size
//   const row = Math.floor((event.clientY - top) / gridBlock);
//   const column = Math.floor((event.clientX - left) / gridBlock);

//   // Create a new ship object with the appropriate length
//   const shipLength = getShipLengthFromId(shipId);
//   const newShip = new Ship(shipLength);

//   // Use your game logic to place the ship on the gameboard
//   const placementSuccessful = game.player.gameboard.placeShip(
//     newShip,
//     row,
//     column,
//     isHorizontal
//   );

//   if (placementSuccessful) {
//     // Append the ship element to the grid for visual representation
//     userSquares[row * columns + column].appendChild(shipElement);
//     shipElement.classList.add("placed");
//   } else {
//     // Handle invalid ship placement (e.g., show an error message to the user)
//     console.log("Invalid ship placement");
//   }
// });

/*TO DO
-drag and drop play game with 1 ship
-drag and drop final game version
*/
