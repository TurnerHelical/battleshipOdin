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
    });

    test('timesHit should go up by 1', () => {
        const testShip = new Ship('Rowboat', 2);
        testShip.hit()
        expect(testShip.timesHit).toBe(1);
    });

    test('if timesHit = length, isSunk should be yes', () => {
        const testShip = new Ship('Rowboat', 2);
        testShip.hit();
        testShip.hit();
        testShip.evalSunk();
        expect(testShip.isSunk).toBe('Yes');                    
        
    }); 

    test('if timesHit < length, do nothing', () => {
        const testShip = new Ship('Rowboat', 2);
        testShip.hit();
        testShip.evalSunk();
        expect(testShip.isSunk).toBe('No');      
    });


} )