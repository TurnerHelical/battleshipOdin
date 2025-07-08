import { Ship } from '../scripts/ship'
import { Gameboard } from './gameboard';

const shipFunc = new Ship();


class Player {
    constructor(name, playerNumber) {
        this.name = name;
        this.playerNumber = playerNumber;
        this.missCoords = [];
        this.hitCoords = [];
        this.ships = shipFunc.createShips(this.playerNumber);
        this.board = new Gameboard();
        this.opponent = null;
    }

    setOpponent(opponentPlayer) {
        this.opponent = opponentPlayer;
        this.board.boards = {

        }
    }

    makeAttack(coords) {
        
    }

    getPlayer() {
        return this
    }
}

export { Player }