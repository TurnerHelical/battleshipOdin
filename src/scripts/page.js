import { Dom } from "./utils";
import { Player } from "./player";

const playerFunc = new Player();
const util = new Dom();
const images = require.context("../images", false, /\.png$/);

class Page {
  init = () => {
    const buttonCtr = util.findElement("#buttonCtr");
    buttonCtr.addEventListener("click", (e) => this.changeContentBox(e));
  };

  startGame = (players) => {
    //start turn one with p1
    this.placeShipFunc(players[0]);
  };

  changeTurn = () => {};

  placeShipFunc = (player) => {
    const title = util.findElement("#title");
    title.innerHTML = `${player.name} place your ships`;
    this.displayGameboard(player);
    const board = util.findElement(`#${player.playerNumber}-board`);
    util.createAndAppend("#contentBox", "div", "id", "shipCtr");
    const toggleBtn = util.createAndAppend(
      "#contentBox",
      "button",
      "id",
      "toggleDirection",
    );
    toggleBtn.textContent = "Rotate (Horizontal)";
    let direction = "horizontal";
    toggleBtn.addEventListener("click", () => {
      direction = direction === "horizontal" ? "vertical" : "horizontal";
      toggleBtn.textContent = `Rotate (${direction.charAt(0).toUpperCase() + direction.slice(1)})`;
    });
    for (let ship of player.ships) {
      const shipImage = util.createAndAppend(
        "#shipCtr",
        "img",
        "id",
        `${ship.shipName}`,
      );
      shipImage.setAttribute("src", images(`./${ship.shipName}.png`));
      shipImage.setAttribute("draggable", "true");
      shipImage.setAttribute("class", `shipImage`);
      shipImage.addEventListener("dragstart", (e) => {
        const id = e.target.id;
        const matchedShip = player.ships.find((ship) => ship.shipName === id);
        if (matchedShip) {
          const length = matchedShip.length;
          e.dataTransfer.setData("image/png", e.target.id);
          let img = new Image();
          img.src = `../images/${matchedShip.shipName}.png`;
          e.dataTransfer.setDragImage(img, 10, 10);
          e.dataTransfer.setData("shipName", matchedShip.shipName);
          e.dataTransfer.setData("length", matchedShip.length);
          e.dataTransfer.setData('direction', direction);

          // the ships should be draggable and an image of the ship should show it attached to the mouse, when the mouse is hovering over the gameboard
          // it should highlight how many cells this ship takes
          // if the ship doesn't fit in the cells user is hovering over or it would overlap another ship, throw a visual error
          // when ship is dropped onto the board, the ship is visually placed on the board
          // the cells are recorded as the location for the ship in the location array
        }
      });
    }
    board.addEventListener("drop", (e) => {
      e.preventDefault();
      const shipId = e.dataTransfer.getData("image/png");
      const ship = player.ships.find((s) => s.shipName === shipId);

      if (ship) {
        console.log(`Dropped: ${ship.shipName}`);
        // You'll add visual placement and location recording here
      }
    });

    board.addEventListener('drop', (e) => {
        e.preventDefault();
        const target = e.target.closest('.cell');
        if (!target) return;
    
        const shipName = e.dataTransfer.getData('shipName');
        const length = parseInt(e.dataTransfer.getData('length'));
        const direction = e.dataTransfer.getData('direction');
        const startCoord = target.dataset.coord;
    
        const coords = this.getProjectedCoords(startCoord, length, direction);
        const isValid = this.isValidPlacement(coords, player);
    
        // Clear highlights
        const allCells = board.querySelectorAll('.cell');
        allCells.forEach(cell => {
            cell.classList.remove('highlight-valid', 'highlight-invalid');
        });
    
        if (!isValid) {
            console.log('Invalid ship placement');
            return;
        }
    
        // Set ship location and render
        const ship = player.ships.find(s => s.shipName === shipName);
        if (ship) {
            ship.location = coords;
            coords.forEach(coord => {
                const cell = board.querySelector(`[data-coord="${coord}"]`);
                if (cell) {
                    cell.classList.add('ship-cell'); // for styling
                }
            });
    
            // Optionally disable this ship so it's not draggable again
            const shipImg = util.findElement(`#${shipName}`);
            shipImg.setAttribute('draggable', 'false');
            shipImg.style.opacity = 0.4;
        }
    });
}

