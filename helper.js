// Get Opponents playerTurn int
function op(playerTurn) {
    if (playerTurn == 0) {
        return 1;
    }
    return 0;
}

// Find if the current position is a valid placement for the ship
function isValidShipCoord(row, col, length, orientation) {
    if (orientation == "V") {
        if (col >= 0 && col <= 9) {
            if (row >= 0 && row < 9 - length) {
                return true;
            }
        }
    }
    else { // orientaion == "H"
        if (row >= 0 && row < 9) {
            if (col >= 0 && col <= 9 - length) {
                return true;
            }
        }
    }
    return false;
}