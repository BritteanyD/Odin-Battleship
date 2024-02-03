import { Player } from "./player";
import { Ship } from "./ship";

export class ComputerPlayer extends Player {
  constructor(gameboard) {
    super("Computer");
    this.gameboard = gameboard;
    this.usedCoordinates = new Set();
  }
  getRandomCoordinates() {
    const availableCoordinates = [];
    for (let row = 0; row < this.gameboard.gridSize; row++) {
      for (let column = 0; column < this.gameboard.gridSize; column++) {
        const coordinate = `${row},${column}`;
        if (!this.usedCoordinates.has(coordinate)) {
          availableCoordinates.push({ row, column });
        }
      }
    }
    if (availableCoordinates.length === 0) {
      return null; //All coordinates have been used
    }
    const randomIndex = Math.floor(Math.random() * availableCoordinates.length);
    return availableCoordinates[randomIndex];
  }
  // Method to randomly place the computer's ships on the board
  randomizeShips() {
    const shipLengths = [2, 3, 3, 4, 5];
    for (const length of shipLengths) {
      let ship = new Ship(length);
      let coordinates;
      let isVertical;
      let isValidPlacement = false;

      // Keep trying until a valid ship placement is found
      while (!isValidPlacement) {
        coordinates = this.getRandomCoordinates();
        isVertical = Math.random() < 0.5; // Randomly choose vertical or horizontal placement
        // Attempt to place the ship
        isValidPlacement = this.gameboard.placeShip(
          ship,
          coordinates.row,
          coordinates.column,
          isVertical
        );
      }
    }
  }
  computerAttack(board) {
    const coordinates = this.getRandomCoordinates();
    if (coordinates) {
      const { row, column } = coordinates;
      if (board.receiveAttack(row, column)) {
        console.log(`Computer attacks (${row}, ${column})`, board);
        this.usedCoordinates.add(`${row},${column}`);
      }
    } else {
      console.log(`Computer has no valid moves.`);
    }
  }
}
