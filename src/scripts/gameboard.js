import { Ship } from './ship.js'

class Gameboard {

    constructor() {
        this.shipsAt = '';
    }

    placeShip(coords) {
        this.shipsAt = coords;
    }

    receiveAttack(coords) {
        if (coords === this.shipsAt) {
            
        }
    }


}

export { Gameboard }