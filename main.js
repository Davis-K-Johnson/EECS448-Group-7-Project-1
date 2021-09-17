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

---------------------------------------------------
TO DO
---------------------------------------------------
- Finish the "place" phase where each player will place their ships.
- Create a "selection" square around the selected square before the shoot button is pressed.
- Finish the gamePhase logic by integrating the Shoot() function.
- Add visual elements that help the user. "Your Ships" indicators etc.

*/

let canvas;
let context;
let gamePhase = "setup"; //string that determines what state of the game is displayd {"setup", "place", "play", "end"}
let playerTurn = 0; //int that determines which player is able to shoot and on which board, changes with each shot. { 1, 0 }
let shipNum; //int that determines the number of ships to start the game. { 1, 2, 3, 4, 5, 6 }
let playerBoards = []; //an array of board classes. { 0 (player 1), 1 (player 2)}
let userShips; //int that holds the value the user gives during the setup phase, will be set = to shipNum.

//GAME INITIALIZATION
//function that creates the boards and sets the game phase to setup.
function gameSetup()
{
    context.fillText("Press a key:", 800, 210);
    context.fillText("Select a number of ships. 1-6", 720, 250);
    context.beginPath();
    context.moveTo(720, 600);
    context.lineTo(1000, 600);
    context.lineTo(1000, 700);
    context.lineTo(720, 700);
    context.lineTo(720, 600);
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
    context.fillText("Confirm Selection", 770, 655);
    if(userShips != null){
        context.fillText(userShips, 850, 450);
    }
}

function gamePlace()
{
    drawGrid();
    fillGrid();
    if(playerTurn == 0){

    }
    if(playerTurn == 0){
        
    }
}

//GAME LOGIC
//function that places the elements of the game on the canvas (grid, grid-elements) while the gamePhase == "play".
function gamePlay()
{
    drawGrid();
    fillGrid(playerTurn);
}

//END GAME SCREEN
//function that displays which player won the game.
function gameEnd()
{
    if(playerTurn == 0){
        //fill the canvas with a win screen for p2
        context.fillText("Player 1 Win!", 400, 700);
    }
    if(playerTurn == 1){
        //fill the canvas with a win screen for p1
        context.fillText("Player 2 Win!", 400, 700);
    }
}

//takes the user input and checks for a valid entry, if valid it sets the number of ships in the game.
function setShipNum(n){
    if(n != "1" && n != "2" && n != "3" && n != "4" && n != "5" && n != "6"){
        console.log("Throw");
        throw "Invalid number, pick again";
    }
    else{
        console.log("No Throw");
        shipNum = n;
    }
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
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            if(player == 0){
                context.fillText(playerBoards[player].key[r][c], 125 + r*65, 110 + c*65);
                context.fillText(playerBoards[player].game[r][c], 1027 + r*65, 110 + c*65);
            }
            if(player == 1){
                context.fillText(playerBoards[player].game[r][c], 100 + r*65, 100 + c*65);
                context.fillText(playerBoards[player].key[r][c], 100 + r*65, 100 + c*65);
            }
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
    if(gamePhase == 'setup'){
        gameSetup();
    }
    if(gamePhase == 'place'){
        gamePlace();
    }
    if(gamePhase == 'play'){
        gamePlay();
    }
    if(gamePhase == 'end'){
        gameEnd();
    }
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
    let col;
    let row;
    let playerBoard;
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 9; j++)
        {
           if((x > 155 + i*65) && (x < 220 + i*65)){
               if((y > 84 + j*65) && (y < 147 + j*65)){
                   col = i+1;
                   row = j+1;
                   playerBoard = 1;
                }
            }
           if((x > 1056 + i*65) && (x < 1120 + i*65)){
                if((y > 84 + j*65) && (y < 147 + j*65)){
                    col = i+1;
                    row = j+1;
                    playerBoard = 2;
                }
            }
        }
    }
    console.log(col, row);
    console.log(playerBoard);
    //return the col, row, and playerBoard values inside an object, reference them via clickCoord(event.pageX, event.pageY).row (or col).
    return {
        col,
        row,
        playerBoard
    }
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
    //                alert("Error: " + err + " .");
    //           }
    //      }
    // }
function Shoot(r, c){
    if( isValidShot(r, c) ){
        if( isHit(r, c)){
            ships[this.findHitShip(r, c)].setHit();
            if ( ships[this.findHitShip(r, c)].isSunk() ){
                const coords = ships[this.findHitShip(r, c)].getPosition();
                this.setKeySunkShip(this.findHitShip(r, c) + 1, coords);
                this.setGameSunkShip(this.findHitShip(r, c) + 1, coords);
                if(this.isGameOver()){
                    gamePhase = "end";
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

document.addEventListener("keydown", function(event){
    console.log(event.key);
    if(gamePhase == "setup"){
        userShips = event.key;
        //console.log(userShips);
    }
    if(gamePhase == "place"){
        if(event.key == 'h'){
            //call switch orientation
        }
        if(event.key == 'v'){
            //call switch orientation
        }
    }
})

document.addEventListener('mousedown', function(event) {
    console.log(event.pageX, event.pageY);
    if(gamePhase == "setup"){
        if(770 < event.pageX && 1056 > event.pageX){
            if(607 < event.pageY && 708 > event.pageY){
                try {
                    setShipNum(userShips);
                    playerBoards[0] = new Board(shipNum);
                    playerBoards[1] = new Board(shipNum);
                    gamePhase = "place";
                    }
                catch(err){
                    alert("Error: " + err + " .");
                    gameSetup();
                }
            }
        }
    }
    if(gamePhase == "play"){
        clickCoord(event.pageX, event.pageY);
    }
})