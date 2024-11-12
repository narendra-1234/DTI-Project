import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
    const [gameState, setGameState] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [isGameActive, setIsGameActive] = useState(true);
    const [statusMessage, setStatusMessage] = useState("It's X's turn");

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const handleCellClick = (index) => {
        if (gameState[index] || !isGameActive) return;

        const newGameState = gameState.slice();
        newGameState[index] = currentPlayer;
        setGameState(newGameState);

        if (checkGameResult(newGameState)) {
            setStatusMessage(`${currentPlayer} wins!`);
            setIsGameActive(false);
            createConfetti(); // Trigger confetti effect
            return;
        }

        if (!newGameState.includes(null)) {
            setStatusMessage("It's a Draw!");
            setIsGameActive(false);
            return;
        }

        const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(nextPlayer);
        setStatusMessage(`It's ${nextPlayer}'s turn`);
    };

    const checkGameResult = (currentGameState) => {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return currentGameState[a] && currentGameState[a] === currentGameState[b] && currentGameState[a] === currentGameState[c];
        });
    };

    const resetGame = () => {
        setGameState(Array(9).fill(null));
        setCurrentPlayer('X');
        setIsGameActive(true);
        setStatusMessage("It's X's turn");
    };

    const createConfetti = () => {
        const confettiCount = 100; // Number of confetti pieces
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Randomize position and duration for each confetti piece
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's'; // Random duration between 2s and 4s
            confetti.style.opacity = Math.random(); // Random opacity

            document.body.appendChild(confetti);

            // Remove confetti after animation ends
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    };

    return (
        <div className="tic-tac-toe">
            <h2>Tic Tac Toe</h2>
            <div id="board">
                {gameState.map((cell, index) => (
                    <div
                        key={index}
                        className={`cell ${cell === 'X' ? 'cell-x' : 'cell-o'}`}
                        onClick={() => handleCellClick(index)}
                    >
                        {cell}
                    </div>
                ))}
            </div>
            <div id="statusMessage">{statusMessage}</div>
            <button id="resetButton" onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default TicTacToe;
