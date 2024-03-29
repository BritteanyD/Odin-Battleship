export class Gameboard {
  constructor() {
    this.gridSize = 10;
    this.grid = Array(this.gridSize)
      .fill(null)
      .map(() => Array(this.gridSize).fill(null));
  }
  placeShip = (ship, row, column, isVertical) => {
    // Check for valid coordinates and bounds
    if (
      row < 0 ||
      row >= this.gridSize ||
      column < 0 ||
      column >= this.gridSize
    ) {
      return false; // Invalid ship coordinates for placement
    }

    if (isVertical) {
      if (row + ship.length > this.gridSize) {
        return false; // Invalid ship placement out of bounds
      }

      for (let i = row; i < row + ship.length; i++) {
        if (this.grid[i][column] !== null) {
          return false; // Ship overlap
        }
      }

      for (let i = row; i < row + ship.length; i++) {
        this.grid[i][column] = ship;
        
      }
    } else {
      if (column + ship.length > this.gridSize) {
        return false; // Invalid ship placement out of bounds
      }

      for (let i = column; i < column + ship.length; i++) {
        if (this.grid[row][i] !== null) {
          return false; // Ship overlap
        }
      }

      for (let i = column; i < column + ship.length; i++) {
        
        this.grid[row][i] = ship;
      }
    }

    return true; // Ship placed successfully
  };

  receiveAttack = (row, column, board = "player") => {
    
    const hit = "X",
      miss = "O";
    // Check for valid coordinates
    if (
      row < 0 ||
      row >= this.gridSize ||
      column < 0 ||
      column >= this.gridSize
    ) {
      return false; // Invalid attack coordinates
    }
    const target = this.grid[row][column];

    // Check if the target has already been attacked
    if (target === "X" || target === "O") {
      return false; // Already attacked this spot, prevent further actions
    }

    // Mark the target as attacked
    if (target === null) {
      
      this.grid[row][column] = miss; //'O'
      const square = document.querySelector(`.${board}-${row}-${column}`);
      if (square) {
        square.classList.add("miss");
      }
    } else {
      this.grid[row][column] = hit; //'X'
      const square = document.querySelector(`.${board}-${row}-${column}`);
      if (square) {

        square.classList.add("hit");
      }
    }

    return true; // Valid attack
  };

  isShipSunk = (row, column) => {
    const target = this.grid[row][column];

    //Check if the target is a ship and if it's already sunk
    if (target !== null && target !== "X") {
      // Check if all cells occupied by the ship have been hit
      for (let r = 0; r < this.gridSize; r++) {
        for (let c = 0; c < this.gridSize; c++) {
          if (this.grid[r][c] === target) {
            return false; // Ship is not sunk yet
          }
        }
      }
      return true; // Ship is sunk
    }

    return false; // Not a ship or already sunk
  };

  areAllShipsSunk = () => {
    // Check if all ships on the gameboard are sunk
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        const cur = this.grid[r][c];
        if (cur !== null && cur !== "X" && cur !== "O") {
          return false; // At least one ship is not sunk yet
        }
      }
    }
    return true; // All ships are sunk
  };
}
