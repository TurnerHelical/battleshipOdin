class Ship{

    constructor(shipName, length, location){
        this.shipName = shipName;
        this.length = length;
        this.timesHit = 0;
        this.isSunk = 'No';
        this.location = location;
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