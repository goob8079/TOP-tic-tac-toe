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

    function displayWinner() {
        if (checkRows() === playerArr[0].shape) {
            return `${playerArr[0].playerName} wins!`;
        } else if (checkRows() === playerArr[1].shape) {
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
// console.log(Gameboard.placeShape("X", 0, 0));
// console.log(Gameboard.placeShape("O", 0, 1));
// console.log(Gameboard.placeShape("X", 0, 2));
// console.log(Gameboard.placeShape("O", 1, 0));
// console.log(Gameboard.placeShape("O", 1, 1));
// console.log(Gameboard.placeShape("O", 1, 2));
// console.log(Gameboard.displayWinner());