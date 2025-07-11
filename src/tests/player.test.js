
import { Player } from '../scripts/player.js'



describe('Player function tests', () => {
    test('return player object', () => {
        const test = new Player('Steve', 'p1');
        expect(test.getPlayer()).toEqual({
            name: "Steve",
            playerNumber: 'p1'
        });
    }) 

    test('return a player object containing a ships array ', () => {
        const testPlayer = new Player('Steve', 'p1');
        expect(testPlayer.ships).toEqual([0, 1, 2, 3, 4, 5])
    })
})