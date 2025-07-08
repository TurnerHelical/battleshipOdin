import { Ship } from "./ship.js";

const shipClass = new Ship();

class Gameboard {


  recordMiss = (coords, player) => {
    if (player === 'p1') {
        if (this.boards.p1Misses.includes(coords)) {
            console.log('Already tried this spot, try again');
            // Allow user to select another spot to attack
        } else {
            this.boards.p1Misses.push(coords);
        }
    } else {
        if (this.boards.p2Misses.includes(coords)) {
            console.log('Already tried this spot, try again');
            // Allow user ot select another spot to attack
        } else {
            this.boards.p2Misses.push(coords);
        }
    }
  };

  allSunkEval = (player) => {
    const ships = this.boards[`${player}Ships`];

    if (ships.every(ship => ship.isSunk === true)) {
        this.declareWinner(player);
        return true
    } else {
        return
    }
  }

  declareWinner = (player) => {
    console.log('Player 2 wins')
    
  }

  receiveAttack = (attackCoords, player) => {
    const ships = this.boards[`${player}Ships`];
    let hit = false;
  
    ships.forEach((ship) => {
      if (ship.location.includes(attackCoords)) {
        ship.hit(attackCoords);
        hit = true;
  
        if (ship.evalSunk()) {
          console.log(`You sank the opponent's ${ship.shipName}`);
        } else {
          console.log(`You hit the opponent's ${ship.shipName}`);
        }
      }
    });
  
    if (!hit) {
      this.recordMiss(attackCoords, player);
    }
  };
}

export { Gameboard };

// To determine if a ship gets hit the receive attack function needs to evaluate if a ship is at the given coordinate
// the Gameboard class needs to know where the ships are to evaluate
// ships location needs to update when ship is placed
// when all ships are placed, pass an array of the ship objects to the receive attack function so if an attack matches one of the coords the ship.hit function can be run and the hit recorded
// if the attack hits nothing record the failed attack and put in a visible list so they don't pick it again
// if the hit function is run, run the evalSunk function to determine if the hits == length, if so sink the ship
// if all ships sunk, you lose
