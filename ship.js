class Ship {
    constructor(length) {
        this.length = length;
        this.orientation = "H"; // Default Horizontal
    }

    setPosition(r, c) {
        this.r = r;
        this.r = c;
    }

    isHit(r, c) {
        if (this.orientation = "H") { // Horizontal Check
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

    switchOrientation() {
        if (this.orientation = "V") {
            this.orientation = "H";
        }
        else {
            this.orientation = "V";
        }
    }
}