//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const submitBtn = document.getElementById("submit");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names");
        return;
    }

    document.getElementById("input-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";

    message.innerText = `${player1}, you're up`;
});

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        cell.innerText = currentPlayer.toLowerCase();

        if (checkWinner()) {
            gameActive = false;
            let winnerName = currentPlayer === "X" ? player1 : player2;
            message.innerText = `${winnerName} congratulations you won!`;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        let nextPlayer = currentPlayer === "X" ? player1 : player2;
        message.innerText = `${nextPlayer}, you're up`;
    });
});

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return winPatterns.some(pattern => {
        let [a, b, c] = pattern;
        return board[a] &&
               board[a] === board[b] &&
               board[a] === board[c];
    });
}