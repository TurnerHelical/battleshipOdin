import { Dom } from "./utils";
import { Player } from "./player";

const playerFunc = new Player();
const util = new Dom();

class Page {

    init = () => {
        const buttonCtr = util.findElement('#buttonCtr');
        buttonCtr.addEventListener('click', (e) => this.changeContentBox(e));
    }

    startGame = (players) => {
        //start turn one with p1
        const title = util.findElement('#title');
        title.innerHTML= `${players[0].name} place your ships`;
        this.displayGameboard(players[0].playerNumber, players);
        
    }

    changeTurn = () => {

    }


    changeContentBox = (e) => {
        const id = e.target.id
        util.clearContent('#contentBox');
        
        if (id === 'computerPlayer') {
            this.createPlayers('computer', (playerArray) => {
                const [player1,player2] = playerArray;
                this.startGame(playerArray);
            })
            }
        
        
        else  if (id === 'secondPlayer') {
            this.createPlayers('secondPlayer', (playerArray) => {
                const [player1,player2] = playerArray;
                this.startGame(playerArray);
            });
            
            // blank out the screen first and ask the second player to give the first player privacy to place ships and ask for the first players name
            // then when done and name input, generate the first players board and allow them to place ships
            // once done have the screen blank and then ask the second player to take over and the first to give privacy and for the second players name
            // generate a board for the second player and allow them to place ships
            // once done, switch to player 1's turn and show 2 boards on screen, a blank one that tracks where the user has attacked and where they will select spots
            // the second board will show the locations of the players ships and where the second player has tried to attack
        };
    };


    displayGameboard = (playerNumber, playerArray) => {
        util.clearContent('#contentBox');
        this.generateBoard('#contentBox', `${playerNumber}-board`);
        this.loadBoardData(playerNumber, playerArray);
        

    }

    loadBoardData = (playerNumber, playerArray) => {
        if (playerNumber === 'p1') {
            for (let ship of playerArray[0].ships) {
                //place the ships at the ship.location coords, should have coords matching the hitpoints of the ship/ player 1
            }
        } else {
            for (let ship of playerArray[1].ships) {
                //place player 2 ships at the coords in playerArray.ships.location
            }
        }
    }

    

    generateBoard = (parentSelector, boardId) => {
        const parent = util.findElement(parentSelector);
        const title = document.createElement('h2');
        title.innerHTML = ``
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

    createPlayers = (typeOfPlayer, onPlayersReady) => {
        let playerForm = util.findElement('#contentBox');
        playerForm.innerHTML = `
        <div id="playerCreate">
            <h2>Create Player 1</h2>
        </div>
    
        <form id="playerForm">
            <div>
                <label for="name">What is your name?</label>
                <input type="text" name="name?" id="playerName">
            </div>
            <button type="submit">Submit</button>
        </form>`;
    
        const form = util.findElement('#playerForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = util.findElement('#playerName').value;
            const player1 = new Player(name, 'p1', false);
            this.player2Create(typeOfPlayer, (player2) => {
                player1.setOpponent(player2);
                player2.setOpponent(player1);
                onPlayersReady([player1, player2]);
            });
        });
    };



    player2Create = (playerType, onPlayer2Ready) => {
        if (playerType === 'computer') {
            const player2 = new Player('Computer', 'p2', true);
            onPlayer2Ready(player2)
        } else if (playerType === 'secondPlayer') {
            util.clearContent('#contentBox');
            let playerForm = util.findElement('#contentBox')
            playerForm.innerHTML = `
        <div id="playerCreate">
            <h2>Create Player 2</h2>
        </div>

        <form id="playerForm">
            <div>
                <label for="name">What is your name?</label>
                <input type="text" name="name?" id="playerName">
            </div>
            <button type="submit">Submit</button>
        </form>`;
            const form = util.findElement('#playerForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = util.findElement('#playerName').value;
                const player2 = new Player(name, 'p2', false);
                onPlayer2Ready(player2)
            });
        };
    };
    
}
export { Page }