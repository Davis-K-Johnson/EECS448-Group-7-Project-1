class Ship {
    constructor(length) {
        this.length = length;
        this.HP = length;
        this.orientation = "H"; // Default Horizontal
    }

    // Call if user wishes for orientation to be switched
    switchOrientation() {
        if (this.orientation == "V") {
            this.orientation = "H";
        }
        else {
            this.orientation = "V";
        }
    }

    // main.js will have the logic to make sure it's a valid position.
    // Sets array this.coords base on position and orientation
    setPosition(r, c) {
        this.r = r;
        this.c = c;
        this.coords = [];
        for (let i = 0; i < this.length; i++) {
            if (this.orientation == "H") {
                this.coords[i] = [this.r, this.c + i];
            }
            else {
                this.coords[i] = [this.r + i, this.c];
            }
        }
    }

    // This method can be used after setPosition has been called
    // return this.coords
    getPosition() {
        if (this.r != null && this.c != null) {
            return this.coords;
        }
        else {
            return []
        }
    }

    // Iterates through this.coords to see if give (r, c) corresponds to any of the coordinates
    isHit(r, c) {
        for (let i = 0; i < this.length; i++) {
            let coord = this.coords[i];
            if (r == coord[0] && c == coord[1]) {
                return true;
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