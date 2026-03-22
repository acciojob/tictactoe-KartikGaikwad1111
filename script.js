let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const submitBtn = document.getElementById("submit");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

// Submit button
submitBtn.addEventListener("click", function () {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    document.getElementById("input-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";

    // IMPORTANT: exact format
    message.innerText = player1 + ", you're up";
});

// Cell click
cells.forEach((cell, index) => {
    cell.addEventListener("click", function () {

        if (board[index] !== "" || !gameActive) return;

        if (currentPlayer === "X") {
            cell.innerText = "x";   // MUST be lowercase
            board[index] = "X";
        } else {
            cell.innerText = "o";   // MUST be lowercase
            board[index] = "O";
        }

        // Check winner
        if (checkWinner()) {
            gameActive = false;

            let winner = currentPlayer === "X" ? player1 : player2;

            // IMPORTANT: exact string format
            message.innerText = winner + " congratulations you won!";
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        let next = currentPlayer === "X" ? player1 : player2;

        // IMPORTANT: exact format
        message.innerText = next + ", you're up";
    });
});

// Winner logic
function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]) {
            return true;
        }
    }

    return false;
}