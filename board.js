/*

Columns: [A-J] (10 total)
Rows:    [1-9] (9 total)
Positions: (r, c)
Key:                        Game:
. X X X . . . . . .         . . . . . . . 2 2 #
. . . . . . . . . .         . . # . . . . . . .
. . . . . . . X . .         . . 3 . . . . . . .
. . X X . . . X . .         . . 3 . . . . . . .
. . . . . . . X . .         . . 3 . . . # . . .
. . . . . . . X . .         . . . . . # 0 0 0 .
X . . . . . . . . .         . . . . . . # . . .
. . . . . . . . . .         . . . # . . . . . .
. . . . . . . . . .         # . . . . . . . . .

Symbols:
.   -> Open Water
X   -> Ship
#   -> Miss
0   -> Hit
1-6 -> Sunken Ship

Shooting Logic:
    Get Coordinates (r, c)
    |
    isValidHit -- False -- Reshoot
    |
    True
    |
    isHit -- False -- setKeyMiss & setGameMiss
    |
    True
    |
    findHitShip --- shipIndex (sI)
                    |
                    ships[sI].setHit
                    |
                    ships[sI].isSunk -- False -- setKeyHit & setGameHit
                    |
                    True
                    |
                    ships[sI].getPosition
                    |
                    coords
                    |
                    setKeySunkShip(sI+1, coords)   [use (sI+1) bc ship index is 1 - ship.length]
                    setGameSunkShip(sI+1, coords)
                    SunkShip()
                    |
                    isGameOver() -- False -- Switch Sides
                    |
                    True
                    |
                    End Game



*/

class Board {
    constructor(shipNum) {
        this.shipNum = shipNum;
        this.shipsSunk = 0;
        this.key = [];
        this.game = [];
        for (let r = 0; r < 9; r++) {
            this.key[r] = [];
            this.game[r] = [];
            for (let c = 0; c < 10; c++) {
                this.key[r][c] = ".";
                this.game[r][c] = ".";
            }
        }
        this.ships = [];
        for (let i = 0; i < this.shipNum; i++) {
            this.ships[i] = new Ship(i+1);
        }
    }

    /**
     * Makes sure that the ship coordinates are in a valid setup position
     * @param {number} shipIndex a spot in the ships array
     * @returns {boolean} shows if the coordinates are valid
     */
    isValidSetShip(shipIndex) {
        let coords = this.ships[shipIndex].getPosition();
        console.log("IsValidSetShip Coords: ", coords);
        for (let i = 0; i < shipIndex + 1; i++) {
            let c = coords[i];
            if (this.key[c[0]][c[1]] != ".") {
                return false;
            }
        }
        return true;
    }

    /**
     * Takes shipIndex, gets the ship coordinates, and updates the key
     * @param {number} shipIndex a spot in the ships array
     */
    setShip(shipIndex) {
        let coords = this.ships[shipIndex].getPosition();
        console.log("setShip Coords: ", coords);
        for (let i = 0; i < shipIndex + 1; i++) {
            let c = coords[i];
            this.key[c[0]][c[1]] = "X";
        }
    }

    /**
     * Checks the board's game to see if it's a valid shot due to being open water
     * @param {number} r row index
     * @param {number} c column index
     * @returns {boolean} shows if the shot location is valid
     */
    isValidShot(r, c) {
        if (this.game[r][c] == ".") {
            return true;
        }
        return false;
    }

    /**
     * Checks the board's key to see if it's been hit
     * @param {number} r row index
     * @param {number} c column index
     * @returns {boolean} checks if the key has been hit
     */
    isHit(r, c) {
        if (this.key[r][c] == "X") {
            return true;
        }
        return false;
    }

    /**
     * Changes the coordinate value of the key to a "#" to indicate a miss on the opponent's board
     * @param {number} r row index
     * @param {number} c column index
     */
    // Use this on the opponents board if missed
    // Meaning if p1 misses call board_p2.setKeyMiss(r,c);
    // and if p2 misses call board_p1.setKeyMiss(r,c);
    setKeyMiss(r, c) {
        this.key[r][c] = "#";
    }

    /**
     * Changes the coordinate value of the game to a "#" to indicate a miss on the current player's board
     * @param {number} r row index
     * @param {number} c column index
     */
    // Use this on the current users board if missed
    // Meaning if p1 misses call board_p1.setGameMiss(r,c);
    // and if p2 misses call board_p2.setGameMiss(r,c);
    setGameMiss(r, c) {
        this.game[r][c] = "#";
    }

    /**
     * Iterates through all the board's ships and returns the index of the ship that isHit() at the hit location
     * @param {number} r row index
     * @param {number} c column index
     * @returns {number} the index of the ship that was hit
     */
    findHitShip(r, c) {
        let shipIndex = -1
        for (let i = 0; i < this.shipNum; i++) {
            if (this.ships[i].isHit(r,c)) {
                shipIndex = i;
            }
        }
        return shipIndex;
    }

    /**
     * Changes the coordinate value of the key to a "0" to indicate a hit on the opponent's board
     * @param {number} r row index
     * @param {number} c column index
     */
    // Use this on the opponents board if hit
    // Meaning if p1 hits call board_p2.setKeyHit(r,c);
    // and if p2 hits call board_p1.setKeyHit(r,c);
    setKeyHit(r, c) {
        this.key[r][c] = "0";
    }

    /**
     * Changes the coordinate value of the game to a "0" to indicate a hit on the current player's board
     * @param {number} r row index
     * @param {number} c column index
     */
    // Use this on the current users board if hit
    // Meaning if p1 hits call board_p1.setKeyHit(r,c);
    // and if p2 hits call board_p2.setKeyHit(r,c);
    setGameHit(r, c) {
        this.game[r][c] = "0";
    }

    /**
     * Changes the coordinate values of an entire ship on the key to the
     * ship's length to indicate a sunken ship on the opponent's board
     * @param {number} shipLength the length of the given ship
     * @param {Array} coords an array of the given ship's coords
     */
    // Use this on the opponents board if sunk ship
    // Meaning if p1 sinks a ship call board_p2.setKeySunkShip(sI+1, coords);
    // and if p2 sinks a ship call board_p1.setKeySunkShip(sI+1, coords);
    setKeySunkShip(shipLength, coords) {
        var shipChar = shipLength.toString();
        for(let i = 0; i < shipLength; i++) {
            var coord = coords[i];
            this.key[coord[0]][coord[1]] = shipChar;
        }
    }

    /**
     * Changes the coordinate values of an entire ship on the game to the
     * ship's length to indicate a sunken ship on the current player's board
     * @param {number} shipLength the length of the given ship
     * @param {Array} coords an array of the given ship's coords 
     */
    // Use this on the current users board if sunk ship
    // Meaning if p1 sinks a ship call board_p1.setGameSunkShip(sI+1, coords);
    // and if p2 sinks a ship call board_p2.setGameSunkShip(sI+1, coords);
    setGameSunkShip(shipLength, coords) {
        var shipChar = shipLength.toString();
        for (let i = 0; i < shipLength; i++) {
            var coord = coords[i];
            this.game[coord[0]][coord[1]] = shipChar;
        }
    }

    /**
     * Add one to the number of sunk ships on the opponen't board
     */
    // Call if current user sinks a ship
    // Meaning if p1 sinks a ship then call board_p1.SunkShip()
    // and if p2 sinks a ship then call board_p2.SunkShip()
    SunkShip() {
        this.shipsSunk++;
    }

    isGameOver() {
        if (this.shipsSunk == this.shipNum) {
            return true;
        }
        return false;
    }
}

