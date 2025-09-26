import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const PlayerStats = () => {
  const { gameState } = useContext(GameContext);

  return (
    <div className="player-stats">
      <h3>{gameState.playerName}</h3>
      <p><strong>HP:</strong> {gameState.hp}</p>
      <p><strong>Inventory:</strong> {gameState.inventory.length > 0 ? gameState.inventory.join(', ') : 'Empty'}</p>
    </div>
  );
};

export default PlayerStats;