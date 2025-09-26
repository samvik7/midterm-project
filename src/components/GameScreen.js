import React from 'react';
import PlayerStats from './PlayerStats';
import StoryDisplay from './StoryDisplay';
import Choices from './Choices';

const GameScreen = () => {
  return (
    <div className="game-container">
      <h1 className="game-title">Aswang Hunter</h1>
      <PlayerStats />
      <StoryDisplay />
      <Choices />
    </div>
  );
};

export default GameScreen;