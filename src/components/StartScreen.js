import React, { useState, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const StartScreen = () => {
  const [name, setName] = useState('');
  const { setPlayerName } = useContext(GameContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerName(name);
  };

  return (
    <div className="screen-container">
      <h2>Aswang Hunter</h2>
      <p>The town of San Gubat is plagued by a creature of the night. Enter your name to begin your hunt.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Start Your Hunt</button>
      </form>
    </div>
  );
};

export default StartScreen;