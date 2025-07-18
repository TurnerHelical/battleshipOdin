class Ship {
  constructor(shipName, length) {
    this.shipName = shipName;
    this.length = length;
    this.timesHit = 0;
    this.hitLocation = [];
    this.isSunk = false;
    this.location = [];
  }

  placeShip = (locationArray) => {
    // place the ship at the given coords and record it into the ship location
    // ie Submarine should have an array of 3 locations and should look like
    // [A5,A4,A3],
    return this.location = locationArray;

  }

  hit = (coords) => {
    
    if (this.hitLocation.includes(coords)) {
        return true
    } else if (this.isSunk) {
        console.log('this ship is sunk but you should not see this message')
        return
    } else {
        this.timesHit += 1;
        this.hitLocation.push(coords);
        return false
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
    const airCarr = new Ship(`aircraftCarrier`, 5);
    
    const battle = new Ship(`battleship`, 4);
    
    const cruise = new Ship(`cruiser`, 3);
    
    const submarine = new Ship(`submarine`, 3);
   
    const destroyer = new Ship(`destroyer`, 2);
  
    const ships = [airCarr, battle, cruise, submarine, destroyer];
    return ships;
  };
}

export { Ship };
