import { Ship } from "./ship.js";

const shipClass = new Ship();

class Gameboard {
  ships = shipClass.createShips();
  p1Ships = ships.p1Array;
  p2Ships = ships.p2Array;
  p1Misses = [];
  p2Misses = [];

  initBoard = () => {
    placeShips(p1Ships);
    placeShips(p2Ships);
  };

  placeShips = () => {};

  recordMiss = (coords, player) => {
    if (player === 'p1') {
        if (p1Misses.find(coords) === coords) {
            console.log('Already tried this spot, try again');
            // Allow user to select another spot to attack
        } else {
            p1Misses.push(coords);
        }
    } else {
        if (p2Misses.find(coords) === coords) {
            console.log('Already tried this spot, try again');
            // Allow user ot select another spot to attack
        } else {
            p2Misses.push(coords);
        }
    }
  };

  receiveAttack = (attackCoords, player) => {
    if (player === "p1") {
      p1Ships.forEach((ship) => {
        if (ship.location.find(attackCoords) === attackCoords) {
          ship.hit(attackCoords);
          // add coords to the hit list
          if (ship.evalSunk() === "Yes") {
            console.log(`You sank the opponents ${ship.shipName}`);
            // Make an X on player 1's sunk ship
          } else {
            console.log(`You hit the opponents ${ship.shipName}`);
            // update sprite to reflect the hit
          }
        } else {
          recordMiss(attackCoords, player);
          // Add the coords to the missed list
        }
      });
    } else {
      p2Ships.forEach((ship) => {
        if (ship.location.find(attackCoords) === attackCoords) {
          ship.hit(attackCoords);
          // add coords to the hit list
          if (ship.evalSunk() === "Yes") {
            console.log(`You sank the opponents ${ship.shipName}!`);
            // Make an X on player 2's sunk ship
          } else {
            console.log(`You hit the opponents ${ship.Shipname}!`);
            // update sprite to reflect the hit
          }
        } else {
          recordMiss(attackCoords, player);
          // Add the coords to the missed list
        }
      });
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
