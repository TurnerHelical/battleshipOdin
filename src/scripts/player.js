import { Ship } from '../scripts/ship'

const shipFunc = new Ship();

class Player {
    constructor(name, playerNumber) {
        this.name = name
        this.playerNumber = playerNumber
        this.missCoords = [];
        this.hitCoords = [];
        this.ships = shipFunc.createShips(this.playerNumber)
    }

    getPlayer() {
        return this
    }
}

export { Player }