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

    // Checks this boards game to see if open water for valid shot
    isValidShot(r, c) {
        if (this.game[r][c] == ".") {
            return true;
        }
        return false;
    }

    // Checks this boards key to see if hit
    isHit(r, c) {
        if (this.key[r][c] == "X") {
            return true;
        }
        return false;
    }

    // This will change the coordinate value of the key to "#" (miss)
    // Use this on the opponents board if missed
    // Meaning if p1 misses call board_p2.setKeyMiss(r,c);
    // and if p2 misses call board_p1.setKeyMiss(r,c);
    setKeyMiss(r, c) {
        this.key[r][c] = "#";
    }

    // This will change the coordinate value of the game to "#" (miss)
    // Use this on the current users board if missed
    // Meaning if p1 misses call board_p1.setGameMiss(r,c);
    // and if p2 misses call board_p2.setGameMiss(r,c);
    setGameMiss(r, c) {
        this.game[r][c] = "#";
    }

    // Iterates through all the boards ships and returns the index of ship 
    // whose isHit function returns true with given coordinates
    findHitShip(r, c) {
        shipIndex = -1
        for (let i = 0; i < this.shipNum; i++) {
            if (this.ships[i].isHit(r,c)) {
                shipIndex = i;
            }
        }
        return shipIndex;
    }

    // This will change the coordinate value of the key to "0" (hit)
    // Use this on the opponents board if hit
    // Meaning if p1 hits call board_p2.setKeyHit(r,c);
    // and if p2 hits call board_p1.setKeyHit(r,c);
    setKeyHit(r, c) {
        this.key[r][c] = "0";
    }

    // This will change the coordinate value of the game to "0" (hit)
    // Use this on the current users board if hit
    // Meaning if p1 hits call board_p1.setKeyHit(r,c);
    // and if p2 hits call board_p2.setKeyHit(r,c);
    setGameHit(r, c) {
        this.game[r][c] = "0";
    }

    // This will set the coordinate values of the ship to its 
    // corresponding length (indicating that its sunk) on the key
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

    // This will set the coordinate values of the ship to its
    // corresponding length (indicating that its sunk) on the game
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

    // Add 1 to this.ShipsSunk
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

    // Going to make shoot function based off of logic tree @board.js.1
    // will be called via a click event while phase = game.
    // will be called with a player's turn already determined. Example call:
    // if(phase == 'game'){
    //      if(turn == clickCoord(event.pageX, event.pageY).playerTurn){
    //           try{
    //                Board[turn].Shoot(clickCoord(event.pageX, event.pageY).row, clickCoord(event.pageX, event.pageY).col));
    //           }
    //           catch(err){
    //                message.innerHTML = "Error: " + err + " .";
    //           }
    //      }
    // }
    Shoot(r, c){
        if( isValidShot(r, c) ){
            if( isHit(r, c)){
                ships[this.findHitShip(r, c)].setHit();
                if ( ships[this.findHitShip(r, c)].isSunk() ){
                    const coords = ships[this.findHitShip(r, c)].getPosition();
                    this.setKeySunkShip(this.findHitShip(r, c) + 1, coords);
                    this.setGameSunkShip(this.findHitShip(r, c) + 1, coords);
                    // at this point I would check to see if the game is over
                    // the logic tree says that if isGameOver() returns false to switch sides. switching sides will be done in main.js
                    // if the isGameOver() returns true then the game will end, but that will happen in main also. How should we check if the games
                    // is over but from main.js
                    if(this.isGameOver()){
                        
                    }
                }
                else {
                    this.setKeyHit(r, c);
                    this.setGameHit(r, c);
                }
            }
            else {
                this.setKeyMiss(r, c);
                this.setGameMiss(r, c);
            }
        }
        else {
            throw "invalid shot";
        }
    }
}

