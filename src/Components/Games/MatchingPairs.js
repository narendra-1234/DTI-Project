import React, { useState } from 'react';
import './MatchingPairs.css'; // Import your styling here

const MatchingPairs = () => {
  const [cards, setCards] = useState(generateCards()); // Generate cards
  const [openedCards, setOpenedCards] = useState([]); // Track opened cards
  const [matchedCards, setMatchedCards] = useState(new Set()); // Track matched cards

  const handleCardClick = (index) => {
    if (openedCards.length < 2 && !openedCards.includes(index) && !matchedCards.has(index)) {
      setOpenedCards((prev) => [...prev, index]);
    }

    if (openedCards.length === 2) {
      const [first, second] = openedCards;

      // Check for match
      if (cards[first].id === cards[second].id) {
        setMatchedCards((prev) => new Set(prev).add(first).add(second));
      }

      // Close previously opened cards after a timeout
      setTimeout(() => {
        if (!matchedCards.has(first) && !matchedCards.has(second)) {
          // Close opened cards if they don't match
          setOpenedCards([]);
        } else {
          // Check if the game is complete
          if (matchedCards.size + 2 === cards.length) {
            alert("Congratulations! You've matched all pairs!");
            resetGame(); // Reset the game when completed
          }
        }
      }, 1000); // Delay for visual effect
    }
  };

  const resetGame = () => {
    setCards(generateCards()); // Generate new random cards
    setOpenedCards([]); // Clear opened cards
    setMatchedCards(new Set()); // Clear matched cards
  };

  return (
    <div className="matching-pairs-game">
      <h2>Matching Pairs Game</h2>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${openedCards.includes(index) || matchedCards.has(index) ? 'opened' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {openedCards.includes(index) || matchedCards.has(index) ? card.content : '?'}
          </div>
        ))}
      </div>
      {matchedCards.size === cards.length && (
        <button className="reset-button" onClick={resetGame}>Play Again</button>
      )}
    </div>
  );
};

// Function to generate card pairs with emojis
const generateCards = () => {
  const emojiPairs = [
    '🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉',
    '🍊', '🍊', '🍓', '🍓', '🍒', '🍒', '🥭', '🥭',
    '🍍', '🍍', '🥝', '🥝', '🍋', '🍋', '🍈', '🍈',
    '🍑', '🍑', '🍏', '🍏', '🍅', '🍅', '🥥', '🥥',
    '🥭', '🥭', '🍍', '🍍', '🍇', '🍇', '🍎', '🍎',
    '🍌', '🍌', '🍉', '🍉', '🍓', '🍓', '🍒', '🍒',
  ];

  const cards = emojiPairs
    .map((content, index) => ({ id: index, content }))
    .sort(() => Math.random() - 0.5); // Shuffle the cards
  return cards;
};

export default MatchingPairs;
