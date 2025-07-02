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

  createShips = (player) => {
    const airCarr = new Ship(`${player}AircraftCarrier`, 5);
    
    const battle = new Ship(`${player}Battleship`, 4);
    
    const cruise = new Ship(`${player}Cruiser`, 3);
    
    const submarine = new Ship(`${player}Submarine`, 3);
   
    const destroyer = new Ship(`${player}Destroyer`, 2);
  
    const ships = [airCarr, battle, cruise, submarine, destroyer];
    return ships;
  };
}

export { Ship };
