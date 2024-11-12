import React, { useState, useEffect } from 'react';
import './puzzleGame.css';

const images = [
    "https://via.placeholder.com/300/FF5733", // Add your own URLs for variety
    "https://via.placeholder.com/300/33FF57",
    "https://via.placeholder.com/300/3357FF",
    "https://via.placeholder.com/300/FF33FF",
    "https://via.placeholder.com/300/FFFF33",
];

const PuzzleGame = ({ gridSize = 3 }) => {
    const totalTiles = gridSize * gridSize;
    const [tiles, setTiles] = useState([]);
    const [emptyTileIndex, setEmptyTileIndex] = useState(totalTiles - 1);
    const [isSolved, setIsSolved] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setImageUrl(getRandomImage());
        initializePuzzle();
    }, []);

    const getRandomImage = () => {
        return images[Math.floor(Math.random() * images.length)];
    };

    const initializePuzzle = () => {
        let initialTiles = Array.from({ length: totalTiles }, (_, i) => i);
        initialTiles = shuffleArray(initialTiles);
        setTiles(initialTiles);
        setEmptyTileIndex(initialTiles.indexOf(totalTiles - 1));
        setIsSolved(false);
    };

    const shuffleArray = (array) => {
        const shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const isAdjacent = (index) => {
        const emptyRow = Math.floor(emptyTileIndex / gridSize);
        const emptyCol = emptyTileIndex % gridSize;
        const tileRow = Math.floor(index / gridSize);
        const tileCol = index % gridSize;
        return (Math.abs(emptyRow - tileRow) === 1 && emptyCol === tileCol) ||
               (Math.abs(emptyCol - tileCol) === 1 && emptyRow === tileRow);
    };

    const handleTileClick = (index) => {
        if (isAdjacent(index)) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyTileIndex]] = [newTiles[emptyTileIndex], newTiles[index]];
            setTiles(newTiles);
            setEmptyTileIndex(index);
            checkIfSolved(newTiles);
        }
    };

    const checkIfSolved = (newTiles) => {
        const isSolved = newTiles.every((tile, idx) => tile === idx);
        setIsSolved(isSolved);
    };

    const resetGame = () => {
        setImageUrl(getRandomImage());
        initializePuzzle();
    };

    return (
        <div>
            <h1>Jigsaw Puzzle Game</h1>
            <div className="puzzle-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        className={`tile ${tile === totalTiles - 1 ? "empty-tile" : ""}`}
                        onClick={() => handleTileClick(index)}
                        style={{
                            backgroundImage: tile === totalTiles - 1 ? 'none' : `url(${imageUrl})`,
                            backgroundPosition: `${(tile % gridSize) * (100 / (gridSize - 1))}% ${(Math.floor(tile / gridSize)) * (100 / (gridSize - 1))}%`,
                            opacity: tile === totalTiles - 1 ? 0 : 1,
                        }}
                    ></div>
                ))}
            </div>
            {isSolved && <p className="game-over-message">Congratulations! You solved the puzzle!</p>}
            <button onClick={resetGame} className="reset-button">Shuffle Puzzle</button>
        </div>
    );
};

export default PuzzleGame;
