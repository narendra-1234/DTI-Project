import React, { useState, useEffect } from 'react';
import './Simongame.css';

const colors = ['red', 'green', 'blue', 'yellow'];

const SimonGame = () => {
    const [gameSequence, setGameSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [currentColor, setCurrentColor] = useState(null);
    const [isGameActive, setIsGameActive] = useState(false);

    useEffect(() => {
        if (gameSequence.length && isPlayerTurn && playerSequence.length === gameSequence.length) {
            checkPlayerSequence();
        }
    }, [playerSequence]);

    const startGame = () => {
        setIsGameActive(true);
        setGameSequence([]);
        setPlayerSequence([]);
        setIsPlayerTurn(false);
        addColorToSequence();
    };

    const addColorToSequence = () => {
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        setGameSequence(prev => [...prev, newColor]);
        setIsPlayerTurn(false);
        setPlayerSequence([]);
        playSequence([...gameSequence, newColor]);
    };

    const playSequence = (sequence) => {
        sequence.forEach((color, index) => {
            setTimeout(() => {
                setCurrentColor(color);
                playSound(color);
            }, index * 600);

            setTimeout(() => {
                setCurrentColor(null);
                if (index === sequence.length - 1) {
                    setIsPlayerTurn(true);
                }
            }, (index + 1) * 600 - 100);
        });
    };

    const handlePlayerClick = (color) => {
        if (!isPlayerTurn) return;

        setPlayerSequence([...playerSequence, color]);
        playSound(color);
        setCurrentColor(color);
        setTimeout(() => setCurrentColor(null), 200);
    };

    const checkPlayerSequence = () => {
        const isCorrect = playerSequence.every((color, idx) => color === gameSequence[idx]);

        if (isCorrect) {
            setTimeout(() => addColorToSequence(), 1000);
        } else {
            alert('Game Over! Try again.');
            setIsGameActive(false);
        }
    };

    const playSound = (color) => {
        const audio = new Audio(`/assets/sounds/${color}.mp3`);
        audio.play();
    };

    return (
        <div className="simon-game">
            <h1>Simon Says</h1>
            <div className="game-board">
                {colors.map((color) => (
                    <div
                        key={color}
                        className={`color-button ${color} ${currentColor === color ? 'active' : ''}`}
                        onClick={() => handlePlayerClick(color)}
                    />
                ))}
            </div>
            <button className="start-button" onClick={startGame} disabled={isGameActive}>
                {isGameActive ? 'Game In Progress' : 'Start Game'}
            </button>
            <div className="status">
                {isGameActive ? (isPlayerTurn ? "Your Turn" : "Watch the Sequence") : "Press Start"}
            </div>
        </div>
    );
};

export default SimonGame;
