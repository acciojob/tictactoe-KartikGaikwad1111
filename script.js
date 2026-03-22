// Get DOM elements
const setupSection = document.getElementById('setupSection');
const gameSection = document.getElementById('gameSection');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submit');
const resetBtn = document.getElementById('resetGame');
const cells = document.querySelectorAll('.cell');

// Game variables
let player1Name = '';
let player2Name = '';
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Function to update the message display
function updateMessage() {
    if (gameActive) {
        const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
        messageDiv.textContent = `${currentPlayerName}, you're up`;
    }
}

// Function to check for winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

// Function to check if board is full
function isBoardFull() {
    return boardState.every(cell => cell !== '');
}

// Function to handle cell click
function handleCellClick(index, cellElement) {
    // Check if cell is already filled or game is not active
    if (boardState[index] !== '' || !gameActive) {
        return;
    }
    
    // Mark the cell
    const mark = currentPlayer;
    boardState[index] = mark;
    cellElement.textContent = mark;
    
    // Check for winner
    const winner = checkWinner();
    if (winner) {
        const winnerName = winner === 'X' ? player1Name : player2Name;
        messageDiv.textContent = `${winnerName} congratulations you won!`;
        gameActive = false;
        return;
    }
    
    // Check for draw
    if (isBoardFull()) {
        messageDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage();
}

// Function to reset the game
function resetGame() {
    // Reset game state
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    // Clear all cells
    cells.forEach(cell => {
        cell.textContent = '';
    });
    
    // Update message
    updateMessage();
}

// Function to start the game with player names
function startGame() {
    // Get player names
    player1Name = document.getElementById('player-1').value.trim();
    player2Name = document.getElementById('player-2').value.trim();
    
    // Validate both names are entered
    if (player1Name === '' || player2Name === '') {
        alert('Please enter both player names');
        return;
    }
    
    // Hide setup section and show game section
    setupSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
    
    // Reset the game
    resetGame();
}

// Add click event listeners to all cells
cells.forEach((cell, idx) => {
    cell.addEventListener('click', () => {
        // Only process if game section is visible
        if (!gameSection.classList.contains('hidden')) {
            handleCellClick(idx, cell);
        }
    });
});

// Add event listener to submit button
submitBtn.addEventListener('click', startGame);

// Add event listener to reset button
resetBtn.addEventListener('click', () => {
    if (!gameSection.classList.contains('hidden')) {
        resetGame();
    }
});