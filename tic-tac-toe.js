const Gameboard = createGameboard();

const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
let msg = document.querySelector(".msg");

const cell1 = document.querySelector(".one")
const cell2 = document.querySelector(".two");
const cell3 = document.querySelector(".three");
const cells = document.querySelectorAll(".cell"); // turn into a NodeList

let currentPlayer;
let gameFin = false;

// start button 
document.querySelector("#start").addEventListener("click", () => {
    if (player1Input.value === "") player1Input.value = "player1";
    if (player2Input.value === "") player2Input.value = "player2";

    Gameboard.addPlayer(player1Input.value, "X");
    Gameboard.addPlayer(player2Input.value, "O");
    
    const player1 = Gameboard.getPlayer1();
    const player2 = Gameboard.getPlayer2();
    
    gameFin = false;
    currentPlayer = player1;
    msg.textContent = `${currentPlayer.playerName}'s turn`;
});

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (gameFin || cell.textContent !== "") return;
        
        const row = Math.floor(index / 3);
        const col = index % 3;
        
        cell.textContent = currentPlayer.shape;
        Gameboard.placeShape(currentPlayer.shape, row, col);
        
        const result = Gameboard.displayWinner();
        if (result) {
            msg.textContent = result;
            gameFin = true;
            return;
        }

        const player1 = Gameboard.getPlayer1();
        const player2 = Gameboard.getPlayer2();
        
        currentPlayer = (currentPlayer === player1 ? player2 : player1);
        msg.textContent = `${currentPlayer.playerName}'s turn`;
    });  
}); 

// reset button
document.querySelector("#reset").addEventListener("click", () => {
    Gameboard.resetGame()
    player1Input.value = "";
    player2Input.value = "";
    gameFin = false;
    currentPlayer = Gameboard.getPlayer1();

    cells.forEach(cell => cell.textContent = "");
});

// converted to function to be accessible from anywhere
function createGameboard() {
    let playerArr = [];

    // 3x3 gameboard to place shapes on
    let gameboardArr = [
        [null, null, null],
        [null, null, null],
        [null, null, null] 
    ];

    // factory function, no need for new keyword when declaring a new Player object
    const Player = function(name, shape) {
        return { playerName: name, shape: shape.toUpperCase() };
    };
    
    function addPlayer(name, shape) {
        const shapeU = shape.toUpperCase();
        //  shape check
        if (shapeU !== "O" && shapeU !== "X") {
            console.log(`${name}'s shape must be X or O`);
            return;
        } else {
            playerArr.push(Player(name, shape));
        }

        // check player amount
        if (playerArr.length > 2) {
            console.log("Too many players! Only 2 players allowed.");
            playerArr.pop();
        }

        return Player(name, shape);
    }

    function getPlayer1() {
        return playerArr[0];
    }
    
    function getPlayer2() {
        return playerArr[1];
    }

    // function showPlayers() {
    //     return playerArr.map(player => `${player.playerName}: ${player.shape}`);
    // }

    function placeShape(shape, row, col) {
        const shapeU = shape.toUpperCase();
        // shape check
        if (shapeU !== "X" && shapeU !== "O") {
            console.log("Invalid value, use X or O.");
        }

        // bounds check
        if (row < 0 || row > 2 || 
            col < 0 || col > 2) {
            console.log("Out of bounds! Place shape in bounds.");
        }

        // cell check
        if (gameboardArr[row][col] !== null) {
            console.log("This space is already taken!");
        }

        gameboardArr[row][col] = shapeU;
        return displayBoard();        
    }

    function displayWinner() {
        const rowWinner =  (() => {
            for (let i = 0; i < gameboardArr.length; i++) {
                const row = gameboardArr[i];
                const firstVal = row[0];

                if (firstVal !== null && row.every(val => val === firstVal)) {
                    return firstVal;
                }
            }
            // if there are no winning rows
            return null;
        })();
        
        const colWinner = (() => {
            let colArr = [];
            // checks every column in gameboardArr
            const arrCol = (arr, n) => arr.map(x => x[n]);

            // push every column into colArr
            // so first column will be colArr[0]
            for (let i = 0; i < gameboardArr.length; i++) {
                colArr.push(arrCol(gameboardArr, i));
            }

            // using the same logic as the checkRows() function
            for (let j = 0; j < colArr.length; j++) {
                const firstVal = colArr[j][0];
                
                // essentially checking every val in each "row"/index of colArr
                // with the first value and seeing if they are the same
                if (firstVal !== null && colArr[j].every(val => val === firstVal)) {
                    return firstVal;
                }
            }

            return null;
        })();

        const diagWinner = (() => {
            let downRight = gameboardArr.map((a, i) => a[i]);
            // the ... makes it so the gameboardArr won't be changed with reverse()
            let leftUp = [...gameboardArr].reverse().map((a, i) => a[i]);

            const downRightFirstVal = downRight[0];
            const leftUpFirstVal = leftUp[0];

            if (downRightFirstVal !== null && downRight.every(val => val === downRightFirstVal)) {
                return downRightFirstVal;
            } 
            
            if (leftUpFirstVal !== null && leftUp.every(val => val === leftUpFirstVal)) {
                return leftUpFirstVal;
            }
            
            return null;
        })();

        const winner = rowWinner || colWinner || diagWinner;
        
        if (winner === playerArr[0].shape) {
            return `${playerArr[0].playerName} wins!`;
        } else if (winner === playerArr[1].shape) {
            return `${playerArr[1].playerName} wins!`;
        }

        // turn the gameboardArr (2D array) into a 1D array with flat()
        const fullBoard = gameboardArr.flat().every(cell => cell !== null);
        if (fullBoard) {
            return `It's a draw!`;
        }
    }

    function displayBoard() {
        // .map() loops through each row of the board, 
        // then row.map() loops through each cell (index), and checks if the cell is null or undefined.
        // If it is either, it is replaced by a space (" ") and returned, otherwise any value already in it is returned.
        return gameboardArr
            .map(row => row.map(cell => cell ?? " ").join(" | "))
            .join("\n");
    }

    function resetGame() {
        playerArr = [];

        gameboardArr = [
            [null, null, null],
            [null, null, null],
            [null, null, null] 
        ];
    }

    return { addPlayer, getPlayer1, getPlayer2, placeShape, displayWinner, displayBoard, resetGame };
}