import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const StoryDisplay = () => {
  const { gameState, storyData } = useContext(GameContext);
  const currentStory = storyData[gameState.currentStoryId];

  if (!currentStory) {
    return <div className="story-display"><p>Error: Story node not found!</p></div>;
  }

  return (
    <div className="story-display">
      <p>{currentStory.text}</p>
    </div>
  );
};

export default StoryDisplay;