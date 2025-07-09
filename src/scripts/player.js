import { Ship } from '../scripts/ship'
import { Gameboard } from './gameboard';

const shipFunc = new Ship();


class Player {
    constructor(name, playerNumber, isComputer) {
        this.name = name;
        this.playerNumber = playerNumber;
        this.missCoords = [];
        this.hitCoords = [];
        this.ships = shipFunc.createShips(this.playerNumber);
        this.board = new Gameboard(this.ships);
        this.opponent = null;
        this.isComputer = isComputer;
    }

    setOpponent = (opponentPlayer) => {
        this.opponent = opponentPlayer;

    }

    makeAttack = (coords) => {
        let hit = this.opponent.board.receiveAttack(coords);
        if (hit === true) {
            this.hitCoords.push(coords);
            this.opponent.board.allSunkEval(this.name)
        } else if (hit === false) {
            this.missCoords.push(coords);
        } else if (hit === 'repeat') {
            // do nothing and have user select another position, 
        }

    }

    getPlayer = () => {
        return this
    }
}

export { Player }