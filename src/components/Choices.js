import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const Choices = () => {
  const { gameState, storyData, makeChoice } = useContext(GameContext);
  const currentStory = storyData[gameState.currentStoryId];

  if (!currentStory?.choices || currentStory.choices.length === 0) {
    return null;
  }

  return (
    <div className="choices-container">
      {currentStory.choices.map((choice, index) => {
        const hasRequiredItem = choice.requires
          ? gameState.inventory.includes(choice.requires)
          : true;

        const shouldBeHidden = choice.hideIf
          ? gameState.inventory.includes(choice.hideIf)
          : false;

        if (shouldBeHidden) {
          return null;
        }

        return (
          <button
            key={index}
            className="choice-button"
            onClick={() => makeChoice(choice)}
            disabled={!hasRequiredItem || gameState.isGameEnded}
            title={!hasRequiredItem ? `Requires: ${choice.requires}` : ''}
          >
            {choice.text}
          </button>
        );
      })}
    </div>
  );
};

export default Choices;