import { describe } from "node:test";
import { Gameboard } from '../scripts/gameboard'
import { Ship } from "../scripts/ship";

describe('gameboard class tests', () => {

    // test('return gameboard object', () => {
    //     const board = new Gameboard();
    //     expect(board.shipsAt).toEqual('');
    // });

    // test('change shipsAt property when ship is placed', () => {
    //     const board = new Gameboard();
    //     board.placeShip('A, 5');
    //     expect(board.shipsAt).toBe('A, 5');
    // });

    test('ships should track hits and sink if hits == length', () => {
        const board = new Gameboard();
        const testShip = new Ship('Rowboat', 1);
        testShip.location.push('A5');
        board.receiveAttack('B4');
        board.receiveAttack('A5', 'p1');
        expect(testShip.isSunk).toBe('Yes');
        expect(testShip.hitLocation).toBe(['A5']);
        expect
    })


})