export class Player {
  constructor(gameboard) {
    this.gameboard = gameboard;
  }

  attack(row, column) {
    // Check if the move is legal (not already attacked)
    if (this.gameboard.receiveAttack(row, column)) {
      console.log(`Player attacks (${row}, ${column})`);
      return true; // Valid attack
    } else {
      console.log(`Player already attacked (${row}, ${column})`);
      return false; // Invalid attack
    }
  }
}
