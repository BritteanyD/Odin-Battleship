import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { ComputerPlayer } from "./computer";
import { Ship } from "./ship";

export class Game {
  constructor() {
    this.playerGameboard = new Gameboard();
    this.computerGameboard = new Gameboard();
    this.player = new Player("Player", this.playerGameboard);
    this.computer = new ComputerPlayer(this.computerGameboard);
    this.computer.randomizeShips();
    this.currentPlayer = this.player;
    this.gameOver = false;
    this.winner = null;

    this.initializeGame();
  }
  initializeGame() {
    //const startBtn = document.getElementById("start");
    //startBtn.addEventListener("click", () => {
      this.computer.randomizeShips();
      //const game = new Game();
      //game.initializeGame();
    //});
  }
  checkGameOver() {
    // Check for game over condition
    if (
      this.playerGameboard.areAllShipsSunk() ||
      this.computerGameboard.areAllShipsSunk()
    ) {
      this.gameOver = true;
      this.winner = this.currentPlayer;
      const turnDisplay = document.getElementById("whose-go");
      turnDisplay.innerHTML =
        "Game over!" + this.winner.name + " is the winner!";
      return true;
    }
    return false;
  }
  handleAttack(row, column) {
    //console.log("CURRENT PLAYER", this.currentPlayer);
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
  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.player ? this.computer : this.player;
  }
}
