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
let model = {
    game_size: 6, // chosen by the player, denotes how many ships the game will have.
    player_turn: 1, // determines which player's turn it is.
    game_status: "active", // states to determine what to place on canvas (initial, active, win, lose)

    // status of player_1's ships , true = afloat, false = sunk.
    p1_ship1: true, p1_ship2: true, p1_ship3: true,
    p1_ship4: true, p1_ship5: true, p1_ship6: true,

    // status of player_2's ships , true = afloat, false = sunk.
    p2_ship1: true, p2_ship2: true, p2_ship3: true,
    p2_ship4: true, p2_ship5: true, p2_ship6: true,

    // the key of each player that will be updated when each player places their ships.
    // this will be used as a reference when each shot is taken to determine a hit or miss.
    // will also be used to determine if an entire ship has sunk.
    key_p1_1: "#XXX#######", key_p1_2: "###########", key_p1_3: "###########", 
    key_p1_4: "###########", key_p1_5: "###########", key_p1_6: "###########",
    key_p1_7: "###########", key_p1_8: "###########", key_p1_9: "###########",

    key_p2_1: "###########", key_p2_2: "#####X#####", key_p2_3: "###########",
    key_p2_4: "###########", key_p2_5: "###########", key_p2_6: "###########",
    key_p2_7: "###########", key_p2_8: "###########", key_p2_9: "###########",

    // the game board of each player that will be updated when each player takes a shot.
    // this will keep track of the coordinates that have been shot at, with hits & misses.
    game_p1_1: "###########", game_p1_2: "###########", game_p1_3: "###########",
    game_p1_4: "###########", game_p1_5: "###########", game_p1_6: "###########",
    game_p1_7: "###########", game_p1_8: "###########", game_p1_9: "###########",

    game_p2_1: "###########", game_p2_2: "###########", game_p2_3: "###########",
    game_p2_4: "###########", game_p2_5: "###########", game_p2_6: "###########",
    game_p2_7: "###########", game_p2_8: "###########", game_p2_9: "###########",
}

// used to draw both the player 1 & player 2 grid.
function drawCanvas()
{
    if (model.game_status == "win") {
        //drawWin();
        return;
    }
    if (model.game_status == "lose") {
        //drawLose();
        return;
    }
    drawGrid();
    fillGrid(1);
    fillGrid(2);
}

// used to draw the grid with which will contain information for the game.
function drawGrid()
{
    context.beginPath();
    context.moveTo(175, 325); context.lineTo(675, 325); context.lineTo(675, 775);
    context.lineTo(175, 775); context.lineTo(175, 325); context.moveTo(225, 325);
    context.lineTo(225, 775); context.moveTo(275, 325); context.lineTo(275, 775);
    context.moveTo(325, 325); context.lineTo(325, 775); context.moveTo(375, 325);
    context.lineTo(375, 775); context.moveTo(425, 325); context.lineTo(425, 775);
    context.moveTo(475, 325); context.lineTo(475, 775); context.moveTo(525, 325);
    context.lineTo(525, 775); context.moveTo(575, 325); context.lineTo(575, 775);
    context.moveTo(625, 325); context.lineTo(625, 775); context.moveTo(175, 375);
    context.lineTo(675, 375); context.moveTo(175, 425); context.lineTo(675, 425);
    context.moveTo(175, 475); context.lineTo(675, 475); context.moveTo(175, 525);
    context.lineTo(675, 525); context.moveTo(175, 575); context.lineTo(675, 575);
    context.moveTo(175, 625); context.lineTo(675, 625); context.moveTo(175, 675);
    context.lineTo(675, 675); context.moveTo(175, 725); context.lineTo(675, 725);
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(875, 325); context.lineTo(1375, 325); context.lineTo(1375, 775);
    context.lineTo(875, 775); context.lineTo(875, 325); context.moveTo(925, 325);
    context.lineTo(925, 775); context.moveTo(975, 325); context.lineTo(975, 775);
    context.moveTo(1025, 325); context.lineTo(1025, 775); context.moveTo(1075, 325);
    context.lineTo(1075, 775); context.moveTo(1125, 325); context.lineTo(1125, 775);
    context.moveTo(1175, 325); context.lineTo(1175, 775); context.moveTo(1225, 325);
    context.lineTo(1225, 775); context.moveTo(1275, 325); context.lineTo(1275, 775);
    context.moveTo(1325, 325); context.lineTo(1325, 775); context.moveTo(875, 375);
    context.lineTo(1375, 375); context.moveTo(875, 425); context.lineTo(1375, 425);
    context.moveTo(875, 475); context.lineTo(1375, 475); context.moveTo(875, 525);
    context.lineTo(1375, 525); context.moveTo(875, 575); context.lineTo(1375, 575);
    context.moveTo(875, 625); context.lineTo(1375, 625); context.moveTo(875, 675);
    context.lineTo(1375, 675); context.moveTo(875, 725); context.lineTo(1375, 725);
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
}

// used to fill the grid of either player with updated indicators.
function fillGrid(player)
{
    for (var i = 0; i < 10; i++)
    {
        if(player == 1)
        {
            context.fillText(model.key_p1_1.charAt(i),193 +(i*50), 355);
            context.fillText(model.key_p1_2.charAt(i),193 +(i*50), 405);
            context.fillText(model.key_p1_3.charAt(i),193 +(i*50), 455);
            context.fillText(model.key_p1_4.charAt(i),193 +(i*50), 505);
            context.fillText(model.key_p1_5.charAt(i),193 +(i*50), 555);
            context.fillText(model.key_p1_6.charAt(i),193 +(i*50), 605);
            context.fillText(model.key_p1_7.charAt(i),193 +(i*50), 655);
            context.fillText(model.key_p1_8.charAt(i),193 +(i*50), 705);
            context.fillText(model.key_p1_9.charAt(i),193 +(i*50), 755);
        }
        if(player == 2)
        {
            context.fillText(model.key_p2_1.charAt(i),893 +(i*50), 355);
            context.fillText(model.key_p2_2.charAt(i),893 +(i*50), 405);
            context.fillText(model.key_p2_3.charAt(i),893 +(i*50), 455);
            context.fillText(model.key_p2_4.charAt(i),893 +(i*50), 505);
            context.fillText(model.key_p2_5.charAt(i),893 +(i*50), 555);
            context.fillText(model.key_p2_6.charAt(i),893 +(i*50), 605);
            context.fillText(model.key_p2_7.charAt(i),893 +(i*50), 655);
            context.fillText(model.key_p2_8.charAt(i),893 +(i*50), 705);
            context.fillText(model.key_p2_9.charAt(i),893 +(i*50), 755);
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

document.addEventListener("DOMContentLoaded", () => { 
    canvas = document.querySelector("#gameCanvas");
    context = canvas.getContext("2d");
    refresh();
  })