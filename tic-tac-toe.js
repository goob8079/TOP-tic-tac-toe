// Gameboard is an IIFE
const Gameboard = (function() {
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

    function showPlayers() {
        return playerArr.map(player => `${player.playerName}: ${player.shape}`);
    }

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

    // check to see if either X or O has 3 in a row
    // private function
    function checkRows() {
        for (let i = 0; i < gameboardArr.length; i++) {
            const row = gameboardArr[i];
            const firstVal = row[0];

            if (firstVal !== null && row.every(val => val === firstVal)) {
                return firstVal;
            }
        }
        // if there are no winning rows
        return null;
    }

    function checkCols() {
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
    }

    function displayWinner() {
        if (checkRows() === playerArr[0].shape) {
            return `${playerArr[0].playerName} wins!`;
        } else if (checkRows() === playerArr[1].shape) {
            return `${playerArr[1].playerName} wins!`;
        }

        if (checkCols() === playerArr[0].shape) {
            return `${playerArr[0].playerName} wins!`;
        } else if (checkCols() === playerArr[1].shape) {
            return `${playerArr[1].playerName} wins!`;
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

    return { addPlayer, showPlayers, placeShape, displayWinner, displayBoard, };
})();

console.log(Gameboard.displayBoard());
Gameboard.addPlayer("bob", "x");
Gameboard.addPlayer("joe", "o");
console.log(Gameboard.showPlayers());
console.log(Gameboard.placeShape("X", 0, 0));
console.log(Gameboard.placeShape("O", 0, 1));
console.log(Gameboard.placeShape("X", 0, 2));
console.log(Gameboard.placeShape("X", 1, 0));
// console.log(Gameboard.placeShape("O", 1, 1));
// console.log(Gameboard.placeShape("O", 1, 2));
console.log(Gameboard.placeShape("X", 2, 0));
console.log(Gameboard.placeShape("O", 2, 1));
console.log(Gameboard.placeShape("X", 2, 2));
console.log(Gameboard.displayWinner());