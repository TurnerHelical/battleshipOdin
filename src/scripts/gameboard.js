import { Ship } from "./ship.js";

const shipClass = new Ship();

class Gameboard {
  constructor(shipArray) {
    this.shipArray = shipArray;
  }

  allSunkEval = (player) => {};
  declareWinner = (player) => {};

  receiveAttack = (attackCoords) => {
    // take the passed coords from the opponents attack and compare them to the ship locations to determine if a hit was made
    // loop through the array and compare the attack Coords and see if it matches any of the ship locations
    // if the attack hits pass true back to the opponent making the attack so they can update the hit array
    // if it doesn't hit pass false so the miss array is updated
    // if hit register on the hit ship then run an eval to see if the ship is sunk
    // if ship has sunk run another eval to see if all ships are sunk
    // if all ships sunk declare winner
    let hit = "";
    for (let ship of this.shipArray) {
      if (!ship.location.includes(attackCoords)) {
        return (hit = "No");
      } else {
        ship.hit(attackCoords);
        ship.evalSunk();

        return (hit = "Yes");
      }
    }
    if (hit === "No") {
      // record miss in attackers miss array
    } else {
      // record hit in the attackers hit array
    }
  };
}

// check each ship in the array and determine if the attackCoords are listed in the location array
// if ship does have matching coords, run hit function for ship and then run evalSunk on that ship
// once that happens break out of the loop and tell the attacker and attackee that it was a hit and reecord it in the hit array
// if no ship location matches the attackCords, tell the users it was a miss and record it in the miss array

export { Gameboard };

// To determine if a ship gets hit the receive attack function needs to evaluate if a ship is at the given coordinate
// the Gameboard class needs to know where the ships are to evaluate
// ships location needs to update when ship is placed
// when all ships are placed, pass an array of the ship objects to the receive attack function so if an attack matches one of the coords the ship.hit function can be run and the hit recorded
// if the attack hits nothing record the failed attack and put in a visible list so they don't pick it again
// if the hit function is run, run the evalSunk function to determine if the hits == length, if so sink the ship
// if all ships sunk, you lose
