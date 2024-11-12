import React, { useState, useEffect } from 'react';
import './WordSearch.css';

const WordSearch = () => {
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [wordsToFind, setWordsToFind] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const gridSize = 15; // Adjustable grid size

  useEffect(() => {
    generateNewGame();
  }, []);

  const generateNewGame = () => {
    const words = [
      'EXAMPLE', 'WORD', 'SEARCH', 'PUZZLE', 'REACT',
      'GAME', 'FUN', 'CODING', 'PROGRAMMING', 'JAVASCRIPT',
      'COMPUTER', 'KEYBOARD', 'MOUSE', 'SCREEN', 'NETWORK',
      'INTERNET', 'DEVELOPER', 'APPLICATION', 'FUNCTION',
      'VARIABLE', 'ARRAY', 'OBJECT', 'STRING', 'NUMBER',
    ];
    setWordsToFind(words);
    const newGrid = createEmptyGrid();
    placeWordsInGrid(newGrid, words);
    fillRandomLetters(newGrid);
    setGrid(newGrid);
    setFoundWords([]);
    setSelectedLetters([]);
  };

  const createEmptyGrid = () => {
    return Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
  };

  const placeWordsInGrid = (grid, words) => {
    words.forEach(word => {
      let placed = false;
      while (!placed) {
        const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        if (canPlaceWord(grid, word, row, col, direction)) {
          for (let i = 0; i < word.length; i++) {
            if (direction === 0) grid[row][col + i] = word[i]; // Horizontal
            else if (direction === 1) grid[row + i][col] = word[i]; // Vertical
            else grid[row + i][col + i] = word[i]; // Diagonal
          }
          placed = true;
        }
      }
    });
  };

  const canPlaceWord = (grid, word, row, col, direction) => {
    if (direction === 0 && col + word.length > gridSize) return false; // Horizontal
    if (direction === 1 && row + word.length > gridSize) return false; // Vertical
    if (direction === 2 && (row + word.length > gridSize || col + word.length > gridSize)) return false; // Diagonal

    for (let i = 0; i < word.length; i++) {
      const r = direction === 0 ? row : direction === 1 ? row + i : row + i;
      const c = direction === 0 ? col + i : direction === 1 ? col : col + i;
      if (grid[r][c] && grid[r][c] !== word[i]) return false;
    }
    return true;
  };

  const fillRandomLetters = (grid) => {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!grid[i][j]) {
          grid[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Random letter A-Z
        }
      }
    }
  };

  const handleLetterClick = (rowIndex, colIndex) => {
    const letterKey = `${rowIndex}-${colIndex}`;

    if (selectedLetters.includes(letterKey)) {
      setSelectedLetters(selectedLetters.filter(key => key !== letterKey));
    } else {
      setSelectedLetters((prev) => [...prev, letterKey]);
    }

    if (selectedLetters.length + 1 >= 3) {
      checkForWord();
    }
  };

  const checkForWord = () => {
    const selectedWord = selectedLetters.map(key => grid[key.split('-')[0]][key.split('-')[1]]).join('');
    if (wordsToFind.includes(selectedWord)) {
      setFoundWords((prev) => [...prev, selectedWord]);
      setSelectedLetters([]);
    } else {
      // If no match, reset the selected letters after a short delay
      setTimeout(() => {
        setSelectedLetters([]);
      }, 500);
    }
  };

  useEffect(() => {
    if (foundWords.length === wordsToFind.length) {
      setTimeout(() => {
        alert('All words found! Starting a new game...');
        generateNewGame();
      }, 1000);
    }
  }, [foundWords]);

  return (
    <div className="word-search">
      <h2>Word Search Game</h2>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="grid-row" key={rowIndex}>
            {row.map((letter, colIndex) => (
              <div
                key={colIndex}
                className={`grid-letter 
                  ${foundWords.includes(letter) ? 'found' : ''} 
                  ${selectedLetters.includes(`${rowIndex}-${colIndex}`) ? 'selected' : ''}`}
                onClick={() => handleLetterClick(rowIndex, colIndex)}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="found-words">
        <h3>Found Words:</h3>
        <ul>
          {foundWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordSearch;
