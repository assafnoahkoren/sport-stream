import React from 'react';
import { Database } from '@sport-stream/common/src/database.types';

type Game = Database['public']['Tables']['games']['Row'];

interface GameProps {
  game: Game;
}

const Game: React.FC<GameProps> = ({ game }) => {
  return (
    <div>
      {/* Game component content will be implemented here */}
    </div>
  );
};

export default Game;
