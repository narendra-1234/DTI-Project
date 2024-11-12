import React, { useState } from 'react';
import './App.css';
import TicTacToe from './Components/Games/TicTacToe';
import Sudoku from './Components/Games/Sudoku';
import WordSearch from './Components/Games/WordSearch'
import MatchingPairs from './Components/Games/MatchingPairs';
// import ChessBoard from './Components/Games/ChessBoard';
import Simongame from './Components/Games/Simongame';
import PuzzleGame from './Components/Games/puzzleGame';
function App() {
    const [activeGame, setActiveGame] = useState(null);

    const handleGameClick = (game) => {
        setActiveGame(game);
    };

    const handleCloseGame = () => {
        setActiveGame(null);
    };

    return (
        <div className="App">
            <h1>Welcome to the Game section</h1>
            <div className="game-buttons">
                <button className="game-button" onClick={() => handleGameClick('TicTacToe')}>Play Tic Tac Toe</button>
                <button className="game-button" onClick={() => handleGameClick('Sudoku')}>Play Sudoku</button>
                <button className="game-button" onClick={() => handleGameClick('WordSearch')}>Play WordSearch</button>
                <button className="game-button" onClick={() => handleGameClick('MatchingPairs')}>Play Matching Pairs</button>
                <button className='game-button' onClick={()=> handleGameClick("Simongame")}>Play Simon Game</button>
                <button className='game-button' onClick={() => handleGameClick("puzzleGame")}>Play Puzzle Game</button>
            </div>
            {activeGame === 'TicTacToe' && (
                <>
                    <TicTacToe />
                    <button className="close-button" onClick={handleCloseGame}>Close Tic Tac Toe</button>
                </>
            )}
            {activeGame === 'Sudoku' && (
                <>
                    <Sudoku />
                    <button className="close-button" onClick={handleCloseGame}>Close Sudoku</button>
                </>
            )}
            {activeGame === 'WordSearch' && (
                <>
                    <WordSearch />
                    <button className="close-button" onClick={handleCloseGame}>Close WordSearch</button>
                </>
            )}
            {activeGame === 'MatchingPairs' && (
                <>
                    <MatchingPairs />
                    <button className='close-button' onClick={handleCloseGame}>Close Matching Pairs</button>
                </>
            )}
            {activeGame === "Simongame" &&(
                <>
                    <Simongame />
                    <button className='close-button' onClick={handleCloseGame}>Close Simongame</button>
                </>
            )}
            {activeGame === "puzzleGame" &&(
                <>
                    <PuzzleGame/>
                    <button className='close-button' onClick={handleCloseGame}>close puzzle game</button>
                </>
            )}
        </div>
    );
}

export default App;
