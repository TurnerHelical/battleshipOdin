import { Ship } from "./ship.js";

const shipClass = new Ship();

class Gameboard {


  recordMiss = (coords, player) => {
    
  }

  allSunkEval = (player) => {

  }
  declareWinner = (player) => {

    
  }

  receiveAttack = (attackCoords, player) => {
    
}
}

export { Gameboard };

// To determine if a ship gets hit the receive attack function needs to evaluate if a ship is at the given coordinate
// the Gameboard class needs to know where the ships are to evaluate
// ships location needs to update when ship is placed
// when all ships are placed, pass an array of the ship objects to the receive attack function so if an attack matches one of the coords the ship.hit function can be run and the hit recorded
// if the attack hits nothing record the failed attack and put in a visible list so they don't pick it again
// if the hit function is run, run the evalSunk function to determine if the hits == length, if so sink the ship
// if all ships sunk, you lose
