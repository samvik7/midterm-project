import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const EndScreen = () => {
  const { resetGame, gameState, storyData } = useContext(GameContext);

  const handlePlayAgain = () => {
    resetGame();
  };

  const finalStoryNode = storyData[gameState.currentStoryId];
  const endingText = finalStoryNode?.text || "The story concludes.";
  const isGameOver = endingText.toLowerCase().includes("game over") || gameState.hp <= 0;

  return (
    <div className="screen-container">
      <h2>{isGameOver ? 'Game Over' : 'Victory!'}</h2>
      <p>{endingText}</p>
      <button onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;