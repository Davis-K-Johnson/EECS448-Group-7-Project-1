/*
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
*/

/*
Questions:
If we have two players, do we need some kind of matchmaking?
Should it be you vs the cpu?
*/

let canvas;
let context;

// used to draw all elements to the canvas
function drawCanvas()
{
    drawGrid();
    //fillGrid(1);
    //fillGrid(2);
}

// used to draw the grid with which will contain information for the game.
function drawGrid()
{
    context.beginPath();
    
    //draw the horizontal lines on the left grid
    context.moveTo(100, 75);
    for(var i = 0; i < 11; i++)
    {
        context.moveTo(100 + (i*65), 75);
        context.lineTo(100 + (i*65), 75 + (9*65));
    }
    //draw the vertical lines on the left grid
    context.moveTo(100, 75);
    for(var i = 0; i < 10; i++)
    {
        context.moveTo(100 , 75 + (i*65));
        context.lineTo(100 + (10*65), 75 + (i*65));
    }
    //draw the horizontal lines on the right grid
    context.moveTo(1000, 75);
    for(var i = 0; i < 11; i++)
    {
        context.moveTo(1000 + (i*65), 75);
        context.lineTo(1000 + (i*65), 75 + (9*65));
    }
    //draw the vertical lines on the right grid
    context.moveTo(1000, 75);
    for(var i = 0; i < 10; i++)
    {
        context.moveTo(1000 , 75 + (i*65));
        context.lineTo(1000 + (10*65), 75 + (i*65));
    }

    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    //set the column indicators above the grids
    let column = "ABCDEFGHIJ";
    for(var k = 0; k < 11; k++)
    {
        context.fillText(column.charAt(k), 125 + (k*65), 60);
        context.fillText(column.charAt(k), 1025 + (k*65), 60);
    }

    //set the row indicators beside the grids
    for(var k = 0; k < 9; k++)
    {
        context.fillText(k + 1, 65, 115 + (k*65));
        context.fillText(k + 1, 965, 115 + (k*65));
    }
}

// used to fill the grid of either player with updated indicators.
function fillGrid(player)
{
    for (var i = 0; i < 10; i++)
    {
        if(player == 1)
        {

        }
        if(player == 2)
        {

        }
    }
}

function tick() {
    window.requestAnimationFrame(refresh);
  }

function refresh(n) {
    context.clearRect(0,0,canvas.width,canvas.height)
    context.font = "18pt Georgia"
    context.fillStyle = "black";
    drawCanvas();
    tick();
  }

document.addEventListener("DOMContentLoaded", () => { 
    canvas = document.querySelector("#gameCanvas");
    context = canvas.getContext("2d");
    refresh();
  })

//Function used to translate click coordinates into grid coordinates.
function clickCoord(x, y)
{
    let colDecode = "ABCDEFGHIJ"
    let col;
    let row;
    let playerBoard;
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 9; j++)
        {
           if((x > 155 + i*65) && (x < 220 + i*65)){
               if((y > 84 + j*65) && (y < 147 + j*65)){
                   col = colDecode.charAt(i);
                   row = j+1;
                   playerBoard = 1;
                }
            }
           if((x > 1056 + i*65) && (x < 1120 + i*65)){
                if((y > 84 + j*65) && (y < 147 + j*65)){
                    col = colDecode.charAt(i);
                    row = j+1;
                    playerBoard = 2;
                }
            }
        }
    }
    console.log(x, y); //used to debug values produced by clickCoord
    console.log(col, row);
    console.log(playerBoard);
    //return the col, row, and playerBoard values inside an object, reference them via clickCoord(event.pageX, event.pageY).row (or col).
    return {
        col,
        row,
        playerBoard
    }
}

//Prototype click event listener.
document.addEventListener('mousedown', function(event) {
    //clickCoord(event.pageX, event.pageY); USED TO DEBUG
    //need to detect what we want the coordinates to do.
    //in the intro phase of the game we need the coordinates to be referenced in a setShip call.
    //in the game phase of the game we need the coordinates to be referenced in an isValidHit call.
    
    
})
