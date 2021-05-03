var player = 1; //1 For Yellow, 2 For Red. First Player Always Yellow
var game_active = false;
var count = 0;
var board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

//Setup The Game
function beginGame() {
    if (game_active == true) {
        return false
    };
    game_active = true;
    resetBoard();
    refreshBoard();
}

//Here Is Where Chips Being Placed
function chip(col) {
    for (row = 5; row >= 0; row--) {
        if (board[row][col] == 0) {
            board[row][col] = player;

            refreshBoard();
            count++;

            if (player == 1) {
                player = 2;
            } else {
                player = 1;
            }
            return true;
        }
    }
}

//Check Winning Condition For Yellow And Red
function winCondition() {
    //Check Winning Condition For Horizontal
    for (var i = 1; i <= 2; i++) {
        for (var col = 0; col <= 3; col++) {
            for (var row = 0; row <= 5; row++) {
                if (board[row][col] == i) {
                    if ((board[row][col + 1] == i) && (board[row][col + 2] == i) && (board[row][col + 3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }

    //Check Winning Condition For Vertical
    for (var i = 1; i <= 2; i++) {
        for (var col = 0; col <= 6; col++) {
            for (var row = 0; row <= 2; row++) {
                if (board[row][col] == i) {
                    if ((board[row + 1][col] == i) && (board[row + 2][col] == i) && (board[row + 3][col] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }

    //Check Winning Condition For Diagonal Down
    for (var i = 1; i <= 2; i++) {
        for (var col = 0; col <= 3; col++) {
            for (var row = 0; row <= 2; row++) {
                if (board[row][col] == i) {
                    if ((board[row + 1][col + 1] == i) && (board[row + 2][col + 2] == i) && (board[row + 3][col + 3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }

    //Check Winning Condition For Diagonal Up
    for (var i = 1; i <= 2; i++) {
        for (var col = 0; col <= 3; col++) {
            for (var row = 3; row <= 5; row++) {
                if (board[row][col] == i) {
                    if ((board[row - 1][col + 1] == i) && (board[row - 2][col + 2] == i) && (board[row - 3][col + 3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }
}

//End Game Output
function endGame(winner) {
    game_active = false;
    if (winner == 1) {
        document.getElementById('winnerInfo').innerHTML = "Yellow";
    } else {
        document.getElementById('winnerInfo').innerHTML = "Red";
    }

    document.getElementById('board').classList.add("avoid-clicks");
}


//Refresh Board
function refreshBoard() {
    winCondition();

    //Check When The Board Is Full
    if (count === 41) {
        document.getElementById('winnerInfo').innerHTML = "It's a draw!";
    }

    //Change Exist Chips Color
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 7; col++) {
            if (board[row][col] == 0) {
                document.getElementById("cell" + row + col).style.backgroundColor = "#FFFFFF";
            } else if (board[row][col] == 1) {
                document.getElementById("cell" + row + col).style.backgroundColor = "#FFFF00";
            } else if (board[row][col] == 2) {
                document.getElementById("cell" + row + col).style.backgroundColor = "#FF0000";
            }
        }
    }
}

//Reset Game When Button Click
function resetBoard() {
    for (row = 0; row < 6; row++) {
        for (col = 0; col < 7; col++) {
            board[row][col] = 0;
            count = 0;
            document.getElementById("cell" + row + col).style.backgroundColor = "#FFFFFF";
            document.getElementById('winnerInfo').innerHTML = "";
            document.getElementById('board').classList.remove("avoid-clicks");
            document.getElementById('colorTurn').innerHTML = "";
        }
    }

}