//////////////////////////////////////////////
/                                            /
/     Battleship Game in HTML/Javascript     /
/                                            /
//////////////////////////////////////////////

----------------------------------------------------------------------------------
GAME RULES:
Battleship is a two player game.
Both Players secretly place 1 to 6 ships on a 9x10 grid.
Taking turns, each player announces where onthe opponent's grid they wish to fire.
The opponent must announce whether or not one of the ships was hit.
The first player to sink all of the opponent's ships wins.
----------------------------------------------------------------------------------
GAME SETUP:
Board Size: 9x10, columns denoted by letters (A-J), rows are denoted by number (1-9).
Number of Ships: Given by user, Minumum of 1 and a maximum of 6.
Types of Ships: This will be based on the ammount of ships chosen, If 1 ship is
chosen then each player gets a single 1x1 ship.
----------------------------------------------------------------------------------
PLAYING THE GAME:
Taking turns, the users pick a space on the opponent's board to "fire" at.
They must then be informed if the shot was a "hit" or "miss".
The player's view should be updated to reflect this.
After each shot, it is the other players turn.
----------------------------------------------------------------------------------
DESTROYING A SHIP:
Once a ship has been hit in every space it occupies, it is sunk.
For example, if the 1x3 ship occupies the space B3,B4 & B5.
Once the opponent has shot those three spaces, that hsip is sunk.
----------------------------------------------------------------------------------
PLAYER'S VIEW:
A player should have full view of their board and where their ships are placed.
Show how many times each ship has been hit.
A player should have a board to track all shots they've fired and whether they
were misses or hits.
----------------------------------------------------------------------------------
GAME END:
Once a player has sunk all of the opponent's ships, they immediatley win.
----------------------------------------------------------------------------------



///////////////////////////////////////////
/                                         /
/     Game Symbols and Shooting Logic     /
/                                         /
///////////////////////////////////////////

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
