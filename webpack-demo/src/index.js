import { Game } from "./game";
import { Ship } from "./ship";
import "./styles.css";

const userGrid = document.querySelector(".battleship-user");
const computerGrid = document.querySelector(".battleship-computer");
const rotateBtn = document.getElementById("rotate");
const destroyer = document.querySelector(".destroyer-container");
const submarine = document.querySelector(".submarine-container");
const cruiser = document.querySelector(".cruiser-container");
const battleship = document.querySelector(".battleship-container");
const carrier = document.querySelector(".carrier-container");
const restartBtn = document.getElementById("restart");
const displayGrid = document.querySelector(".grid-display");
let draggedShip = null;
let isHorizontal = true;
let game = new Game();

console.log(game);
const ship10 = new Ship(1);
game.player.gameboard.placeShip(ship10, 0, 0);
console.log("🚀 ~ game:", game);

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

// function updateShipUI(shipElement, row, column, isHorizontal) {
//   // Assuming you have CSS classes to style the ship on the grid
//   const shipClass = isHorizontal ? "horizontal-ship" : "vertical-ship";

//   // Add the ship class to the grid cells to visually represent the ship
//   for (let i = 0; i < shipElement.children.length; i++) {
//     const cellRow = isHorizontal ? row : row + i;
//     const cellColumn = isHorizontal ? column + i : column;

//     const userSquare = document.querySelector(`.player-${cellRow}-${cellColumn}`);
//     if (userSquare) {
//       userSquare.classList.add(shipClass);
//     }
//   }
// }

//Drag Drop player ships
// displayGrid.forEach((displayGrid) => {
//   displayGrid.addEventListener("dragstart", (e) => {
//     // Set the data for the dragged ship
//     draggedShip = e.target;
//   });

//   displayGrid.addEventListener("dragend", () => {
//     // Clear the data when dragging ends
//     draggedShip = null;
//   });
// });

// userGrid.addEventListener("dragover", (e) => {
//   e.preventDefault(); // Allow drop
// });

// userGrid.addEventListener("drop", (e) => {
//   e.preventDefault(); // Prevent default drop behavior

//   if (draggedShip) {
//     // Calculate the drop coordinates (row and column) based on the event and grid layout
//     const gridRect = userGrid.getBoundingClientRect();
//     const cellWidth = gridRect.width / column; // Assuming a grid layout with equal-sized cells
//     const cellHeight = gridRect.height / row; // Assuming a grid layout with equal-sized cells // Calculate the row and column based on the mouse pointer position

//     const mouseX = e.clientX - gridRect.left;
//     const mouseY = e.clientY - gridRect.top;
//     const row = Math.floor(mouseY / cellHeight);
//     const column = Math.floor(mouseX / cellWidth); // Check if the drop is valid and place the ship on the user grid

//     if (
//       game.player.gameboard.placeShip(draggedShip, row, column, isHorizontal)
//     ) {
//       // Update the UI to reflect the ship placement
//       updateShipUI(draggedShip, row, column, isHorizontal);
//     } // Clear the dragged ship data

//     draggedShip = null;
//   }
// });

/*TO DO
-Correct the winner message
-drag and drop play game with 1 ship
-clean up code
-drag and drop final game version
*/
