/**
 * Gets the playerTurn int of the opponent: 0 for player 1 and 1 for player 2
 * @param {number} playerTurn shows whose turn it is
 * @returns {number} the number of the other player
 */
function op(playerTurn) {
    if (playerTurn == 0) {
        return 1;
    }
    return 0;
}

/**
 * Find out if the current position is a valid placement for a ship
 * @param {number} row row index
 * @param {number} col column index
 * @param {number} length the length of the ship
 * @param {string} orientation shows whether the ship is vertical or horizontal
 * @returns {boolean} tells if the position is valid
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
 * @param {number} row row index
 * @param {number} col column index
 * @param {number} length the length of the ship
 * @param {string} orientation shows whether the ship is vertical or horizontal
 * @returns {boolean} tells if the position is valid
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