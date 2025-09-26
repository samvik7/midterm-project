import React, { useContext } from 'react';
import { GameContext } from './contexts/GameContext';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import './App.css';

function App() {
  const { gameState } = useContext(GameContext);

  if (!gameState.playerName) {
    return <StartScreen />;
  } else if (gameState.isGameEnded) {
    return <EndScreen />;
  } else {
    return <GameScreen />;
  }
}

export default App;