import React, { createContext, useState, useEffect, useCallback } from 'react';
import storyData from '../story.json';

export const GameContext = createContext();

const initialGameState = {
  playerName: '',
  currentStoryId: 'start',
  hp: 100,
  inventory: [],
  isGameEnded: false,
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(() => {
    try {
      const storedState = localStorage.getItem('aswangHunterGameState');
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        if (parsedState.isGameEnded) {
          return initialGameState;
        }
        return parsedState;
      }
    } catch (error) {
      console.error("Error loading state from localStorage:", error);
    }
    return initialGameState;
  });

  const setPlayerName = (name) => {
    setGameState({ ...initialGameState, playerName: name || 'Hunter' });
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  const makeChoice = useCallback((choice) => {
    const nextStoryId = choice.to;
    const nextNode = storyData[nextStoryId];

    setGameState(prev => {
      if (prev.isGameEnded) return prev;

      let newHp = prev.hp;
      let newInventory = [...prev.inventory];
      let newIsGameEnded = false;

      if (nextNode?.onArrive) {
        const { takeDamage, addItem } = nextNode.onArrive;
        if (takeDamage) {
          newHp -= takeDamage;
        }
        if (addItem && !newInventory.includes(addItem)) {
          newInventory.push(addItem);
        }
      }

      if (nextNode?.isEnding) {
        newIsGameEnded = true;
      }

      if (newHp <= 0) {
        newIsGameEnded = true;
        return {
          ...prev,
          hp: 0,
          inventory: newInventory,
          isGameEnded: true,
          currentStoryId: 'gameOver_hp',
        };
      }

      return {
        ...prev,
        hp: newHp,
        inventory: newInventory,
        isGameEnded: newIsGameEnded,
        currentStoryId: nextStoryId,
      };
    });
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem('aswangHunterGameState', JSON.stringify(gameState));
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
    }
  }, [gameState]);

  const value = { gameState, storyData, setPlayerName, resetGame, makeChoice };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};