  getProjectedCoords = (startCoord, length, direction) => {
    const rows = "ABCDEFGHIJ";
    const row = startCoord[0];
    const col = parseInt(startCoord.slice(1));

    const coords = [];

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        coords.push(`${row}${col + i}`);
      } else {
        const newRow = rows[rows.indexOf(row) + i];
        if (newRow) coords.push(`${newRow}${col}`);
      }
    }

    return coords;
  };

  isValidPlacement = (coords, player) => {
    const allShipCoords = player.ships.flatMap((ship) => ship.location);
    return coords.every((coord) => {
      const row = coord[0];
      const col = parseInt(coord.slice(1));
      const validRow = "ABCDEFGHIJ".includes(row);
      const validCol = col >= 1 && col <= 10;
      return validRow && validCol && !allShipCoords.includes(coord);
    });
  };

  changeContentBox = (e) => {
    const id = e.target.id;
    util.clearContent("#contentBox");

    if (id === "computerPlayer") {
      this.createPlayers("computer", (playerArray) => {
        const [player1, player2] = playerArray;
        this.startGame(playerArray);
      });
    } else if (id === "secondPlayer") {
      this.createPlayers("secondPlayer", (playerArray) => {
        const [player1, player2] = playerArray;
        this.startGame(playerArray);
      });

      // blank out the screen first and ask the second player to give the first player privacy to place ships and ask for the first players name
      // then when done and name input, generate the first players board and allow them to place ships
      // once done have the screen blank and then ask the second player to take over and the first to give privacy and for the second players name
      // generate a board for the second player and allow them to place ships
      // once done, switch to player 1's turn and show 2 boards on screen, a blank one that tracks where the user has attacked and where they will select spots
      // the second board will show the locations of the players ships and where the second player has tried to attack
    }
  };

  displayGameboard = (player) => {
    util.clearContent("#contentBox");
    this.generateBoard("#contentBox", `${player.playerNumber}-board`);
    this.loadBoardData(player);
  };

  loadBoardData = (player) => {
    if (player.playerNumber === "p1") {
      for (let ship of player.ships) {
        //place the ships at the ship.location coords, should have coords matching the hitpoints of the ship/ player 1
      }
    } else {
      for (let ship of player.ships) {
        //place player 2 ships at the coords in playerArray.ships.location
      }
    }
  };

  generateBoard = (parentSelector, boardId) => {
    const parent = util.findElement(parentSelector);
    const title = document.createElement("h2");
    title.innerHTML = ``;
    const board = document.createElement("div");
    board.classList.add("gameboard");
    board.setAttribute("id", boardId);

    const rows = "ABCDEFGHIJ";
    for (let r = 0; r < 10; r++) {
      for (let c = 1; c <= 10; c++) {
        const cell = document.createElement("div");
        const coord = `${rows[r]}${c}`;
        cell.classList.add("cell");
        cell.setAttribute("data-coord", coord);
        cell.setAttribute("id", `${boardId}-${coord}`);
        board.appendChild(cell);
      }
    }

    parent.appendChild(board);
  };

  createPlayers = (typeOfPlayer, onPlayersReady) => {
    let playerForm = util.findElement("#contentBox");
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

    const form = util.findElement("#playerForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = util.findElement("#playerName").value;
      const player1 = new Player(name, "p1", false);
      this.player2Create(typeOfPlayer, (player2) => {
        player1.setOpponent(player2);
        player2.setOpponent(player1);
        onPlayersReady([player1, player2]);
      });
    });
  };

  player2Create = (playerType, onPlayer2Ready) => {
    if (playerType === "computer") {
      const player2 = new Player("Computer", "p2", true);
      onPlayer2Ready(player2);
    } else if (playerType === "secondPlayer") {
      util.clearContent("#contentBox");
      let playerForm = util.findElement("#contentBox");
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
      const form = util.findElement("#playerForm");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = util.findElement("#playerName").value;
        const player2 = new Player(name, "p2", false);
        onPlayer2Ready(player2);
      });
    }
  };
}
export { Page };
