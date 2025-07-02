import { describe } from "node:test";
import { Gameboard } from '../scripts/gameboard'
import { Ship } from "../scripts/ship";

describe('gameboard class tests', () => {



    test('ships should track hits and sink if hits == length', () => {
        const board = new Gameboard();
        const testShip = new Ship('Rowboat', 1);
        testShip.location = ['A5'];
        board.boards.p1Ships = [testShip];
        board.receiveAttack('A5', 'p1');
        expect(testShip.isSunk).toBe(true);
        expect(testShip.hitLocation).toEqual(['A5']);
        
    })

    test('Eval if all ships are sunk on a players side', () => {
        const board = new Gameboard();
        const testShip = new Ship('Rowboat', 1);
        testShip.location = ['A5'];
        board.boards.p1Ships = [testShip];
        board.receiveAttack('A5', 'p1');
        expect(board.allSunkEval('p1')).toBe(true)
    })
})