class Ship{

    constructor(shipName, length){
        this.shipName = shipName;
        this.length = length;
        this.timesHit = 0;
        this.isSunk = 'No';
    }

    hit = () => {
        this.timesHit += 1
    };

    evalSunk = () => {
        if (this.timesHit === this.length) {
            this.isSunk = 'Yes';
        } else {
            return
        }
    }
}

export {Ship}