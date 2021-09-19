/**
 * Gets the playerTurn int of the opponent: 0 for player 1 and 1 for player 2
 * @param {number} playerTurn 
 * @returns {number}
 */
function op(playerTurn) {
    if (playerTurn == 0) {
        return 1;
    }
    return 0;
}

/**
 * Find out if the current position is a valid placement for a ship
 * @param {number} row 
 * @param {number} col 
 * @param {number} length 
 * @param {string} orientation 
 * @returns {boolean}
 */
function isValidShipCoord(row, col, length, orientation) {
    if (orientation == "V") {
        if (col >= 0 && col <= 9) {
            if (row >= 0 && row < 10 - length) {
                return true;
            }
        }
    }
    else { // orientaion == "H"
        if (row >= 0 && row < 9) {
            if (col >= 0 && col <= 10 - length) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Checks if a ship can change orientation and still be a valid placement at the current position
 * @param {number} row 
 * @param {number} col 
 * @param {number} length 
 * @param {string} orientation 
 * @returns {boolean}
 */
function canSwitchOrientation(row, col, length, orientation) {
    if (orientation == "V") {
        if (col >= 0 && col <= 10 - length) {
            return true;
        }
    }
    else { // orientation == "H"
        if (row >= 0 && row < 10 - length) {
            return true;
        }
    }
    return false;
}