class Ship {
  constructor(shipName, length) {
    this.shipName = shipName;
    this.length = length;
    this.timesHit = 0;
    this.hitLocation = [];
    this.isSunk = false;
    this.location = [];
  }

  hit = (coords) => {
    
    if (this.hitLocation.includes(coords)) {
        console.log('You already tried here! Try again.');
        // Allow user to try a different spot
    } else if (this.isSunk) {
        console.log('this ship is sunk but you should not see this message')
        return
    } else {
        this.timesHit += 1;
        this.hitLocation.push(coords);
        return
    }
  };

  evalSunk = () => {
    if (this.timesHit === this.length) {
      this.isSunk = true;
      return true;
    } else {
      return false;
    }
  };

  createShips = () => {
    const p1AC = new Ship("p1AircraftCarrier", 5);
    const p2AC = new Ship("p2AircraftCarrier", 5);
    const p1B = new Ship("p1Battleship", 4);
    const p2B = new Ship("p2Battleship", 4);
    const p1C = new Ship("p1Cruiser", 3);
    const p2C = new Ship("p2Cruiser", 3);
    const p1S = new Ship("p1Submarine", 3);
    const p2S = new Ship("p2Submarine", 3);
    const p1D = new Ship("p1Destroyer", 2);
    const p2D = new Ship("p2Destroyer", 2);
    let p1Ships = [p1AC, p1B, p1C, p1S, p1D];
    let p2Ships = [p2AC, p2B, p2C, p2S, p2D];
    const ships = {
      p1Array: [p1AC, p1B, p1C, p1S, p1D],
      p2Array: [p2AC, p2B, p2C, p2S, p2D]
    };
    return ships;
  };
}

export { Ship };
