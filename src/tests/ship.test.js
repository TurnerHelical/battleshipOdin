import { describe } from "node:test";
import { Ship } from '../scripts/ship.js'

const ship = new Ship('Rowboat', 2);

describe('ship tests', () => {
    test('should create ship object', () => {
        const testShip = new Ship('Rowboat', 2);
        expect(testShip.shipName).toBe('Rowboat')
        expect(testShip.length).toBe(2);
        expect(testShip.timesHit).toBe(0);
        expect(testShip.isSunk).toBe('No');
    })
} )