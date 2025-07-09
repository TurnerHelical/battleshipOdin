import { Dom } from "./utils";

const util = new Dom();

class Page {

    changeContentBox = (this) => {
        util.clearContent('#contentBox');
        if (this.id === 'computerPlayer') {
            // ask for player name and initiate player objects
            // create a board on the screen and tell the user to place their ships
            // write logic for the computer to auto select ship placement
            
        } else  if (this.id === 'secondPlayer') {
            // blank out the screen first and ask the second player to give the first player privacy to place ships and ask for the first players name
            // then when done and name input, generate the first players board and allow them to place ships
            // once done have the screen blank and then ask the second player to take over and the first to give privacy and for the second players name
            // generate a board for the second player and allow them to place ships
            // once done, switch to player 1's turn and show 2 boards on screen, a blank one that tracks where the user has attacked and where they will select spots
            // the second board will show the locations of the players ships and where the second player has tried to attack
        } else {
            return
        }
    } 
}