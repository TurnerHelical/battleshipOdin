import { Dom } from "./utils";
import { Player } from "./player";

const playerFunc = new Player();
const util = new Dom();

class Page {

    init = () => {
        const buttonCtr = util.findElement('#buttonCtr');
        buttonCtr.addEventListener('click', (e) => this.changeContentBox(e));
    }


    changeContentBox = (e) => {
        const id = e.target.id
        util.clearContent('#contentBox');
        util.toggleClass('#contentBox','placeShips')
        if (id === 'computerPlayer') {
            // ask for player name and initiate player objects
            // create a board on the screen and tell the user to place their ships
            // write logic for the computer to auto select ship placement
            let playerArray = this.createPlayers('computer');
            let player1 = playerArray[0];
            let player2 = playerArray[1];
            this.displayGameboard('p1');

            
        } else  if (id === 'secondPlayer') {
            // blank out the screen first and ask the second player to give the first player privacy to place ships and ask for the first players name
            // then when done and name input, generate the first players board and allow them to place ships
            // once done have the screen blank and then ask the second player to take over and the first to give privacy and for the second players name
            // generate a board for the second player and allow them to place ships
            // once done, switch to player 1's turn and show 2 boards on screen, a blank one that tracks where the user has attacked and where they will select spots
            // the second board will show the locations of the players ships and where the second player has tried to attack
        } else {
            return
        };
    };


    displayGameboard = (playerNumber) => {
        util.clearContent('#contentBox');
        util.toggleClass('#contentBox','placeShips');
        this.generateBoard('#contentBox', `${playerNumber}-board`);
        

    }

    

    generateBoard = (parentSelector, boardId) => {
        const parent = util.findElement(parentSelector);
        const board = document.createElement('div');
        board.classList.add('gameboard');
        board.setAttribute('id', boardId);
    
        const rows = 'ABCDEFGHIJ';
        for (let r = 0; r < 10; r++) {
            for (let c = 1; c <= 10; c++) {
                const cell = document.createElement('div');
                const coord = `${rows[r]}${c}`;
                cell.classList.add('cell');
                cell.setAttribute('data-coord', coord);
                cell.setAttribute('id', `${boardId}-${coord}`);
                board.appendChild(cell);
            }
        }
    
        parent.appendChild(board);
    };

    createPlayers = (typeOfPlayer) => {
        let playerForm = util.findElement('#contentBox');
        playerForm.innerHTML = `
        <div id="playerCreate">
            <h2>Create Player 1</h2>
        </div>

        <form id='playerForm'>
            <div>
                <label for="name">What is your name?</label>
                <input type="text" name="name?" id="playerName">
            </div>
            <button type="submit">Submit</button>
        </form>`;
        const submit = util.findElement('#playerForm');
        const player1 = submit.addEventListener('submit',(e) => this.playerNameFormSubmit(e,'p1'));
        const player2 = this.player2Create(typeOfPlayer);
        let playerArray = [player1, player2]
        return playerArray
    };

    playerNameFormSubmit = (e, playerNumber) => {
        e.preventDefault()
        const playerNameValue = util.findElement('#playerName').value;
        const player = new Player(`${playerNameValue}`, playerNumber, false)
        return player
    };

    player2Create = (playerType) => {
        if (playerType === 'computer') {
            const player2 = new Player('Computer', 'p2', true);
            return player2
        } else if (playerType === 'secondPlayer') {
            let playerForm = util.findElement('#contentBox');
            util.clearContent(playerForm);
            playerForm.innerHTML = `
        <div id="playerCreate">
            <h2>Create Player 2</h2>
        </div>

        <form id='playerForm'>
            <div>
                <label for="name">What is your name?</label>
                <input type="text" name="name?" id="playerName">
            </div>
            <button type="submit">Submit</button>
        </form>`;
            const submit = util.findElement('#playerForm');
            const player2 = submit.addEventListener('submit', (e) => this.playerNameFormSubmit(e,'p2'));
            return player2
        };
    };
    
}
export { Page }