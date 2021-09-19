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
- Create a "selection" square around the selected square before the shoot button is pressed. (Also usefull during Place Phase) **see setHighlight
- Finish the gamePhase logic by integrating the Shoot() function.
- Add visual elements that help the user. "Your Ships" indicators etc.

Davis Johnson: For tonight I couldn't figure out the place setHighlight function. However, the measurements for clickCoord are off in a way that
makes any click in column 1 of both boards undefined. I didn't write any of the measurements and as such didn't want to modify them to avoid
breaking it. I also added global ints for a selected row and column since we'll need those to save the selected space for the shoot function.

*/

let canvas;
let context;
let gamePhase = "setup"; //string that determines what state of the game is displayd {"setup", "place", "play", "end"}
let playerTurn = 0; //int that determines which player is able to shoot and on which board, changes with each shot. { 1, 0 }
let shipNum; //int that determines the number of ships to start the game. { 1, 2, 3, 4, 5, 6 }
let playerBoards = []; //an array of board classes. { 0 (player 1), 1 (player 2)}
let userShips; //int that holds the value the user gives during the setup phase, will be set = to shipNum.
let rowSelect; //int that stores a selected row for use after it's highlighted
let colSelect; //int that stores a selected column for use after it's highlighted

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
    //WHERE PRE-SHOT HIGHLIGHTING NEEDS TO BE APPLIED

}

//END GAME SCREEN
//function that displays which player won the game.
function gameEnd()
{
    if(playerTurn == 0){
        //fill the canvas with a win screen for p2
        context.fillText("Player 1 Win!", 750, 400);
    }
    if(playerTurn == 1){
        //fill the canvas with a win screen for p1
        context.fillText("Player 2 Win!", 750, 400);
    }
}

function setHighlight(x, y, board) //  NOT WORKING, NEEDS TO BE FIXED. THIS IS CALLED VIA A CLICK EVENT DURING THE SET PHASE, SEE click Event Listener @340
{
    x--;
    y--;
    //if the selection is on the left board, draws a red square surrounding selection.
    if(board == 0){
        context.beginPath();
        context.moveTo(100 + (x * 65), 75 + (y * 65));
        context.lineTo(165 + (x * 65), 75 + (y * 65));
        context.lineTo(165 + (x * 65), 140 + (y * 65));
        context.lineTo(100 + (x * 65), 140 + (y * 65));
        context.lineTo(100 + (x * 65), 75 + (y * 65));
        context.strokeStyle = 'red';
        context.lineWidth = 4;
        context.stroke();
        context.closePath();
    }
    //if the selection is on the right board, draws a red square surrounding selection.
    if(board == 1){
        context.beginPath();
        context.moveTo(100 + (x * 65), 75 + (y * 65));
        context.lineTo(165 + (x * 65), 75 + (y * 65));
        context.lineTo(165 + (x * 65), 140 + (y * 65));
        context.lineTo(100 + (x * 65), 140 + (y * 65));
        context.lineTo(100 + (x * 65), 75 + (y * 65));
        context.strokeStyle = 'red';
        context.lineWidth = 4;
        context.stroke();
        context.closePath();
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

    if(gamePhase == "place")
    {
        if(playerTurn == 0){
            context.fillText("Place your ships", 776, 450);
            context.fillText("<------", 820, 480);
            context.fillText("Ship being placed: 6", 300, 750);
            context.fillText("Orientation: V", 775, 750);3
            context.fillText("Confirm", 1300, 750);
            //context.beginPath();
        }
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
           if((x > 105 + i*65) && (x < 170 + i*65)){
               if((y > 85 + j*65) && (y < 150 + j*65)){
                   col = i+1;
                   row = j+1;
                   playerBoard = 0;
                }
            }
           if((x > 1056 + i*65) && (x < 1120 + i*65)){
                if((y > 84 + j*65) && (y < 147 + j*65)){
                    col = i+1;
                    row = j+1;
                    playerBoard = 1;
                }
            }
        }
    }
    console.log("clickBoard");
    console.log(col, row);
    console.log(playerBoard);
    //return the col, row, and playerBoard values inside an object, reference them via clickCoord(event.pageX, event.pageY).row (or col).
    return {
        col,
        row,
        playerBoard
    }
}
// NOT FINISHED, NEEDS TO CHECK THE playerTurn VALUE BEFORE STARTING LOGIC TREE, .setKeyHit & .setGameHit need to be called with different boards, not the same board.
function Shoot(r, c){
    if (isValidShot(r, c)) {
        if(isHit(r, c)) {
            
            let sI = playerBoards[playerTurn].findHitShip(r, c);
            playerBoards[playerTurn].ships[sI].setHit();

            if (playerBoards[playerTurn].ships[sI].isSunk()) {
                
                let coords = playerBoards[playerTurn].ships[sI].getPosition();
                playerBoards[op(playerTurn)].setKeySunkShip(sI + 1, coords);
                playerBoards[playerTurn].setGameSunkShip(sI + 1, coords);
                
                if(playerBoards[playerTurn].isGameOver()){
                    gamePhase = "end";
                }
            }
            else {
                playerBoards[op(playerTurn)].setKeyHit(r, c);
                playerBoards[playerTurn].setGameHit(r, c);
            }
        }
        else {
            playerBoards[op(playerTurn)].setKeyMiss(r, c);
            playerBoards[playerTurn].setGameMiss(r, c);
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
    if(gamePhase == "place"){
        //clickCoord(event.pageX, event.pageY);
    }
    if(gamePhase == "play"){
        rowSelect = clickCoord(event.pageX, event.pageY).row;
        colSelect = clickCoord(event.pageX, event.pageY).col;
        var turn = clickCoord(event.pageX, event.pageY).playerBoard;
        setHighlight(rowSelect, colSelect, turn);
    }
})