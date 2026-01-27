const cellElements = document.querySelectorAll(".game-board .cell");
const player1 = document.querySelector(".player .player1");
const player2 = document.querySelector(".player .player2");
const result = document.querySelector(".result");
const resultText = document.querySelector(".result h1");
const restartBtn = document.querySelector(".result button");
const image = document.querySelector(".result img");

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const playerO = "o";
const playerX = "x";
let toggleTurn = true;

cellElements.forEach(cell => {
    cell.onclick = () => {
        const currentPlayer = toggleTurn ? playerO : playerX;
        
        cell.classList.add("disabled", currentPlayer); 
        cell.textContent = currentPlayer; 

        if (checkWinner(currentPlayer)) {
            activateResult(currentPlayer.toUpperCase() + " wins the game!"); 
        } else if (isDraw()) {
            activateResult("It's a draw!"); 
        } else {
            swapPlayer();
        }
    };
});

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(playerO) || cell.classList.contains(playerX);
    });
}

function checkWinner(currentPlayer) {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
}

function swapPlayer() {
    toggleTurn = !toggleTurn;
    if (toggleTurn) {
        player1.classList.add("active");
        player2.classList.remove("active");
    } else {
        player1.classList.remove("active");
        player2.classList.add("active");
    }
}

function activateResult(message) {
    result.classList.remove("inactive"); 
    resultText.textContent = message; 
    if (message.includes("draw")) {
        image.style.display = "none"; 
    }
}

restartBtn.onclick = () => {
    window.location.reload(); 
}
