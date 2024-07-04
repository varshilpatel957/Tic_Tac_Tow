// Variables to store player names
let player1Name = "";
let player2Name = "";

// DOM elements
const playerNamesContainer = document.getElementById('player-names');
const gameContainer = document.getElementById('game-container');
const startGameButton = document.getElementById('start-game-button');
const turnMessageElement = document.getElementById('turn-message');
const restartButton = document.getElementById('restart-button');

// Event listener for Start Game button
startGameButton.addEventListener('click', function () {
    // Get player names from input fields
    player1Name = document.getElementById('player1-input').value.trim();
    player2Name = document.getElementById('player2-input').value.trim();

    // Validate names (at least Player 1 must have a name)
    if (player1Name === '') {
        alert("Player 1's name is required!");
        return;
    }

    // Hide player names input and show game board
    playerNamesContainer.style.display = 'none';
    gameContainer.style.display = 'flex';

    // Initialize game with player names
    initializeGame();
});

// Function to initialize the game
function initializeGame() {
    // Display initial turn message
    displayTurnMessage(currentPlayer);

    // Event listeners for all boxes
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', function () {
            // Get the id of the clicked box
            let boxId = box.id;

            // Call boxClicked function with boxId
            boxClicked(boxId);
        });
    });

    // Event listener for restart button
    restartButton.addEventListener('click', function () {
        // Call restartGame function
        restartGame();
    });
}

// Variable to track whose turn it is
let currentPlayer = 1; // Player 1 starts
let gameEnded = false;

// Function to display turn message
function displayTurnMessage(player) {
    let message = player === 1 ? `${player1Name}'s turn (X)` : `${player2Name}'s turn (O)`;
    if (turnMessageElement) {
        turnMessageElement.textContent = message;
        turnMessageElement.style.display = 'block';
    }
}

// Function to check if a player has won
function checkWin() {
    let board = [
        [document.getElementById('00').innerHTML, document.getElementById('01').innerHTML, document.getElementById('02').innerHTML],
        [document.getElementById('10').innerHTML, document.getElementById('11').innerHTML, document.getElementById('12').innerHTML],
        [document.getElementById('20').innerHTML, document.getElementById('21').innerHTML, document.getElementById('22').innerHTML]
    ];

    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return board[0][j];
        }
    }

    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    // Check if all boxes are filled (draw)
    let allFilled = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                allFilled = false;
                break;
            }
        }
        if (!allFilled) {
            break;
        }
    }
    if (allFilled) {
        return 'draw';
    }

    // No winner yet
    return null;
}

// Function to handle click event on boxes
function boxClicked(boxId) {
    if (gameEnded) return; // Do nothing if game has ended

    let box = document.getElementById(boxId);

    // Check if the box is empty (no X or O)
    if (box.innerHTML === '') {
        // Set X or O based on currentPlayer
        box.innerHTML = currentPlayer === 1 ? 'X' : 'O';

        // Check if there is a winner
        let winner = checkWin();
        if (winner) {
            // Game has ended
            gameEnded = true;

            // Display winner message or draw message with animations
            if (winner === 'draw') {
                displayDrawMessage();
            } else {
                displayWinnerMessage(winner === player1Name ? `${player1Name} (X)` : `${player2Name} (O)`);
            }

            // Show restart button
            restartButton.style.display = 'block';
        } else {
            // Toggle currentPlayer for the next turn
            currentPlayer = currentPlayer === 1 ? 2 : 1;

            // Display turn message
            displayTurnMessage(currentPlayer);
        }
    }
}

// Function to display draw message
function displayDrawMessage() {
    if (turnMessageElement) {
        turnMessageElement.textContent = "Game Draw!";
        turnMessageElement.style.display = 'block';
        turnMessageElement.classList.add('draw-message');
    }
}

// Function to display winner message
function displayWinnerMessage(winner) {
    if (turnMessageElement) {
        turnMessageElement.textContent = `${winner} wins!`;
        turnMessageElement.style.display = 'block';
        turnMessageElement.classList.add('winner-message');
    }
}

// Function to restart the game
function restartGame() {
    // Clear all box innerHTML
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.innerHTML = '';
    });

    // Reset currentPlayer to 1
    currentPlayer = 1;
    gameEnded = false;

    // Hide winner or draw message if shown
    if (turnMessageElement) {
        turnMessageElement.style.display = 'none';
        turnMessageElement.classList.remove('winner-message', 'draw-message');
    }

    // Hide restart button
    restartButton.style.display = 'none';

    // Display initial turn message
    displayTurnMessage(currentPlayer);
}
