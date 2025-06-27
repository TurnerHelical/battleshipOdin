import { describe } from "node:test";
import { Gameboard } from '../scripts/gameboard'


describe('gameboard class tests', () => {

    test('return gameboard object', () => {
        const board = new Gameboard();
        expect(board.shipsAt).toEqual('');
    });

    test('change shipsAt property when ship is placed', () => {
        const board = new Gameboard();
        board.placeShip('A, 5');
        expect(board.shipsAt).toBe('A, 5');
    });

    test('function should determine if a ship is at the given coords', () => {
        const board = new Gameboard();
        board.receiveAttack('A, 5');
        expect('hit');
    })


})