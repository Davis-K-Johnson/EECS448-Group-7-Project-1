class Board {
    constructor(shipNum) {
        this.shipNum = shipNum;
        this.opponentsShipsSunk = 0;
        this.playersShipSunk = 0;
        this.key = [];
        this.game = [];
        for (let r = 0; r < 9; r++) {
            this.key[r] = [];
            this.game[r] = [];
            for (let c = 0; c < 10; c++) {
                this.key[r][c] = "#";
                this.game[r][c] = "#";
            }
        }
        this.ships = [];
        for (let i = 0; i < this.shipNum; i++) {
            this.ships[i] = new Ship(i+1);
        }
    }

    findHitShip(r, c) {

    }
}