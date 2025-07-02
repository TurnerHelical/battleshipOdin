
import { Player } from '../scripts/player.js'



describe('Player function tests', () => {
    test('return player object', () => {
        const test = new Player('Steve', 'p1');
        expect(test.getPlayer()).toEqual({
            name: "Steve",
            playerNumber: 'p1'
        });
    }) 
})