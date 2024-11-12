import React, { useState, useEffect } from 'react';
import './Sudoku.css';

const Sudoku = () => {
    const [board, setBoard] = useState(generateRandomBoard());
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        createBoard(board);
    }, [board]);

    function createBoard(initialBoard) {
        const sudokuContainer = document.getElementById('sudokuContainer');
        sudokuContainer.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                if ((i % 3 === 0 && i !== 0) || (j % 3 === 0 && j !== 0)) {
                    cell.classList.add('subgrid-border');
                }

                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;

                if (initialBoard[i][j] !== null) {
                    input.value = initialBoard[i][j];
                    input.disabled = true; // Disable inputs for pre-filled cells
                } else {
                    input.addEventListener('input', () => validateInput(input)); // Validate input on change
                }

                cell.appendChild(input);
                sudokuContainer.appendChild(cell);
            }
        }
    }

    function validateInput(input) {
        const value = input.value;
        if (!/^[1-9]$/.test(value)) {
            input.value = '';
            alert('Please enter a number between 1 and 9');
        }
    }

    function checkSolution() {
        const cells = document.querySelectorAll('.cell input');
        const newBoard = Array.from({ length: 9 }, () => Array(9).fill(null));

        let emptyCellExists = false;

        cells.forEach((cell, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            newBoard[row][col] = cell.value ? parseInt(cell.value, 10) : null;

            if (cell.value === '') {
                emptyCellExists = true;
            }
        });

        if (emptyCellExists) {
            setBoard(fillAllCells());
            setStatusMessage('⚠️ All cells filled automatically.');
            return;
        }

        if (isValidSudoku(newBoard)) {
            setStatusMessage('🎉 Congratulations! The solution is correct.');
        } else {
            setStatusMessage('❌ The solution is incorrect. Please try again.');
        }
    }

    function isValidSudoku(board) {
        for (let i = 0; i < 9; i++) {
            const row = new Set();
            const col = new Set();

            for (let j = 0; j < 9; j++) {
                if (board[i][j]) {
                    if (row.has(board[i][j])) return false;
                    row.add(board[i][j]);
                }
                if (board[j][i]) {
                    if (col.has(board[j][i])) return false;
                    col.add(board[j][i]);
                }
            }

            if (Array.from(row).length > 2 || Array.from(col).length > 2) {
                return false;
            }
        }
        return true;
    }

    function fillAllCells() {
        const filledBoard = Array.from({ length: 9 }, () => Array(9).fill(null));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                filledBoard[i][j] = Math.floor(Math.random() * 9) + 1;
            }
        }
        return filledBoard;
    }

    function generateRandomBoard() {
        const newBoard = Array.from({ length: 9 }, () => Array(9).fill(null));
        for (let i = 0; i < 9; i++) {
            let count = 0;
            while (count < 3) { // Pre-fill 3 cells per row for a random setup
                const col = Math.floor(Math.random() * 9);
                const num = Math.floor(Math.random() * 9) + 1;
                if (isSafe(newBoard, i, col, num)) {
                    newBoard[i][col] = num;
                    count++;
                }
            }
        }
        return newBoard;
    }

    function isSafe(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;

            const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (board[boxRow][boxCol] === num) return false;
        }
        return true;
    }

    function changeBoard() {
        const newBoard = generateRandomBoard();
        setBoard(newBoard);
        setStatusMessage('');
    }

    return (
        <div className="sudoku-game">
            <h1>Sudoku</h1>
            <div id="sudokuContainer" className="sudoku-container"></div>
            <div className="buttons">
                <button className="button" onClick={changeBoard}>New Board</button>
                <button className="button" onClick={checkSolution}>Check Solution</button>
            </div>
            <p className="status-message">{statusMessage}</p>
        </div>
    );
};

export default Sudoku;
