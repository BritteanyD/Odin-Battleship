import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { ComputerPlayer } from "./computer";

export class Game {
  constructor() {
    this.playerGameboard = new Gameboard();
    this.computerGameboard = new Gameboard();
    this.player = new Player(this.playerGameboard);
    this.computer = new ComputerPlayer(this.computerGameboard);
    this.computer.randomizeShips();
    this.player.randomizeShips();
    this.currentPlayer = this.player;
    this.gameOver = false;
  }
  checkGameOver() {
    // Check for game over condition
    if (this.playerGameboard.areAllShipsSunk()) {
      this.gameOver = true;
      const turnDisplay = document.getElementById("whose-go");
      turnDisplay.innerHTML = "Game over! Computer is the winner!";
      return true;
    } else if (this.computerGameboard.areAllShipsSunk()) {
      this.gameOver = true;
      const turnDisplay = document.getElementById("whose-go");
      turnDisplay.innerHTML = "Game over! Player is the winner!";
      return true;
    }
    return false;
  }
  handleAttack(row, column) {
    if (!this.gameOver) {
      if (this.currentPlayer === this.player) {
        const isValidAttack = this.player.attack(row, column);
        if (isValidAttack) {
          if (this.checkGameOver()) {
            return;
          }
          // Switch to the other player
          this.switchPlayer();
        }
      } else if (this.currentPlayer === this.computer) {
        this.computer.computerAttack();
        if (this.checkGameOver()) {
          return;
        }
        // Switch to the other player
        this.switchPlayer();
      }
    }
  }
}
