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
        return { playerName: name, shape };
    };
    
    function addPlayer(name, shape) {
        playerArr.push(Player(name, shape));
        return Player(name, shape);
    }

    function showPlayers() {
        for (player of playerArr) {
            return player;
        }
    }

    function placeShape(shape, row, col) {
        const shapeU = shape.toUpperCase();

        // shape check
        if (shapeU !== "X" || shapeU !== "O") {
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
        displayBoard();
    }

    function displayBoard() {
        // .map() loops through each row of the board, 
        // then row.map() loops through each cell (index), and checks if the cell is null or undefined.
        // If it is either, it is replaced by a space (" ") and returned, otherwise any value already in it is returned.
        return gameboardArr
            .map(row => row.map(cell => cell ?? " ").join(' | '))
            .join("\n");
    }

    return { addPlayer, showPlayers, placeShape, displayBoard, };
})();

console.log(Gameboard.displayBoard());