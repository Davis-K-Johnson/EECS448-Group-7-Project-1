class Ship {
    constructor(length) {
        this.length = length;
        this.HP = length;
        this.orientation = "H"; // Default Horizontal
    }

    // Call if user wishes for orientation to be switched
    switchOrientation() {
        if (this.orientation = "V") {
            this.orientation = "H";
        }
        else {
            this.orientation = "V";
        }
    }

    // main.js will have the logic to make sure it's a valid position.
    setPosition(r, c) {
        this.r = r;
        this.c = c;
    }

    // This method can be used after setPosition has been called
    // The array of coordinates will be used to mark the board with it's position
    getPosition() {
        if (this.r != null && this.c != null) {
            coor = [];

            for (let i = 0; i < this.length; i++) {
                if (this.orientation == "H") {
                    coor[i] = [this.r, this.c + i];
                }
                else {
                    coor[i] = [this.r + i, this.c];
                }
            }

            return coor;
        }
        else {
            return []
        }
    }

    // Knowing the this.length, this.r, and this.c checked to see
    // if given (r, c) correspond to any of its coordinates.
    isHit(r, c) {
        if (this.orientation == "H") { // Horizontal Check
            for (let i = 0; i < this.length; i++) {
                if (r == this.r && c == this.c + i) {
                    return true;
                }
            }
        }
        else { // Verticle Check
            for (let i = 0; i < this.length; i++) {
                if (r == this.r + i && c == this.c) {
                    return true;
                }
            }
        }

        return false;
    }

    // The board logic should check before this function is called to see a hit
    setHit() {
        this.HP--;
    }

    // If HP gets to zero then the ship is sunk
    isSunk() {
        if (this.HP <= 0) {
            return true;
        }
        return false;
    }
}