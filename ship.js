class Ship {
    constructor(length) {
        this.length = length;
        this.HP = length;
        this.orientation = "H"; // Default Horizontal
    }

    /**
     * Switches the orientation of the ship in the place phase
     */
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
    /**
     * sets up the array this.coords with the values the player selected
     * @param {number} r 
     * @param {number} c 
     */
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
    /**
     * returns the coordinates of the ship after it's been put in place
     * @returns 
     */
    getPosition() {
        if (this.r != null && this.c != null) {
            return this.coords;
        }
        else {
            return []
        }
    }

    // Iterates through this.coords to see if give (r, c) corresponds to any of the coordinates
    /**
     * 
     * @param {number} r 
     * @param {number} c 
     * @returns {boolean}
     */
    isHit(r, c) {
        for (let i = 0; i < this.length; i++) {
            let coord = this.coords[i];
            if (r == coord[0] && c == coord[1]) {
                return true;
            }
        }

        return false;
    }

    /**
     * hits a ship, reducing its hp
     */
    setHit() {
        this.HP--;
    }

    /**
     * returns true if hp is 0 or less, false if not
     * @returns {boolean}
     */
    isSunk() {
        if (this.HP <= 0) {
            return true;
        }
        return false;
    }
}